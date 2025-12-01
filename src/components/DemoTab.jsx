import { useState, useCallback } from 'react';
import { Paper, Box, Button, Typography, Grid, CircularProgress, Alert, Slider, Chip, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDropzone } from 'react-dropzone';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useAppStore } from '../store/appStore';
import { validateImageFile, fileToDataURL, downloadImage, formatTime } from '../lib/utils';
import { MODELS, ALTERNATIVE_MODELS } from '../lib/constants';
import { loadPipeline, processImage as processWithAI } from '../lib/aiService';
import DemoModeNotice from './DemoModeNotice';

export default function DemoTab() {
  const {
    currentTask,
    selectedModel,
    originalImage,
    processedImage,
    processing,
    processingTime,
    modelLoading,
    activeStep,
    denoisingLevel,
    upscaleFactor,
    colorizationIntensity,
    colorizationSaturation,
    inpaintingGuidanceScale,
    inpaintingInferenceSteps,
    inpaintingStrength,
    objectDetectionConfidence,
    objectDetectionIOU,
    objectDetectionMaxDetections,
    poseEstimationConfidence,
    poseKeypointThreshold,
    poseMaxDetections,
    maskingEdgeThreshold,
    maskingSegmentationIntensity,
    maskingMorphologyStrength,
    styleTransferStyle,
    styleTransferIntensity,
    bgRemovalMethod,
    bgRemovalThreshold,
    bgRemovalFeathering,
    bgRemovalOutputMode,
    setOriginalImage,
    setProcessedImage,
    setProcessing,
    setProcessingTime,
    setModelLoading,
    setActiveStep,
    setDenoisingLevel,
    setUpscaleFactor,
    setColorizationIntensity,
    setColorizationSaturation,
    setInpaintingGuidanceScale,
    setInpaintingInferenceSteps,
    setInpaintingStrength,
    setObjectDetectionConfidence,
    setObjectDetectionIOU,
    setObjectDetectionMaxDetections,
    setPoseEstimationConfidence,
    setPoseKeypointThreshold,
    setPoseMaxDetections,
    setMaskingEdgeThreshold,
    setMaskingSegmentationIntensity,
    setMaskingMorphologyStrength,
    setStyleTransferStyle,
    setStyleTransferIntensity,
    setBgRemovalMethod,
    setBgRemovalThreshold,
    setBgRemovalFeathering,
    setBgRemovalOutputMode,
    addLog,
    resetImageState,
    setLoadProgress: setLoadProgressStore,
    setProcessingProgress: setProcessingProgressStore,
  } = useAppStore();

  const [error, setError] = useState(null);
  const [comparisonSlider, setComparisonSlider] = useState(50);
  const [loadProgress, setLoadProgress] = useState(0);
  const [originalImageDimensions, setOriginalImageDimensions] = useState(null);
  const [processedImageDimensions, setProcessedImageDimensions] = useState(null);

  const steps = ['Load AI Model', 'Process Image', 'Generate Result'];

  // Get current model info for display
  const baseModelInfo = MODELS[currentTask];
  const currentModelInfo = selectedModel && ALTERNATIVE_MODELS[selectedModel]
    ? ALTERNATIVE_MODELS[selectedModel]
    : baseModelInfo;
  const hasMultipleModels = baseModelInfo?.models && baseModelInfo.models.length > 1;

  console.log('📊 DemoTab Display - selectedModel:', selectedModel);
  console.log('📊 DemoTab Display - currentModelInfo.name:', currentModelInfo?.name);
  console.log('📊 DemoTab Display - hasMultipleModels:', hasMultipleModels);
  console.log('📊 DemoTab Display - currentTask:', currentTask);
  console.log('📊 DemoTab Display - showing colorization sliders?:', currentTask === 'colorization');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      addLog(`Upload failed: ${validation.error}`, 'error');
      return;
    }

    setError(null);
    try {
      const dataUrl = await fileToDataURL(file);
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalImageDimensions({ width: img.width, height: img.height });
        addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        addLog(`📤 Image uploaded successfully`, 'success');
        addLog(`📁 File: ${file.name}`, 'info');
        addLog(`📐 Dimensions: ${img.width}×${img.height}px`, 'info');
        addLog(`💾 Size: ${(file.size / 1024).toFixed(2)} KB`, 'info');
        addLog(`🖼️ Format: ${file.type}`, 'info');
        addLog('✅ Ready for enhancement', 'success');
        addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
      };
      img.src = dataUrl;
      
      setOriginalImage(dataUrl);
    } catch (err) {
      setError('Failed to load image');
      addLog(`Failed to load image: ${err.message}`, 'error');
    }
  }, [setOriginalImage, addLog]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.bmp'],
    },
    multiple: false,
  });

  const handleProcess = async () => {
    if (!originalImage) return;

    setError(null);
    setProcessing(true);
    setModelLoading(true);
    setActiveStep(0); // Start at step 0
    
    // Get the appropriate model info (selected model or default)
    const baseModelInfo = MODELS[currentTask];
    const modelInfo = selectedModel && ALTERNATIVE_MODELS[selectedModel]
      ? ALTERNATIVE_MODELS[selectedModel]
      : baseModelInfo;
    
    const modelId = selectedModel || baseModelInfo.id;
    console.log('🔍 DemoTab - selectedModel from store:', selectedModel);
    console.log('🔍 DemoTab - baseModelInfo.id:', baseModelInfo.id);
    console.log('🔍 DemoTab - final modelId:', modelId);
    console.log('🔍 DemoTab - modelId includes detr-resnet?:', modelId && modelId.includes('detr-resnet'));
    const startTime = performance.now();
    
    // Enhanced logging with full details
    addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
    addLog(`🚀 Starting ${currentTask.toUpperCase()} processing pipeline`, 'info');
    addLog(`🤖 Loading AI Model: ${modelInfo.name}`, 'info');
    addLog(`📝 Description: ${modelInfo.description}`, 'info');
    addLog(`🔧 Model ID: ${modelId}`, 'info');
    if (originalImageDimensions) {
      addLog(`📊 Input Image: ${originalImageDimensions.width}×${originalImageDimensions.height}px`, 'info');
    }
    addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');

    try {
      // Load model with progress callback
      addLog(`⏳ STEP 1/3: Model Loading`, 'info');
      addLog(modelInfo.processingSteps?.loading || 'Loading AI model...', 'info');
      addLog(`📦 Initializing ${modelInfo.name}...`, 'info');
      await loadPipeline(modelId, currentTask, (progress) => {
        if (progress.status === 'progress') {
          const percent = Math.round(progress.progress || 0);
          setLoadProgress(percent);
          setLoadProgressStore(percent);
          
          // Detailed progress logging
          if (percent === 25) addLog('📥 Downloading model weights (25%)...', 'info');
          else if (percent === 50) addLog('🔄 Loading model architecture (50%)...', 'info');
          else if (percent === 75) addLog('⚙️ Initializing inference engine (75%)...', 'info');
          else if (percent === 100) addLog('✅ Model ready (100%)', 'info');
          else addLog(`   Loading: ${percent}%`, 'info');
        }
      });
      
      setModelLoading(false);
      setActiveStep(1); // Move to step 1 (Process Image)
      const loadTime = performance.now() - startTime;
      addLog(`✅ Model loaded successfully in ${formatTime(loadTime)}`, 'success');
      addLog(`💾 Model cached for future use`, 'info');
      addLog(`🎯 Key Features: ${modelInfo.features?.slice(0, 2).join(', ')}`, 'info');

      // Process image
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
      addLog(`🎨 STEP 2/3: Image Processing`, 'info');
      addLog(modelInfo.processingSteps?.processing || 'Processing image...', 'info');
      addLog(`🔬 Applying ${currentTask} algorithms...`, 'info');
      setActiveStep(1); // Ensure we're at step 1
      
      // Simulate processing progress
      let currentProgress = 0;
      setProcessingProgressStore(0);
      const progressInterval = setInterval(() => {
        currentProgress = Math.min(currentProgress + 10, 90);
        setProcessingProgressStore(currentProgress);
      }, 100);
      
      const processingStartTime = performance.now();
      const result = await processWithAI(
        originalImage, 
        modelId, 
        currentTask, 
        denoisingLevel, 
        upscaleFactor, 
        colorizationIntensity, 
        colorizationSaturation,
        inpaintingGuidanceScale,
        inpaintingInferenceSteps,
        inpaintingStrength,
        objectDetectionConfidence,
        objectDetectionIOU,
        objectDetectionMaxDetections,
        poseEstimationConfidence,
        poseKeypointThreshold,
        poseMaxDetections,
        maskingEdgeThreshold,
        maskingSegmentationIntensity,
        maskingMorphologyStrength,
        styleTransferStyle,
        styleTransferIntensity,
        bgRemovalMethod,
        bgRemovalThreshold,
        bgRemovalFeathering,
        bgRemovalOutputMode
      );
      
      clearInterval(progressInterval);
      setProcessingProgressStore(100);
      
      const processingDuration = performance.now() - processingStartTime;
      
      addLog(`⚡ Processing completed in ${formatTime(processingDuration)}`, 'success');
      
      // Get processed image dimensions
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
      addLog(`🎬 STEP 3/3: Result Generation`, 'info');
      addLog(modelInfo.processingSteps?.generating || 'Generating final result...', 'info');
      setActiveStep(2); // Move to step 2 (Generate Result)
      
      const processedImg = new Image();
      processedImg.onload = () => {
        const dims = { width: processedImg.width, height: processedImg.height };
        setProcessedImageDimensions(dims);
        
        const totalTime = performance.now() - startTime;
        
        addLog(`📐 Output Resolution: ${dims.width}×${dims.height}px`, 'success');
        if (originalImageDimensions) {
          const scaleFactor = (dims.width / originalImageDimensions.width).toFixed(2);
          addLog(`📊 Scale Factor: ${scaleFactor}x`, 'success');
        }
        addLog(`⏱️ Total Processing Time: ${formatTime(totalTime)}`, 'success');
        addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        addLog(`🎉 ${currentTask.toUpperCase()} completed successfully!`, 'success');
        addLog(`💡 Use Cases: ${modelInfo.useCases?.slice(0, 2).join(', ')}`, 'info');
        addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        setActiveStep(3); // All steps completed
      };
      processedImg.src = result;
      
      const processingTime = performance.now() - startTime;
      setProcessedImage(result);
      setProcessingTime(processingTime);
      setProcessing(false);
    } catch (err) {
      setError(err.message);
      setProcessing(false);
      setModelLoading(false);
      setActiveStep(-1); // Reset steps on error
      
      const errorTime = performance.now() - startTime;
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'error');
      addLog(`❌ Processing failed after ${formatTime(errorTime)}`, 'error');
      addLog(`🔴 Error: ${err.message}`, 'error');
      addLog(`📋 Task: ${currentTask}`, 'error');
      addLog(`🔧 Model: ${modelInfo.id}`, 'error');
      addLog('💡 Tip: Check diagnostics tab for system capabilities', 'error');
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'error');
    }
  };

  const handleReset = () => {
    resetImageState();
    setError(null);
    setComparisonSlider(50);
    setLoadProgress(0);
    setLoadProgressStore(0);
    setProcessingProgressStore(0);
    setOriginalImageDimensions(null);
    setProcessedImageDimensions(null);
    setActiveStep(-1); // Reset stepper
    
    // Reset all task-specific sliders to defaults (best quality)
    setDenoisingLevel(85); // Very Strong/Best Quality
    setUpscaleFactor(4); // 4x Maximum/Best Quality
    setColorizationIntensity(90); // Very Vibrant/Best Quality
    setColorizationSaturation(80); // Rich/Best Quality
    setInpaintingGuidanceScale(15); // Strict/High Quality
    setInpaintingInferenceSteps(40); // High Quality
    setInpaintingStrength(0.95); // Very Strong/High Quality
    setObjectDetectionConfidence(0.25); // Balanced
    setObjectDetectionIOU(0.50); // Balanced
    setObjectDetectionMaxDetections(50); // Balanced
    setPoseEstimationConfidence(0.3); // Balanced
    setPoseKeypointThreshold(0.2); // Balanced
    setPoseMaxDetections(10); // Balanced
    setMaskingEdgeThreshold(0.3); // Balanced
    setMaskingSegmentationIntensity(0.7); // Strong/High Quality
    setMaskingMorphologyStrength(0.5); // Balanced
    setStyleTransferStyle('picasso'); // Default style
    setStyleTransferIntensity(0.8); // Strong/High Quality
    setBgRemovalMethod('ai-saliency'); // Default method
    setBgRemovalThreshold(0.5); // Balanced
    setBgRemovalFeathering(3); // Moderate
    setBgRemovalOutputMode('transparent'); // Default output
    
    addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
    addLog('🔄 Workspace reset to initial state', 'info');
    addLog('📋 Ready for new image processing task', 'info');
    addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
  };

  const handleDownload = () => {
    if (processedImage) {
      downloadImage(processedImage, `restored-${currentTask}-${Date.now()}.png`);
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
      addLog(`💾 Enhanced image downloaded as enhanced-${Date.now()}.png`, 'success');
      addLog(`📊 Resolution: ${processedImageDimensions.width}×${processedImageDimensions.height}px`, 'info');
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
    }
  };

  const handleCopyToClipboard = async () => {
    if (!processedImage) return;

    try {
      // Fetch the image blob from the data URL
      const response = await fetch(processedImage);
      const blob = await response.blob();
      
      // Copy to clipboard using Clipboard API
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
      addLog('📋 Enhanced image copied to clipboard', 'success');
      addLog(`📊 Resolution: ${processedImageDimensions.width}×${processedImageDimensions.height}px`, 'info');
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
    } catch (err) {
      console.error('Failed to copy image:', err);
      addLog('❌ Failed to copy image to clipboard', 'error');
      addLog('💡 Tip: Make sure your browser supports clipboard API', 'info');
    }
  };

  return (
    <Box>
      {/* Model Selection Display */}
      {hasMultipleModels && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper', border: 1, borderColor: 'primary.main' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
              Selected Model:
            </Typography>
            <Chip 
              label={currentModelInfo.name}
              color="primary"
              variant="filled"
            />
            <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
              {currentModelInfo.description}
            </Typography>
          </Box>
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {!originalImage ? (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            p: 6,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop image here' : 'Drag & drop an image here'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            or click to browse files
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 2 }} color="text.secondary">
            Supported formats: JPG, PNG, WebP, BMP (max 10MB)
          </Typography>
        </Box>
      ) : (
        <Box>
          {/* Denoising Level Slider */}
          {currentTask === 'denoising' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Denoising Strength: {denoisingLevel}%
              </Typography>
              <Slider
                value={denoisingLevel}
                onChange={(e, value) => setDenoisingLevel(value)}
                min={0}
                max={100}
                marks={[
                  { value: 0, label: 'Off' },
                  { value: 25, label: 'Light' },
                  { value: 50, label: 'Medium' },
                  { value: 75, label: 'Strong' },
                  { value: 100, label: 'Maximum' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {denoisingLevel === 0 && 'No denoising applied'}
                {denoisingLevel > 0 && denoisingLevel < 33 && 'Subtle noise reduction, preserves fine details'}
                {denoisingLevel >= 33 && denoisingLevel < 66 && 'Balanced noise removal and detail preservation'}
                {denoisingLevel >= 66 && 'Aggressive denoising, may reduce some fine details'}
              </Typography>
            </Paper>
          )}

          {/* Upscale Factor Slider */}
          {currentTask === 'super-resolution' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Upscale Factor: {upscaleFactor}x
              </Typography>
              <Slider
                value={upscaleFactor}
                onChange={(e, value) => setUpscaleFactor(value)}
                min={1}
                max={4}
                step={0.5}
                marks={[
                  { value: 1, label: '1x' },
                  { value: 2, label: '2x' },
                  { value: 3, label: '3x' },
                  { value: 4, label: '4x' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}x`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {upscaleFactor === 1 && 'Original size (no upscaling)'}
                {upscaleFactor > 1 && upscaleFactor <= 2 && `Output will be ${upscaleFactor}x larger (${Math.round(upscaleFactor * 100)}% increase)`}
                {upscaleFactor > 2 && upscaleFactor <= 3 && `High quality upscaling to ${upscaleFactor}x size`}
                {upscaleFactor > 3 && 'Maximum upscaling - may introduce artifacts on low quality images'}
              </Typography>
            </Paper>
          )}

          {/* Inpainting Controls */}
          {currentTask === 'inpainting' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>              
              <Typography variant="subtitle2" gutterBottom>
                Guidance Scale: {inpaintingGuidanceScale}
              </Typography>
              <Slider
                value={inpaintingGuidanceScale}
                onChange={(e, value) => setInpaintingGuidanceScale(value)}
                min={1}
                max={20}
                step={0.5}
                marks={[
                  { value: 1, label: 'Free' },
                  { value: 7.5, label: 'Balanced' },
                  { value: 15, label: 'Strict' },
                  { value: 20, label: 'Max' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {inpaintingGuidanceScale < 5 && 'Creative, may deviate from context'}
                {inpaintingGuidanceScale >= 5 && inpaintingGuidanceScale < 10 && 'Balanced creativity and context following'}
                {inpaintingGuidanceScale >= 10 && inpaintingGuidanceScale < 15 && 'Strictly follows context and surrounding pixels'}
                {inpaintingGuidanceScale >= 15 && 'Maximum adherence to context - most realistic blending'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Inference Steps: {inpaintingInferenceSteps}
              </Typography>
              <Slider
                value={inpaintingInferenceSteps}
                onChange={(e, value) => setInpaintingInferenceSteps(value)}
                min={10}
                max={50}
                step={5}
                marks={[
                  { value: 10, label: 'Fast' },
                  { value: 20, label: 'Quick' },
                  { value: 30, label: 'Balanced' },
                  { value: 40, label: 'Quality' },
                  { value: 50, label: 'Best' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {inpaintingInferenceSteps < 20 && 'Fast processing, lower quality'}
                {inpaintingInferenceSteps >= 20 && inpaintingInferenceSteps < 35 && 'Balanced quality and speed'}
                {inpaintingInferenceSteps >= 35 && inpaintingInferenceSteps < 45 && 'High quality, slower processing'}
                {inpaintingInferenceSteps >= 45 && 'Best quality, longest processing time'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Inpainting Strength: {Math.round(inpaintingStrength * 100)}%
              </Typography>
              <Slider
                value={inpaintingStrength}
                onChange={(e, value) => setInpaintingStrength(value)}
                min={0}
                max={1}
                step={0.05}
                marks={[
                  { value: 0, label: 'None' },
                  { value: 0.4, label: 'Light' },
                  { value: 0.8, label: 'Strong' },
                  { value: 1, label: 'Full' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {inpaintingStrength === 0 && 'No changes applied to masked area'}
                {inpaintingStrength > 0 && inpaintingStrength < 0.5 && 'Light modifications, preserves more original details'}
                {inpaintingStrength >= 0.5 && inpaintingStrength < 0.9 && 'Moderate to strong inpainting, good balance'}
                {inpaintingStrength >= 0.9 && 'Full inpainting, completely regenerates masked area'}
              </Typography>
            </Paper>
          )}

          {/* Colorization Controls */}
          {currentTask === 'colorization' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Colorization Intensity: {colorizationIntensity}%
              </Typography>
              <Slider
                value={colorizationIntensity}
                onChange={(e, value) => setColorizationIntensity(value)}
                min={0}
                max={100}
                marks={[
                  { value: 0, label: 'None' },
                  { value: 40, label: 'Subtle' },
                  { value: 80, label: 'Vibrant' },
                  { value: 100, label: 'Max' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {colorizationIntensity === 0 && 'No colorization applied'}
                {colorizationIntensity > 0 && colorizationIntensity < 50 && 'Subtle colorization with muted tones'}
                {colorizationIntensity >= 50 && colorizationIntensity < 85 && 'Vibrant colorization with rich colors'}
                {colorizationIntensity >= 85 && 'Maximum color intensity for bold results'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Color Saturation: {colorizationSaturation}%
              </Typography>
              <Slider
                value={colorizationSaturation}
                onChange={(e, value) => setColorizationSaturation(value)}
                min={0}
                max={100}
                marks={[
                  { value: 0, label: 'Gray' },
                  { value: 50, label: 'Natural' },
                  { value: 70, label: 'Rich' },
                  { value: 100, label: 'Vivid' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {colorizationSaturation === 0 && 'Grayscale output (no color)'}
                {colorizationSaturation > 0 && colorizationSaturation < 55 && 'Natural, muted color saturation'}
                {colorizationSaturation >= 55 && colorizationSaturation < 85 && 'Rich, balanced color saturation'}
                {colorizationSaturation >= 85 && 'Vivid, highly saturated colors'}
              </Typography>
            </Paper>
          )}

          {/* Object Detection Controls */}
          {currentTask === 'object-detection' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Confidence Threshold: {Math.round(objectDetectionConfidence * 100)}%
              </Typography>
              <Slider
                value={objectDetectionConfidence}
                onChange={(e, value) => setObjectDetectionConfidence(value)}
                min={0.1}
                max={0.9}
                step={0.05}
                marks={[
                  { value: 0.1, label: 'Low' },
                  { value: 0.25, label: 'Balanced' },
                  { value: 0.5, label: 'High' },
                  { value: 0.9, label: 'Strict' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {objectDetectionConfidence < 0.2 && 'Detects more objects, may include false positives'}
                {objectDetectionConfidence >= 0.2 && objectDetectionConfidence < 0.4 && 'Balanced detection with good accuracy'}
                {objectDetectionConfidence >= 0.4 && objectDetectionConfidence < 0.7 && 'High confidence, fewer but more accurate detections'}
                {objectDetectionConfidence >= 0.7 && 'Very strict, only highly confident detections'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                NMS IOU Threshold: {Math.round(objectDetectionIOU * 100)}%
              </Typography>
              <Slider
                value={objectDetectionIOU}
                onChange={(e, value) => setObjectDetectionIOU(value)}
                min={0.2}
                max={0.8}
                step={0.05}
                marks={[
                  { value: 0.2, label: 'Loose' },
                  { value: 0.45, label: 'Balanced' },
                  { value: 0.6, label: 'Strict' },
                  { value: 0.8, label: 'Very Strict' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {objectDetectionIOU < 0.35 && 'Keeps overlapping boxes, may show duplicates'}
                {objectDetectionIOU >= 0.35 && objectDetectionIOU < 0.55 && 'Balanced overlap suppression'}
                {objectDetectionIOU >= 0.55 && objectDetectionIOU < 0.7 && 'Strict overlap removal, cleaner results'}
                {objectDetectionIOU >= 0.7 && 'Very strict, removes most overlapping detections'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Max Detections: {objectDetectionMaxDetections}
              </Typography>
              <Slider
                value={objectDetectionMaxDetections}
                onChange={(e, value) => setObjectDetectionMaxDetections(value)}
                min={5}
                max={100}
                step={5}
                marks={[
                  { value: 5, label: '5' },
                  { value: 25, label: '25' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {objectDetectionMaxDetections <= 15 && 'Shows only the most confident detections'}
                {objectDetectionMaxDetections > 15 && objectDetectionMaxDetections <= 40 && 'Good balance for most images'}
                {objectDetectionMaxDetections > 40 && objectDetectionMaxDetections <= 70 && 'Suitable for crowded scenes'}
                {objectDetectionMaxDetections > 70 && 'Maximum detections for very dense images'}
              </Typography>
            </Paper>
          )}

          {/* Pose Estimation Controls */}
          {currentTask === 'pose-estimation' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Pose Confidence Threshold: {Math.round(poseEstimationConfidence * 100)}%
              </Typography>
              <Slider
                value={poseEstimationConfidence}
                onChange={(e, value) => setPoseEstimationConfidence(value)}
                min={0.1}
                max={0.9}
                step={0.05}
                marks={[
                  { value: 0.1, label: 'Low' },
                  { value: 0.3, label: 'Balanced' },
                  { value: 0.5, label: 'High' },
                  { value: 0.9, label: 'Strict' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {poseEstimationConfidence < 0.2 && 'Detects more poses, may include uncertain detections'}
                {poseEstimationConfidence >= 0.2 && poseEstimationConfidence < 0.4 && 'Balanced pose detection with good accuracy'}
                {poseEstimationConfidence >= 0.4 && poseEstimationConfidence < 0.7 && 'High confidence, fewer but more accurate poses'}
                {poseEstimationConfidence >= 0.7 && 'Very strict, only highly confident poses'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Keypoint Visibility Threshold: {Math.round(poseKeypointThreshold * 100)}%
              </Typography>
              <Slider
                value={poseKeypointThreshold}
                onChange={(e, value) => setPoseKeypointThreshold(value)}
                min={0.1}
                max={0.7}
                step={0.05}
                marks={[
                  { value: 0.1, label: 'Relaxed' },
                  { value: 0.2, label: 'Balanced' },
                  { value: 0.4, label: 'Strict' },
                  { value: 0.7, label: 'Very Strict' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {poseKeypointThreshold < 0.15 && 'Shows all keypoints, even partially occluded ones'}
                {poseKeypointThreshold >= 0.15 && poseKeypointThreshold < 0.3 && 'Balanced keypoint visibility'}
                {poseKeypointThreshold >= 0.3 && poseKeypointThreshold < 0.5 && 'Only clearly visible keypoints'}
                {poseKeypointThreshold >= 0.5 && 'Very strict, only highly visible keypoints'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Max People to Detect: {poseMaxDetections}
              </Typography>
              <Slider
                value={poseMaxDetections}
                onChange={(e, value) => setPoseMaxDetections(value)}
                min={1}
                max={20}
                step={1}
                marks={[
                  { value: 1, label: '1' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {poseMaxDetections <= 2 && 'Detects individual or pair poses'}
                {poseMaxDetections > 2 && poseMaxDetections <= 6 && 'Good for small group settings'}
                {poseMaxDetections > 6 && poseMaxDetections <= 12 && 'Suitable for moderate group sizes'}
                {poseMaxDetections > 12 && 'Maximum detection for large crowds'}
              </Typography>
            </Paper>
          )}

          {/* Image Masking & Segmentation Controls */}
          {currentTask === 'image-masking' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Edge Detection Threshold: {Math.round(maskingEdgeThreshold * 100)}%
              </Typography>
              <Slider
                value={maskingEdgeThreshold}
                onChange={(e, value) => setMaskingEdgeThreshold(value)}
                min={0.1}
                max={0.9}
                step={0.05}
                marks={[
                  { value: 0.1, label: 'Sensitive' },
                  { value: 0.3, label: 'Balanced' },
                  { value: 0.6, label: 'Precise' },
                  { value: 0.9, label: 'Very Precise' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {maskingEdgeThreshold < 0.2 && 'Detects many edges, may include noise'}
                {maskingEdgeThreshold >= 0.2 && maskingEdgeThreshold < 0.4 && 'Balanced edge detection for most images'}
                {maskingEdgeThreshold >= 0.4 && maskingEdgeThreshold < 0.7 && 'Precise edge detection, cleaner results'}
                {maskingEdgeThreshold >= 0.7 && 'Very precise, only strong edges detected'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Segmentation Intensity: {Math.round(maskingSegmentationIntensity * 100)}%
              </Typography>
              <Slider
                value={maskingSegmentationIntensity}
                onChange={(e, value) => setMaskingSegmentationIntensity(value)}
                min={0.2}
                max={1.0}
                step={0.05}
                marks={[
                  { value: 0.2, label: 'Subtle' },
                  { value: 0.5, label: 'Moderate' },
                  { value: 0.7, label: 'Strong' },
                  { value: 1.0, label: 'Maximum' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', mb: 2 }}>
                {maskingSegmentationIntensity < 0.4 && 'Subtle segmentation, preserves more details'}
                {maskingSegmentationIntensity >= 0.4 && maskingSegmentationIntensity < 0.65 && 'Moderate segmentation strength'}
                {maskingSegmentationIntensity >= 0.65 && maskingSegmentationIntensity < 0.85 && 'Strong segmentation, clear regions'}
                {maskingSegmentationIntensity >= 0.85 && 'Maximum segmentation for clear separation'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Morphology Strength: {Math.round(maskingMorphologyStrength * 100)}%
              </Typography>
              <Slider
                value={maskingMorphologyStrength}
                onChange={(e, value) => setMaskingMorphologyStrength(value)}
                min={0.1}
                max={1.0}
                step={0.05}
                marks={[
                  { value: 0.1, label: 'Light' },
                  { value: 0.35, label: 'Moderate' },
                  { value: 0.65, label: 'Strong' },
                  { value: 1.0, label: 'Maximum' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {maskingMorphologyStrength < 0.3 && 'Light smoothing and cleanup'}
                {maskingMorphologyStrength >= 0.3 && maskingMorphologyStrength < 0.55 && 'Balanced morphological operations'}
                {maskingMorphologyStrength >= 0.55 && maskingMorphologyStrength < 0.8 && 'Strong cleanup, removes small artifacts'}
                {maskingMorphologyStrength >= 0.8 && 'Maximum strength for aggressive cleanup'}
              </Typography>
            </Paper>
          )}

          {/* Style Transfer Controls */}
          {currentTask === 'style-transfer' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="style-select-label">Artistic Style</InputLabel>
                <Select
                  labelId="style-select-label"
                  value={styleTransferStyle}
                  label="Artistic Style"
                  onChange={(e) => setStyleTransferStyle(e.target.value)}
                  disabled={processing || modelLoading}
                >
                  <MenuItem value="oil-painting">🎨 Oil Painting - Thick brush strokes</MenuItem>
                  <MenuItem value="watercolor">💧 Watercolor - Soft flowing colors</MenuItem>
                  <MenuItem value="monet">🌸 Monet - Impressionist light & color</MenuItem>
                  <MenuItem value="van-gogh">🌟 Van Gogh - Swirling starry style</MenuItem>
                  <MenuItem value="picasso">🖼️ Picasso - Cubist geometric</MenuItem>
                  <MenuItem value="warhol">🎭 Warhol - Pop art vibrant blocks</MenuItem>
                  <MenuItem value="kandinsky">🔷 Kandinsky - Abstract geometric</MenuItem>
                  <MenuItem value="anime">✨ Anime - Japanese animation style</MenuItem>
                  <MenuItem value="sketch">✏️ Sketch - Pencil/charcoal drawing</MenuItem>
                  <MenuItem value="stained-glass">🪟 Stained Glass - Colorful mosaic</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" gutterBottom>
                Style Intensity: {Math.round(styleTransferIntensity * 100)}%
              </Typography>
              <Slider
                value={styleTransferIntensity}
                onChange={(e, value) => setStyleTransferIntensity(value)}
                min={0.2}
                max={1.0}
                step={0.05}
                marks={[
                  { value: 0.2, label: 'Subtle' },
                  { value: 0.5, label: 'Moderate' },
                  { value: 0.8, label: 'Strong' },
                  { value: 1.0, label: 'Maximum' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {styleTransferIntensity < 0.4 && 'Subtle artistic effect, original details preserved'}
                {styleTransferIntensity >= 0.4 && styleTransferIntensity < 0.65 && 'Balanced artistic transformation'}
                {styleTransferIntensity >= 0.65 && styleTransferIntensity < 0.85 && 'Strong artistic style application'}
                {styleTransferIntensity >= 0.85 && 'Maximum artistic effect, bold transformation'}
              </Typography>
            </Paper>
          )}

          {/* Background Removal Controls */}
          {currentTask === 'background-removal' && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="bg-method-label">Removal Method</InputLabel>
                <Select
                  labelId="bg-method-label"
                  value={bgRemovalMethod}
                  label="Removal Method"
                  onChange={(e) => setBgRemovalMethod(e.target.value)}
                  disabled={processing || modelLoading}
                >
                  <MenuItem value="ai-saliency">🧠 AI Saliency - Smart detection</MenuItem>
                  <MenuItem value="edge-detection">📐 Edge Detection - Contour based</MenuItem>
                  <MenuItem value="color-segmentation">🎨 Color Segmentation - Color similarity</MenuItem>
                  <MenuItem value="grabcut">✂️ GrabCut - Advanced segmentation</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" gutterBottom>
                Detection Threshold: {Math.round(bgRemovalThreshold * 100)}%
              </Typography>
              <Slider
                value={bgRemovalThreshold}
                onChange={(e, value) => setBgRemovalThreshold(value)}
                min={0.1}
                max={0.9}
                step={0.05}
                marks={[
                  { value: 0.1, label: 'Loose' },
                  { value: 0.5, label: 'Balanced' },
                  { value: 0.9, label: 'Strict' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mb: 3 }}
              />

              <Typography variant="subtitle2" gutterBottom>
                Edge Feathering: {bgRemovalFeathering}px
              </Typography>
              <Slider
                value={bgRemovalFeathering}
                onChange={(e, value) => setBgRemovalFeathering(value)}
                min={0}
                max={10}
                step={1}
                marks={[
                  { value: 0, label: 'Sharp' },
                  { value: 3, label: 'Smooth' },
                  { value: 7, label: 'Soft' },
                  { value: 10, label: 'Very Soft' },
                ]}
                disabled={processing || modelLoading}
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth>
                <InputLabel id="bg-output-label">Background Output</InputLabel>
                <Select
                  labelId="bg-output-label"
                  value={bgRemovalOutputMode}
                  label="Background Output"
                  onChange={(e) => setBgRemovalOutputMode(e.target.value)}
                  disabled={processing || modelLoading}
                >
                  <MenuItem value="transparent">✨ Transparent (Checkerboard)</MenuItem>
                  <MenuItem value="white">⬜ White Background</MenuItem>
                  <MenuItem value="black">⬛ Black Background</MenuItem>
                  <MenuItem value="blur">🌫️ Blurred Background</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          )}

          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={handleProcess}
              disabled={processing || modelLoading}
            >
              {modelLoading ? `Loading model... ${loadProgress}%` : processing ? 'Processing...' : 'Process Image'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
            >
              Reset
            </Button>
            {processedImage && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyToClipboard}
                >
                  Copy
                </Button>
              </>
            )}
          </Box>

          {/* Processing Steps Stepper */}
          {activeStep >= 0 && (
            <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
              <Stepper activeStep={activeStep > 2 ? 3 : activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label} completed={activeStep > index}>
                    <StepLabel>
                      {label}
                      {activeStep === index && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                          <CircularProgress size={20} />
                        </Box>
                      )}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep >= 3 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    ✅ All steps completed successfully!
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

          <DemoModeNotice />

          {processingTime && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Processing completed in {formatTime(processingTime)}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={processedImage ? 6 : 12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2">
                    Original Image
                  </Typography>
                  {originalImageDimensions && (
                    <Typography variant="caption" color="text.secondary">
                      {originalImageDimensions.width} × {originalImageDimensions.height} px
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    overflow: 'auto',
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                  }}
                >
                  <TransformWrapper>
                    <TransformComponent
                      wrapperStyle={{ cursor: 'zoom-in' }}
                      contentStyle={{ cursor: 'grab' }}
                    >
                      <img
                        src={originalImage}
                        alt="Original"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </Box>
              </Paper>
            </Grid>

            {processedImage && (
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">
                      Enhanced Image
                    </Typography>
                    {processedImageDimensions && (
                      <Typography variant="caption" color="text.secondary">
                        {processedImageDimensions.width} × {processedImageDimensions.height} px
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 400,
                      overflow: 'auto',
                      borderRadius: 1,
                      bgcolor: 'grey.100',
                    }}
                  >
                    <TransformWrapper>
                      <TransformComponent
                        wrapperStyle={{ cursor: 'zoom-in' }}
                        contentStyle={{ cursor: 'grab' }}
                      >
                        <img
                          src={processedImage}
                          alt="Processed"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>

          {processedImage && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Comparison Slider
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 400,
                  overflow: 'hidden',
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <img
                    src={processedImage}
                    alt="Processed"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${comparisonSlider}%`,
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={originalImage}
                    alt="Original"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: `${comparisonSlider}%`,
                    width: 2,
                    height: '100%',
                    bgcolor: 'primary.main',
                    zIndex: 10,
                  }}
                />
              </Box>
              <Slider
                value={comparisonSlider}
                onChange={(e, value) => setComparisonSlider(value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </Box>
      )}
    </Paper>
    </Box>
  );
}

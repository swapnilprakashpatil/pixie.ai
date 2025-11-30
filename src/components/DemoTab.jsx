import { useState, useCallback } from 'react';
import { Paper, Box, Button, Typography, Grid, CircularProgress, Alert, Slider } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDropzone } from 'react-dropzone';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useAppStore } from '../store/appStore';
import { validateImageFile, fileToDataURL, downloadImage, formatTime } from '../lib/utils';
import { MODELS } from '../lib/constants';
import { loadPipeline, processImage as processWithAI } from '../lib/aiService';
import DemoModeNotice from './DemoModeNotice';

export default function DemoTab() {
  const {
    currentTask,
    originalImage,
    processedImage,
    processing,
    processingTime,
    modelLoading,
    setOriginalImage,
    setProcessedImage,
    setProcessing,
    setProcessingTime,
    setModelLoading,
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
    
    const modelInfo = MODELS[currentTask];
    const startTime = performance.now();
    
    // Enhanced logging with full details
    addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
    addLog(`🚀 Starting ${currentTask.toUpperCase()} processing pipeline`, 'info');
    addLog(`📋 Task: ${modelInfo.name}`, 'info');
    addLog(`📝 Description: ${modelInfo.description}`, 'info');
    addLog(`🔧 Model ID: ${modelInfo.id}`, 'info');
    addLog(`📊 Input Image: ${originalImageDimensions.width}×${originalImageDimensions.height}px`, 'info');
    addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');

    try {
      // Load model with progress callback
      addLog(`⏳ STEP 1/3: ${modelInfo.processingSteps?.loading || 'Loading AI model...'}`, 'info');
      addLog(`📦 Initializing ${modelInfo.name}...`, 'info');
      await loadPipeline(modelInfo.id, currentTask, (progress) => {
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
      const loadTime = performance.now() - startTime;
      addLog(`✅ Model loaded successfully in ${formatTime(loadTime)}`, 'success');
      addLog(`💾 Model cached for future use`, 'info');
      addLog(`🎯 Key Features: ${modelInfo.features?.slice(0, 2).join(', ')}`, 'info');

      // Process image
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
      addLog(`🎨 STEP 2/3: ${modelInfo.processingSteps?.processing || 'Processing image...'}`, 'info');
      addLog(`🔬 Applying ${currentTask} algorithms...`, 'info');
      
      // Simulate processing progress
      let currentProgress = 0;
      setProcessingProgressStore(0);
      const progressInterval = setInterval(() => {
        currentProgress = Math.min(currentProgress + 10, 90);
        setProcessingProgressStore(currentProgress);
      }, 100);
      
      const processingStartTime = performance.now();
      const result = await processWithAI(originalImage, modelInfo.id, currentTask);
      
      clearInterval(progressInterval);
      setProcessingProgressStore(100);
      
      const processingDuration = performance.now() - processingStartTime;
      
      addLog(`⚡ Processing completed in ${formatTime(processingDuration)}`, 'success');
      
      // Get processed image dimensions
      addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
      addLog(`🎬 STEP 3/3: ${modelInfo.processingSteps?.generating || 'Generating final result...'}`, 'info');
      
      const processedImg = new Image();
      processedImg.onload = () => {
        const dims = { width: processedImg.width, height: processedImg.height };
        setProcessedImageDimensions(dims);
        
        const totalTime = performance.now() - startTime;
        const scaleFactor = (dims.width / originalImageDimensions.width).toFixed(2);
        
        addLog(`📐 Output Resolution: ${dims.width}×${dims.height}px`, 'success');
        addLog(`📊 Scale Factor: ${scaleFactor}x`, 'success');
        addLog(`⏱️ Total Processing Time: ${formatTime(totalTime)}`, 'success');
        addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        addLog(`🎉 ${currentTask.toUpperCase()} completed successfully!`, 'success');
        addLog(`💡 Use Cases: ${modelInfo.useCases?.slice(0, 2).join(', ')}`, 'info');
        addLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
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
              disabled={processing}
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
  );
}

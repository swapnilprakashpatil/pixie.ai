import { create } from "zustand";
import { TASKS, TABS } from "../lib/constants";

export const useAppStore = create((set) => ({
  // Current task and tab
  currentTask: TASKS.DASHBOARD,
  currentTab: TABS.DEMO,

  // Model state
  modelLoaded: false,
  modelLoading: false,
  modelLoadTime: null,
  selectedModel: null, // For tasks with multiple model options

  // Image state
  originalImage: null,
  processedImage: null,

  // Processing state
  processing: false,
  processingTime: null,
  progress: 0,
  loadProgress: 0,
  processingProgress: 0,
  activeStep: -1, // -1 = not started, 0-2 = processing steps, 3 = completed
  denoisingLevel: 85, // 0-100, controls denoising strength (85 = very strong/best quality)
  upscaleFactor: 4, // 1-4, controls super-resolution upscaling factor (4x = maximum/best quality)
  colorizationIntensity: 90, // 0-100, controls colorization strength (90 = very vibrant/best quality)
  colorizationSaturation: 80, // 0-100, controls color saturation (80 = rich/best quality)
  inpaintingGuidanceScale: 15, // 1-20, controls how closely to follow the context (15 = strict/high quality)
  inpaintingInferenceSteps: 40, // 10-50, controls quality vs speed (40 = high quality)
  inpaintingStrength: 0.95, // 0-1, controls how much to modify masked area (0.95 = very strong/high quality)
  objectDetectionConfidence: 0.25, // 0-1, minimum confidence threshold for detections (0.25 = balanced)
  objectDetectionIOU: 0.5, // 0-1, IOU threshold for Non-Maximum Suppression (0.50 = balanced)
  objectDetectionMaxDetections: 50, // 1-100, maximum number of objects to detect (50 = balanced)
  poseEstimationConfidence: 0.3, // 0-1, minimum confidence threshold for pose detections (0.3 = balanced)
  poseKeypointThreshold: 0.2, // 0-1, minimum confidence for individual keypoints (0.2 = balanced)
  poseMaxDetections: 10, // 1-20, maximum number of people to detect (10 = balanced)
  maskingEdgeThreshold: 0.3, // 0-1, edge detection sensitivity (0.3 = balanced)
  maskingSegmentationIntensity: 0.7, // 0-1, segmentation strength (0.7 = strong/high quality)
  maskingMorphologyStrength: 0.5, // 0-1, morphological operations strength (0.5 = balanced)
  styleTransferStyle: "picasso", // Style selection: oil-painting, watercolor, monet, van-gogh, picasso, warhol, kandinsky, anime, sketch, stained-glass
  styleTransferIntensity: 0.8, // 0-1, style application intensity (0.8 = strong/high quality)
  bgRemovalMethod: "ai-saliency", // Method selection: edge-detection, color-segmentation, grabcut, ai-saliency
  bgRemovalThreshold: 0.5, // 0-1, threshold for foreground detection (0.5 = balanced)
  bgRemovalFeathering: 3, // 0-10, edge feathering/smoothing (3 = moderate)
  bgRemovalOutputMode: "transparent", // Output mode: transparent, checkerboard, white, black, blur
  classificationTopK: 5, // 1-10, number of top predictions to show (5 = top 5)
  classificationConfidenceThreshold: 0.01, // 0-1, minimum confidence to display (0.01 = show all)
  classificationResults: null, // Stores the classification results array

  // Diagnostics
  logs: [],
  systemInfo: null,
  performanceMetrics: {
    modelLoadTime: null,
    inferenceTime: null,
    memoryUsage: null,
  },

  // Actions
  setCurrentTask: (task) =>
    set({
      currentTask: task,
      currentTab: TABS.INFORMATION,
      selectedModel: null,
    }),
  setCurrentTab: (tab) => set({ currentTab: tab }),

  setModelLoaded: (loaded) => set({ modelLoaded: loaded }),
  setModelLoading: (loading) => set({ modelLoading: loading }),
  setModelLoadTime: (time) => set({ modelLoadTime: time }),
  setSelectedModel: (modelId) => set({ selectedModel: modelId }),

  setOriginalImage: (image) =>
    set({ originalImage: image, processedImage: null }),
  setProcessedImage: (image) => set({ processedImage: image }),

  setProcessing: (processing) => set({ processing }),
  setProcessingTime: (time) => set({ processingTime: time }),
  setProgress: (progress) => set({ progress }),
  setLoadProgress: (loadProgress) => set({ loadProgress }),
  setProcessingProgress: (processingProgress) => set({ processingProgress }),
  setActiveStep: (activeStep) => set({ activeStep }),
  setDenoisingLevel: (denoisingLevel) => set({ denoisingLevel }),
  setUpscaleFactor: (upscaleFactor) => set({ upscaleFactor }),
  setColorizationIntensity: (colorizationIntensity) =>
    set({ colorizationIntensity }),
  setColorizationSaturation: (colorizationSaturation) =>
    set({ colorizationSaturation }),
  setInpaintingGuidanceScale: (inpaintingGuidanceScale) =>
    set({ inpaintingGuidanceScale }),
  setInpaintingInferenceSteps: (inpaintingInferenceSteps) =>
    set({ inpaintingInferenceSteps }),
  setInpaintingStrength: (inpaintingStrength) => set({ inpaintingStrength }),
  setObjectDetectionConfidence: (objectDetectionConfidence) =>
    set({ objectDetectionConfidence }),
  setObjectDetectionIOU: (objectDetectionIOU) => set({ objectDetectionIOU }),
  setObjectDetectionMaxDetections: (objectDetectionMaxDetections) =>
    set({ objectDetectionMaxDetections }),
  setPoseEstimationConfidence: (poseEstimationConfidence) =>
    set({ poseEstimationConfidence }),
  setPoseKeypointThreshold: (poseKeypointThreshold) =>
    set({ poseKeypointThreshold }),
  setPoseMaxDetections: (poseMaxDetections) => set({ poseMaxDetections }),
  setMaskingEdgeThreshold: (maskingEdgeThreshold) =>
    set({ maskingEdgeThreshold }),
  setMaskingSegmentationIntensity: (maskingSegmentationIntensity) =>
    set({ maskingSegmentationIntensity }),
  setMaskingMorphologyStrength: (maskingMorphologyStrength) =>
    set({ maskingMorphologyStrength }),
  setStyleTransferStyle: (styleTransferStyle) => set({ styleTransferStyle }),
  setStyleTransferIntensity: (styleTransferIntensity) =>
    set({ styleTransferIntensity }),
  setBgRemovalMethod: (bgRemovalMethod) => set({ bgRemovalMethod }),
  setBgRemovalThreshold: (bgRemovalThreshold) => set({ bgRemovalThreshold }),
  setBgRemovalFeathering: (bgRemovalFeathering) => set({ bgRemovalFeathering }),
  setBgRemovalOutputMode: (bgRemovalOutputMode) => set({ bgRemovalOutputMode }),
  setClassificationTopK: (classificationTopK) => set({ classificationTopK }),
  setClassificationConfidenceThreshold: (classificationConfidenceThreshold) =>
    set({ classificationConfidenceThreshold }),
  setClassificationResults: (classificationResults) =>
    set({ classificationResults }),

  addLog: (message, type = "info") =>
    set((state) => ({
      logs: [
        ...state.logs,
        { message, type, timestamp: new Date().toISOString() },
      ],
    })),

  clearLogs: () => set({ logs: [] }),

  setSystemInfo: (info) => set({ systemInfo: info }),

  updatePerformanceMetrics: (metrics) =>
    set((state) => ({
      performanceMetrics: { ...state.performanceMetrics, ...metrics },
    })),

  resetImageState: () =>
    set({
      originalImage: null,
      processedImage: null,
      processing: false,
      processingTime: null,
      progress: 0,
      loadProgress: 0,
      processingProgress: 0,
      activeStep: -1,
    }),
}));

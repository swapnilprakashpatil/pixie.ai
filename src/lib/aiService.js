// Web Worker-based AI service to isolate ONNX Runtime
import { useAppStore } from "../store/appStore";

let worker = null;
let messageId = 0;
const pendingMessages = new Map();

/**
 * Initialize the AI worker
 */
function initWorker() {
  if (worker) return worker;

  worker = new Worker(new URL("../workers/aiWorker.js", import.meta.url), {
    type: "module",
  });

  worker.onmessage = (e) => {
    const { id, type, data, error } = e.data;

    // Handle log messages from worker
    if (type === "log") {
      const { addLog } = useAppStore.getState();
      addLog(data.type, data.message);
      return;
    }

    const pending = pendingMessages.get(id);

    if (!pending) return;

    if (type === "progress" && pending.onProgress) {
      pending.onProgress(data);
    } else if (type === "success") {
      pendingMessages.delete(id);
      pending.resolve(data);
    } else if (type === "error") {
      pendingMessages.delete(id);
      pending.reject(new Error(error));
    }
  };

  worker.onerror = (error) => {
    console.error("❌ Worker error:", error);
  };

  return worker;
}

/**
 * Send a message to the worker and wait for response
 */
function sendWorkerMessage(type, data, onProgress) {
  return new Promise((resolve, reject) => {
    const id = messageId++;
    pendingMessages.set(id, { resolve, reject, onProgress });

    initWorker().postMessage({ id, type, data });

    // Timeout after 5 minutes
    setTimeout(() => {
      if (pendingMessages.has(id)) {
        pendingMessages.delete(id);
        reject(new Error("Worker timeout"));
      }
    }, 300000);
  });
}

/**
 * Load and cache a pipeline for a specific task
 */
export async function loadPipeline(modelId, task, onProgress) {
  console.log(`📥 Loading model: ${modelId} for task: ${task}`);

  try {
    await sendWorkerMessage("load", { modelId, task }, onProgress);
    console.log(`✅ Model ${modelId} loaded successfully`);
    return true;
  } catch (error) {
    console.error("❌ Pipeline loading error:", error);
    throw new Error(`Failed to load model: ${error.message}`);
  }
}

/**
 * Process an image with a specific model
 */
export async function processImage(
  imageUrl,
  modelId,
  task,
  denoisingLevel = 85,
  upscaleFactor = 4,
  colorizationIntensity = 90,
  colorizationSaturation = 80,
  inpaintingGuidanceScale = 15,
  inpaintingInferenceSteps = 40,
  inpaintingStrength = 0.95,
  objectDetectionConfidence = 0.25,
  objectDetectionIOU = 0.5,
  objectDetectionMaxDetections = 50,
  poseEstimationConfidence = 0.3,
  poseKeypointThreshold = 0.2,
  poseMaxDetections = 10,
  maskingEdgeThreshold = 0.3,
  maskingSegmentationIntensity = 0.7,
  maskingMorphologyStrength = 0.5,
  styleTransferStyle = "picasso",
  styleTransferIntensity = 0.8,
  bgRemovalMethod = "ai-saliency",
  bgRemovalThreshold = 0.5,
  bgRemovalFeathering = 3,
  bgRemovalOutputMode = "transparent"
) {
  console.log(
    `🎨 Processing image with ${modelId}, denoising: ${denoisingLevel}, upscale: ${upscaleFactor}x, colorization: ${colorizationIntensity}/${colorizationSaturation}, inpainting: ${inpaintingGuidanceScale}/${inpaintingInferenceSteps}/${inpaintingStrength}, detection: ${objectDetectionConfidence}/${objectDetectionIOU}/${objectDetectionMaxDetections}, pose: ${poseEstimationConfidence}/${poseKeypointThreshold}/${poseMaxDetections}, masking: ${maskingEdgeThreshold}/${maskingSegmentationIntensity}/${maskingMorphologyStrength}, style: ${styleTransferStyle}/${styleTransferIntensity}, bgRemoval: ${bgRemovalMethod}/${bgRemovalThreshold}/${bgRemovalFeathering}/${bgRemovalOutputMode}`
  );

  try {
    const result = await sendWorkerMessage("process", {
      imageUrl,
      modelId,
      task,
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
    });

    console.log("✅ Image processing complete");
    return result.imageUrl;
  } catch (error) {
    console.error("❌ Processing error:", error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
}

/**
 * Clear the pipeline cache
 */
export function clearCache() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  pendingMessages.clear();
  console.log("🗑️ Worker terminated and cache cleared");
}

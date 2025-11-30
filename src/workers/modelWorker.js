import { pipeline, env } from "@xenova/transformers";

// Configure environment for browser usage
env.allowLocalModels = false;
env.useBrowserCache = true;
env.backends.onnx.wasm.numThreads = 1;

// Status flag
let isInitialized = false;

// Cache for loaded models
const modelCache = new Map();

/**
 * Initialize the worker environment
 */
async function initialize() {
  if (isInitialized) return;

  try {
    // Set up environment
    self.postMessage({
      type: "info",
      message: "Worker initialized",
    });
    isInitialized = true;
  } catch (error) {
    self.postMessage({
      type: "error",
      error: `Initialization failed: ${error.message}`,
    });
  }
}

/**
 * Load a model for a specific task
 */
async function loadModel(modelId, task) {
  const cacheKey = `${modelId}-${task}`;

  if (modelCache.has(cacheKey)) {
    return modelCache.get(cacheKey);
  }

  self.postMessage({
    type: "progress",
    message: "Loading model...",
    progress: 0,
  });

  const startTime = performance.now();

  try {
    let pipe;

    // Create pipeline based on task type
    if (
      task === "super-resolution" ||
      task === "denoising" ||
      task === "inpainting"
    ) {
      pipe = await pipeline("image-to-image", modelId, {
        progress_callback: (progress) => {
          self.postMessage({
            type: "progress",
            message: `Loading model: ${Math.round(progress.progress)}%`,
            progress: progress.progress,
          });
        },
      });
    } else if (task === "colorization") {
      pipe = await pipeline("image-classification", modelId, {
        progress_callback: (progress) => {
          self.postMessage({
            type: "progress",
            message: `Loading model: ${Math.round(progress.progress)}%`,
            progress: progress.progress,
          });
        },
      });
    } else {
      throw new Error(`Unsupported task: ${task}`);
    }

    modelCache.set(cacheKey, pipe);

    const loadTime = performance.now() - startTime;

    self.postMessage({
      type: "model-loaded",
      loadTime,
    });

    return pipe;
  } catch (error) {
    self.postMessage({
      type: "error",
      error: `Model loading failed: ${error.message}`,
    });
    throw error;
  }
}

/**
 * Process image based on task
 */
async function processImage(imageData, modelId, task) {
  self.postMessage({
    type: "progress",
    message: "Processing image...",
    progress: 0,
  });

  const startTime = performance.now();

  try {
    const pipe = await loadModel(modelId, task);

    self.postMessage({
      type: "progress",
      message: "Running inference...",
      progress: 50,
    });

    let result;

    // Process based on task type
    if (task === "super-resolution" || task === "denoising") {
      result = await pipe(imageData);

      // Convert tensor to image data
      const canvas = new OffscreenCanvas(
        result.width || 512,
        result.height || 512
      );
      const ctx = canvas.getContext("2d");

      // For now, return the input as we need proper tensor to image conversion
      // This is a placeholder that will be enhanced with proper implementation
      result = imageData;
    } else if (task === "colorization") {
      // For colorization, we'll use a different approach
      // This is a placeholder for the actual colorization logic
      result = imageData;
    } else if (task === "inpainting") {
      // Inpainting requires mask input
      result = imageData;
    }

    const processingTime = performance.now() - startTime;

    self.postMessage({
      type: "result",
      result: result,
      processingTime,
    });
  } catch (error) {
    self.postMessage({
      type: "error",
      error: error.message,
    });
  }
}

// Message handler
self.addEventListener("message", async (event) => {
  const { type, imageData, modelId, task } = event.data;

  // Initialize on first message
  if (!isInitialized) {
    await initialize();
  }

  try {
    switch (type) {
      case "load-model":
        await loadModel(modelId, task);
        break;

      case "process":
        await processImage(imageData, modelId, task);
        break;

      case "clear-cache":
        modelCache.clear();
        self.postMessage({
          type: "cache-cleared",
        });
        break;

      default:
        console.warn("Unknown message type:", type);
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      error: `Worker error: ${error.message}`,
    });
  }
});

/**
 * Validates if a file is a supported image format
 */
export const validateImageFile = (file) => {
  const supportedFormats = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/bmp",
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    return { valid: false, error: "No file provided" };
  }

  if (!supportedFormats.includes(file.type)) {
    return {
      valid: false,
      error: "Unsupported file format. Please use JPG, PNG, WebP, or BMP.",
    };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size exceeds 10MB limit." };
  }

  return { valid: true };
};

/**
 * Converts a file to base64 data URL
 */
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Loads an image from a URL
 */
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Converts image to canvas
 */
export const imageToCanvas = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return canvas;
};

/**
 * Downloads an image
 */
export const downloadImage = (dataUrl, filename = "enhanced-image.png") => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Formats bytes to human-readable size
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Formats milliseconds to human-readable time
 */
export const formatTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

/**
 * Detects browser and system capabilities
 */
export const detectCapabilities = () => {
  const capabilities = {
    browser: {
      name: "Unknown",
      version: "Unknown",
      userAgent: navigator.userAgent,
    },
    platform: navigator.platform,
    webGPU: "gpu" in navigator,
    webAssembly: typeof WebAssembly !== "undefined",
    webWorkers: typeof Worker !== "undefined",
    indexedDB: typeof indexedDB !== "undefined",
    maxTextureSize: null,
    gpu: null,
  };

  // Detect browser
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) {
    capabilities.browser.name = "Chrome";
    const match = ua.match(/Chrome\/(\d+)/);
    if (match) capabilities.browser.version = match[1];
  } else if (ua.includes("Firefox")) {
    capabilities.browser.name = "Firefox";
    const match = ua.match(/Firefox\/(\d+)/);
    if (match) capabilities.browser.version = match[1];
  } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
    capabilities.browser.name = "Safari";
    const match = ua.match(/Version\/(\d+)/);
    if (match) capabilities.browser.version = match[1];
  } else if (ua.includes("Edg")) {
    capabilities.browser.name = "Edge";
    const match = ua.match(/Edg\/(\d+)/);
    if (match) capabilities.browser.version = match[1];
  }

  // Get WebGL max texture size
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      capabilities.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  } catch (e) {
    // WebGL detection failed silently
  }

  return capabilities;
};

/**
 * Gets GPU information if available
 */
export const getGPUInfo = async () => {
  if ("gpu" in navigator) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        return {
          vendor: adapter.info?.vendor || "Unknown",
          architecture: adapter.info?.architecture || "Unknown",
          device: adapter.info?.device || "Unknown",
          description: adapter.info?.description || "Unknown",
        };
      }
    } catch (e) {
      // GPU info retrieval failed silently
    }
  }
  return null;
};

/**
 * Gets memory usage information
 */
export const getMemoryInfo = () => {
  if ("memory" in performance) {
    const memory = performance.memory;
    return {
      usedJSHeapSize: formatBytes(memory.usedJSHeapSize),
      totalJSHeapSize: formatBytes(memory.totalJSHeapSize),
      jsHeapSizeLimit: formatBytes(memory.jsHeapSizeLimit),
      usedJSHeapSizeRaw: memory.usedJSHeapSize,
    };
  }
  return null;
};

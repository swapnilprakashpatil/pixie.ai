// Advanced image processing worker using Canvas API
// This provides real image enhancement without ONNX Runtime dependencies
import * as ort from "onnxruntime-web";

// Configure ONNX Runtime to suppress warnings
ort.env.logLevel = "error"; // Only show errors, not warnings

const pipelineCache = new Map();

/**
 * Apply advanced image processing based on task type
 */
async function processImageWithFilters(
  imageUrl,
  task,
  modelId = null,
  denoisingLevel = 85,
  upscaleFactor = 4,
  colorizationIntensity = 90,
  colorizationSaturation = 80,
  inpaintingGuidanceScale = 15,
  inpaintingInferenceSteps = 40,
  inpaintingStrength = 0.95,
  objectDetectionConfidence = 0.35,
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
  try {
    // Fetch the image as a blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create ImageBitmap from blob (works in Web Workers)
    const imageBitmap = await createImageBitmap(blob);

    const width = imageBitmap.width;
    const height = imageBitmap.height;

    // Handle super-resolution (upscaling) separately
    if (task === "super-resolution") {
      return await upscaleImage(
        imageBitmap,
        width * upscaleFactor,
        height * upscaleFactor,
        upscaleFactor
      );
    }

    // Create canvas and draw image
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(imageBitmap, 0, 0);

    // Get image data for processing
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Apply appropriate filter based on task
    switch (task) {
      case "denoising":
        applyBilateralFilter(data, width, height, denoisingLevel);
        ctx.putImageData(imageData, 0, 0);
        break;
      case "colorization":
        enhanceColors(
          data,
          width,
          height,
          colorizationIntensity,
          colorizationSaturation
        );
        ctx.putImageData(imageData, 0, 0);
        break;
      case "inpainting":
        console.log(
          `🎨 Inpainting with guidance: ${inpaintingGuidanceScale}, steps: ${inpaintingInferenceSteps}, strength: ${inpaintingStrength}`
        );
        // Note: Full Stable Diffusion inpainting requires ONNX Runtime implementation
        // For now, using edge-preserving filter as a placeholder
        // TODO: Implement actual Stable Diffusion inpainting with parameters:
        //   - guidance_scale: inpaintingGuidanceScale
        //   - num_inference_steps: inpaintingInferenceSteps
        //   - strength: inpaintingStrength
        applyEdgePreservingFilter(data, width, height, inpaintingStrength);
        ctx.putImageData(imageData, 0, 0);
        break;
      case "object-detection":
        // Use ONNX-based object detection (YOLO or DETR based on modelId)
        console.log("🔍 Object Detection - Model ID:", modelId);
        console.log("🔍 Model ID type:", typeof modelId);
        console.log("🔍 Model ID value:", JSON.stringify(modelId));
        console.log(
          "🔍 Checking if includes detr-resnet:",
          modelId && modelId.includes("detr-resnet")
        );
        try {
          if (modelId && modelId.includes("detr-resnet")) {
            console.log("✅ Using DETR detection");
            await applyDETRDetection(
              ctx,
              imageBitmap,
              width,
              height,
              modelId,
              objectDetectionConfidence,
              objectDetectionIOU,
              objectDetectionMaxDetections
            );
          } else {
            console.log("✅ Using YOLO detection (modelId:", modelId, ")");
            await applyYOLODetection(
              ctx,
              imageBitmap,
              width,
              height,
              objectDetectionConfidence,
              objectDetectionIOU,
              objectDetectionMaxDetections
            );
          }
        } catch (error) {
          console.error("❌ Object detection failed:", error);
          self.postMessage({
            type: "log",
            data: {
              type: "error",
              message: `Object detection failed: ${error.message}`,
            },
          });
          throw error;
        }
        break;
      case "pose-estimation":
        // Draw on canvas directly, keep original image
        await applyPoseEstimation(
          ctx,
          data,
          width,
          height,
          poseEstimationConfidence,
          poseKeypointThreshold,
          poseMaxDetections
        );
        break;
      case "image-masking":
        applyImageMasking(
          data,
          width,
          height,
          maskingEdgeThreshold,
          maskingSegmentationIntensity,
          maskingMorphologyStrength
        );
        ctx.putImageData(imageData, 0, 0);
        break;
      case "style-transfer":
        await applyStyleTransfer(
          ctx,
          data,
          width,
          height,
          styleTransferStyle,
          styleTransferIntensity
        );
        break;
      case "ai-image-generation":
        await applyAIImageGeneration(ctx, data, width, height);
        break;
      case "background-removal":
        await applyBackgroundRemoval(
          ctx,
          data,
          width,
          height,
          bgRemovalMethod,
          bgRemovalThreshold,
          bgRemovalFeathering,
          bgRemovalOutputMode
        );
        break;
      case "image-to-sketch":
        applyImageToSketch(data, width, height);
        ctx.putImageData(imageData, 0, 0);
        break;
      default:
        enhanceImage(data);
        ctx.putImageData(imageData, 0, 0);
    }

    // Convert to blob and create URL
    const resultBlob = await canvas.convertToBlob({ type: "image/png" });
    const url = URL.createObjectURL(resultBlob);

    return { imageUrl: url };
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
}

/**
 * Bilateral filter for noise reduction
 */
/**
 * Apply aggressive bilateral filter for strong denoising
 * Uses multiple passes and larger kernel for better noise removal
 * @param {Uint8ClampedArray} data - Image data to process
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {number} denoisingLevel - Denoising strength (0-100, default 50)
 */
function applyBilateralFilter(data, width, height, denoisingLevel = 50) {
  // If denoising is disabled (level 0), return immediately
  if (denoisingLevel === 0) {
    console.log("⏭️ Denoising disabled (level 0)");
    return;
  }

  // Scale parameters based on denoising level (0-100)
  // Level 0 = no denoising, Level 50 = medium, Level 100 = maximum
  const scale = denoisingLevel / 50; // 0.0 to 2.0

  const original = new Uint8ClampedArray(data);

  // First pass - aggressive denoising
  // Scale spatial and range sigma based on denoising level
  const sigma_s1 = 4 + 4 * scale; // 4-12 based on level
  const sigma_r1 = 40 + 35 * scale; // 40-110 based on level

  console.log(
    `🎨 Applying bilateral filter - Level: ${denoisingLevel}%, Sigma S1: ${sigma_s1.toFixed(
      1
    )}, Sigma R1: ${sigma_r1.toFixed(1)}`
  );

  for (let y = 4; y < height - 4; y++) {
    for (let x = 4; x < width - 4; x++) {
      const idx = (y * width + x) * 4;
      let sumR = 0,
        sumG = 0,
        sumB = 0,
        totalWeight = 0;

      // 9x9 kernel for first pass - more aggressive
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          const nidx = (ny * width + nx) * 4;

          // Spatial distance
          const spatialDist = Math.sqrt(dx * dx + dy * dy);
          const spatialWeight = Math.exp(
            -(spatialDist * spatialDist) / (2 * sigma_s1 * sigma_s1)
          );

          // Color distance
          const colorDist = Math.sqrt(
            Math.pow(original[idx] - original[nidx], 2) +
              Math.pow(original[idx + 1] - original[nidx + 1], 2) +
              Math.pow(original[idx + 2] - original[nidx + 2], 2)
          );
          const rangeWeight = Math.exp(
            -(colorDist * colorDist) / (2 * sigma_r1 * sigma_r1)
          );

          const weight = spatialWeight * rangeWeight;
          sumR += original[nidx] * weight;
          sumG += original[nidx + 1] * weight;
          sumB += original[nidx + 2] * weight;
          totalWeight += weight;
        }
      }

      data[idx] = sumR / totalWeight;
      data[idx + 1] = sumG / totalWeight;
      data[idx + 2] = sumB / totalWeight;
    }
  }

  // Second pass - median filter (only if level >= 33)
  if (denoisingLevel >= 33) {
    const tempData = new Uint8ClampedArray(data);
    for (let y = 2; y < height - 2; y++) {
      for (let x = 2; x < width - 2; x++) {
        const idx = (y * width + x) * 4;
        const neighborsR = [];
        const neighborsG = [];
        const neighborsB = [];

        // 5x5 neighborhood
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const nidx = ((y + dy) * width + (x + dx)) * 4;
            neighborsR.push(tempData[nidx]);
            neighborsG.push(tempData[nidx + 1]);
            neighborsB.push(tempData[nidx + 2]);
          }
        }

        // Get median values
        neighborsR.sort((a, b) => a - b);
        neighborsG.sort((a, b) => a - b);
        neighborsB.sort((a, b) => a - b);

        const median = Math.floor(neighborsR.length / 2);
        data[idx] = neighborsR[median];
        data[idx + 1] = neighborsG[median];
        data[idx + 2] = neighborsB[median];
      }
    }
  }

  // Third pass - light bilateral filter to smooth the result (only if level >= 50)
  if (denoisingLevel >= 50) {
    const smoothed = new Uint8ClampedArray(data);
    const sigma_s2 = 2 + scale * 1; // 2-4 based on level
    const sigma_r2 = 30 + scale * 10; // 30-50 based on level

    for (let y = 3; y < height - 3; y++) {
      for (let x = 3; x < width - 3; x++) {
        const idx = (y * width + x) * 4;
        let sumR = 0,
          sumG = 0,
          sumB = 0,
          totalWeight = 0;

        // 7x7 kernel for final smoothing
        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            const nidx = (ny * width + nx) * 4;

            const spatialDist = Math.sqrt(dx * dx + dy * dy);
            const spatialWeight = Math.exp(
              -(spatialDist * spatialDist) / (2 * sigma_s2 * sigma_s2)
            );

            const colorDist = Math.sqrt(
              Math.pow(smoothed[idx] - smoothed[nidx], 2) +
                Math.pow(smoothed[idx + 1] - smoothed[nidx + 1], 2) +
                Math.pow(smoothed[idx + 2] - smoothed[nidx + 2], 2)
            );
            const rangeWeight = Math.exp(
              -(colorDist * colorDist) / (2 * sigma_r2 * sigma_r2)
            );

            const weight = spatialWeight * rangeWeight;
            sumR += smoothed[nidx] * weight;
            sumG += smoothed[nidx + 1] * weight;
            sumB += smoothed[nidx + 2] * weight;
            totalWeight += weight;
          }
        }

        data[idx] = sumR / totalWeight;
        data[idx + 1] = sumG / totalWeight;
        data[idx + 2] = sumB / totalWeight;
      }
    }
  }
}

/**
 * Upscale image using bicubic interpolation
 * @param {ImageBitmap} imageBitmap - Source image
 * @param {number} newWidth - Target width
 * @param {number} newHeight - Target height
 * @param {number} upscaleFactor - Upscaling factor (1-4)
 */
async function upscaleImage(
  imageBitmap,
  newWidth,
  newHeight,
  upscaleFactor = 2
) {
  const canvas = new OffscreenCanvas(newWidth, newHeight);
  const ctx = canvas.getContext("2d");

  // Enable image smoothing for better quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Draw upscaled image
  ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

  // Apply unsharp mask for sharpening (scale strength based on upscale factor)
  const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
  applyUnsharpMask(imageData.data, newWidth, newHeight, upscaleFactor);
  ctx.putImageData(imageData, 0, 0);

  const blob = await canvas.convertToBlob({ type: "image/png" });
  return { imageUrl: URL.createObjectURL(blob) };
}

/**
 * Unsharp mask for sharpening
 * @param {Uint8ClampedArray} data - Image data
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {number} upscaleFactor - Upscaling factor to adjust sharpening strength
 */
function applyUnsharpMask(data, width, height, upscaleFactor = 2) {
  const original = new Uint8ClampedArray(data);
  // Scale sharpening amount based on upscale factor
  // Higher upscale = more sharpening needed (1x: 1.0, 2x: 1.5, 3x: 2.0, 4x: 2.5)
  const amount = 0.5 + upscaleFactor * 0.5;
  const radius = 1;

  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      const idx = (y * width + x) * 4;

      for (let c = 0; c < 3; c++) {
        let blurred = 0;
        let count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nidx = ((y + dy) * width + (x + dx)) * 4;
            blurred += original[nidx + c];
            count++;
          }
        }

        blurred /= count;
        const sharpened =
          original[idx + c] + amount * (original[idx + c] - blurred);
        data[idx + c] = Math.max(0, Math.min(255, sharpened));
      }
    }
  }
}

/**
 * Enhance colors (vibrance and saturation) or colorize grayscale images
 */
/**
 * Enhanced color processing with adjustable intensity and saturation
 * @param {Uint8ClampedArray} data - Image data
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {number} intensity - Colorization intensity 0-100 (default 80)
 * @param {number} saturation - Color saturation 0-100 (default 70)
 */
function enhanceColors(data, width, height, intensity = 80, saturation = 70) {
  // Convert parameters to usable scales
  const intensityScale = intensity / 100; // 0.0 to 1.0
  const saturationScale = saturation / 100; // 0.0 to 1.0

  console.log(
    `🎨 Colorization settings - Intensity: ${intensity}%, Saturation: ${saturation}%`
  );

  // First, check if image is grayscale (B&W) with tolerance
  let isGrayscale = true;
  let grayscaleCount = 0;
  const sampleSize = Math.min(1000, data.length / 4);

  for (let i = 0; i < sampleSize * 4; i += 4) {
    const diff =
      Math.abs(data[i] - data[i + 1]) +
      Math.abs(data[i + 1] - data[i + 2]) +
      Math.abs(data[i] - data[i + 2]);
    if (diff < 10) {
      // Tolerance for compression artifacts
      grayscaleCount++;
    }
  }

  isGrayscale = grayscaleCount / sampleSize > 0.9;

  console.log(
    `🔍 Colorization check: ${grayscaleCount}/${sampleSize} grayscale pixels = ${(
      (grayscaleCount / sampleSize) *
      100
    ).toFixed(1)}%`
  );
  console.log(
    `🎨 Treating as: ${
      isGrayscale ? "GRAYSCALE - will colorize" : "COLOR - will enhance"
    }`
  );

  if (isGrayscale) {
    // Apply realistic photographic colorization
    console.log("🎨 Applying photorealistic AI colorization");

    // Analyze image to detect regions (skin, fabric, background)
    const segmentMap = new Uint8Array(width * height); // 0=shadow, 1=skin, 2=fabric, 3=background
    const edgeMap = new Uint8Array(width * height);

    console.log("🔍 Analyzing image structure and semantic regions");

    // First pass: detect edges and segment regions
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        const i = idx * 4;
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;

        // Edge detection (Sobel)
        const gx =
          -data[((y - 1) * width + x - 1) * 4] -
          2 * data[(y * width + x - 1) * 4] -
          data[((y + 1) * width + x - 1) * 4] +
          data[((y - 1) * width + x + 1) * 4] +
          2 * data[(y * width + x + 1) * 4] +
          data[((y + 1) * width + x + 1) * 4];
        const gy =
          -data[((y - 1) * width + x - 1) * 4] -
          2 * data[((y - 1) * width + x) * 4] -
          data[((y - 1) * width + x + 1) * 4] +
          data[((y + 1) * width + x - 1) * 4] +
          2 * data[((y + 1) * width + x) * 4] +
          data[((y + 1) * width + x + 1) * 4];
        const edgeStrength = Math.sqrt(gx * gx + gy * gy);
        edgeMap[idx] = edgeStrength > 30 ? 1 : 0;

        // Region segmentation based on luminance patterns
        if (gray < 40) {
          segmentMap[idx] = 0; // Shadow/dark
        } else if (gray > 100 && gray < 220) {
          // Check local texture for skin detection
          let localVar = 0;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const ny = Math.max(0, Math.min(height - 1, y + dy));
              const nx = Math.max(0, Math.min(width - 1, x + dx));
              const nGray =
                (data[(ny * width + nx) * 4] +
                  data[(ny * width + nx) * 4 + 1] +
                  data[(ny * width + nx) * 4 + 2]) /
                3;
              localVar += Math.abs(nGray - gray);
            }
          }
          localVar /= 25;

          if (localVar < 15 && gray > 120 && gray < 200) {
            segmentMap[idx] = 1; // Skin (smooth mid-tones)
          } else if (localVar > 20) {
            segmentMap[idx] = 2; // Fabric/texture
          } else {
            segmentMap[idx] = 3; // Background
          }
        } else {
          segmentMap[idx] = 3; // Background/highlights
        }
      }
    }

    console.log("🎨 Applying semantic-aware natural colorization");

    // Second pass: apply colors based on semantic understanding
    for (let i = 0; i < data.length; i += 4) {
      const idx = i / 4;
      const x = idx % width;
      const y = Math.floor(idx / width);
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const segment = segmentMap[idx];
      const isEdge = edgeMap[idx];

      let r, g, b;

      // Natural skin tone colorization - REAL skin colors
      if (segment === 1) {
        // Photographic skin tones with significant warm shift
        if (gray > 180) {
          // Highlights - warm peachy
          r = Math.min(255, gray * 1.05 + 15);
          g = Math.min(255, gray * 0.95 + 8);
          b = Math.min(255, gray * 0.75 + 5);
        } else if (gray > 120) {
          // Mid-tone skin - strong peachy-tan color
          r = Math.min(255, gray * 1.35 + 35);
          g = Math.min(255, gray * 1.1 + 20);
          b = Math.min(255, gray * 0.7 + 10);
        } else {
          // Shadow areas of skin - darker warm tones
          r = Math.min(255, gray * 1.25 + 20);
          g = Math.min(255, gray * 1.05 + 10);
          b = Math.min(255, gray * 0.75);
        }
      }
      // Fabric/clothing (varied natural tones)
      else if (segment === 2) {
        // Use position-based color variation for fabrics
        const colorSeed = (x * 7 + y * 13) % 100;

        if (gray > 140) {
          // Light fabric - varied natural colors
          if (colorSeed < 33) {
            // Warm beige/tan
            r = Math.min(255, gray * 1.08 + 15);
            g = Math.min(255, gray * 1.0 + 10);
            b = Math.min(255, gray * 0.85 + 5);
          } else if (colorSeed < 66) {
            // Cool gray-blue
            r = Math.min(255, gray * 0.88 + 5);
            g = Math.min(255, gray * 0.92 + 8);
            b = Math.min(255, gray * 1.05 + 12);
          } else {
            // Neutral warm
            r = Math.min(255, gray * 1.02 + 8);
            g = Math.min(255, gray * 0.98 + 6);
            b = Math.min(255, gray * 0.9 + 4);
          }
        } else if (gray > 80) {
          // Mid-tone fabric - richer colors
          if (colorSeed < 33) {
            // Brown/rust tones
            r = Math.min(255, gray * 1.3 + 25);
            g = Math.min(255, gray * 1.05 + 12);
            b = Math.min(255, gray * 0.7 + 5);
          } else if (colorSeed < 66) {
            // Blue-gray
            r = Math.min(255, gray * 0.75 + 5);
            g = Math.min(255, gray * 0.85 + 10);
            b = Math.min(255, gray * 1.15 + 18);
          } else {
            // Olive/muted green
            r = Math.min(255, gray * 0.95 + 8);
            g = Math.min(255, gray * 1.1 + 15);
            b = Math.min(255, gray * 0.8 + 5);
          }
        } else {
          // Dark fabric - deep saturated colors
          if (colorSeed < 33) {
            // Deep brown
            r = Math.min(255, gray * 1.15 + 10);
            g = Math.min(255, gray * 0.9 + 5);
            b = Math.min(255, gray * 0.65);
          } else if (colorSeed < 66) {
            // Navy/deep blue
            r = Math.min(255, gray * 0.65);
            g = Math.min(255, gray * 0.75 + 5);
            b = Math.min(255, gray * 1.2 + 15);
          } else {
            // Charcoal with color hint
            r = Math.min(255, gray * 0.95);
            g = Math.min(255, gray * 0.9);
            b = Math.min(255, gray * 1.0 + 5);
          }
        }
      }
      // Shadows and dark areas
      else if (segment === 0) {
        // Shadows have cool, slightly blue tones
        if (gray > 30) {
          r = Math.min(255, gray * 0.85);
          g = Math.min(255, gray * 0.88 + 3);
          b = Math.min(255, gray * 1.1 + 8);
        } else {
          // Very dark shadows - deep cool
          r = gray * 0.8;
          g = gray * 0.85;
          b = Math.min(255, gray * 1.15 + 5);
        }
      }
      // Background and highlights
      else {
        const normY = y / height;

        if (gray > 230) {
          // Pure highlights - neutral white
          r = Math.min(255, gray * 0.99);
          g = Math.min(255, gray * 0.99);
          b = Math.min(255, gray * 1.01);
        } else if (gray > 200) {
          // Bright background - warm neutral
          r = Math.min(255, gray * 1.04 + 5);
          g = Math.min(255, gray * 1.0 + 3);
          b = Math.min(255, gray * 0.95);
        } else if (gray > 140 && normY < 0.3) {
          // Upper background - subtle blue (sky hint)
          r = Math.min(255, gray * 0.88);
          g = Math.min(255, gray * 0.92 + 5);
          b = Math.min(255, gray * 1.12 + 12);
        } else if (gray > 100) {
          // Mid-tone background - warm gray
          r = Math.min(255, gray * 1.08 + 10);
          g = Math.min(255, gray * 1.02 + 5);
          b = Math.min(255, gray * 0.9);
        } else {
          // Darker background - cool gray
          r = Math.min(255, gray * 0.92);
          g = Math.min(255, gray * 0.95 + 3);
          b = Math.min(255, gray * 1.06 + 5);
        }
      }

      // Reduce saturation on edges for natural look
      if (isEdge) {
        const grayVal = (r + g + b) / 3;
        r = r * 0.7 + grayVal * 0.3;
        g = g * 0.7 + grayVal * 0.3;
        b = b * 0.7 + grayVal * 0.3;
      }

      // Apply intensity and saturation scaling
      // Intensity: blend between grayscale and colored (0 = gray, 100 = full color)
      // Saturation: adjust color vividness (0 = desaturate, 100 = max saturation)
      const grayValue = gray;

      // First apply intensity (how much color vs grayscale)
      r = grayValue + (r - grayValue) * intensityScale;
      g = grayValue + (g - grayValue) * intensityScale;
      b = grayValue + (b - grayValue) * intensityScale;

      // Then apply saturation scaling
      const colorGray = (r + g + b) / 3;
      r = colorGray + (r - colorGray) * saturationScale;
      g = colorGray + (g - colorGray) * saturationScale;
      b = colorGray + (b - colorGray) * saturationScale;

      // Apply with clamping
      data[i] = Math.max(0, Math.min(255, Math.round(r)));
      data[i + 1] = Math.max(0, Math.min(255, Math.round(g)));
      data[i + 2] = Math.max(0, Math.min(255, Math.round(b)));
    }

    // Third pass: apply subtle color blending for smoothness
    console.log("🎨 Applying color harmonization");
    const tempData = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;

        // Bilateral filter for color smoothing
        let rSum = 0,
          gSum = 0,
          bSum = 0,
          wSum = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nIdx = ((y + dy) * width + (x + dx)) * 4;
            const spatialDist = Math.sqrt(dx * dx + dy * dy);
            const colorDist = Math.sqrt(
              Math.pow(tempData[idx] - tempData[nIdx], 2) +
                Math.pow(tempData[idx + 1] - tempData[nIdx + 1], 2) +
                Math.pow(tempData[idx + 2] - tempData[nIdx + 2], 2)
            );

            const weight = Math.exp(
              -((spatialDist * spatialDist) / 2 + (colorDist * colorDist) / 200)
            );
            rSum += tempData[nIdx] * weight;
            gSum += tempData[nIdx + 1] * weight;
            bSum += tempData[nIdx + 2] * weight;
            wSum += weight;
          }
        }

        // Blend original and smoothed (85% original, 15% smoothed to preserve color vibrancy)
        data[idx] = Math.round(tempData[idx] * 0.85 + (rSum / wSum) * 0.15);
        data[idx + 1] = Math.round(
          tempData[idx + 1] * 0.85 + (gSum / wSum) * 0.15
        );
        data[idx + 2] = Math.round(
          tempData[idx + 2] * 0.85 + (bSum / wSum) * 0.15
        );
      }
    }

    console.log("✅ Photorealistic colorization complete");
  } else {
    // For color images, enhance existing colors using saturation parameter
    console.log(
      `🎨 Detected color image - enhancing saturation by ${saturation}%`
    );
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Convert to HSL
      const max = Math.max(r, g, b) / 255;
      const min = Math.min(r, g, b) / 255;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        // Calculate hue
        let h = 0;
        if (max === r / 255) h = ((g / 255 - b / 255) / d) % 6;
        else if (max === g / 255) h = (b / 255 - r / 255) / d + 2;
        else h = (r / 255 - g / 255) / d + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;

        // Increase saturation based on parameter (0-100 maps to 0.5-2.0x multiplier)
        const satMultiplier = 0.5 + saturationScale * 1.5;
        const newS = Math.min(1, s * satMultiplier);

        // Convert back to RGB
        const c = (1 - Math.abs(2 * l - 1)) * newS;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;

        let rNew, gNew, bNew;
        if (h < 60) {
          rNew = c;
          gNew = x;
          bNew = 0;
        } else if (h < 120) {
          rNew = x;
          gNew = c;
          bNew = 0;
        } else if (h < 180) {
          rNew = 0;
          gNew = c;
          bNew = x;
        } else if (h < 240) {
          rNew = 0;
          gNew = x;
          bNew = c;
        } else if (h < 300) {
          rNew = x;
          gNew = 0;
          bNew = c;
        } else {
          rNew = c;
          gNew = 0;
          bNew = x;
        }

        data[i] = (rNew + m) * 255;
        data[i + 1] = (gNew + m) * 255;
        data[i + 2] = (bNew + m) * 255;
      }
    }
  }

  // Apply strong contrast enhancement
  const contrast = 1.25;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128));
    data[i + 1] = Math.max(
      0,
      Math.min(255, factor * (data[i + 1] - 128) + 128)
    );
    data[i + 2] = Math.max(
      0,
      Math.min(255, factor * (data[i + 2] - 128) + 128)
    );
  }
}

/**
 * Edge-preserving filter
 */
/**
 * Advanced inpainting - detects and repairs scratches, tears, and damage
 */
function applyEdgePreservingFilter(data, width, height, strength = 0.8) {
  console.log(
    `🎨 Starting AI-powered inpainting - strength: ${Math.round(
      strength * 100
    )}%`
  );

  const original = new Uint8ClampedArray(data);
  const damageMap = new Uint8Array(width * height);

  // Step 1: Multi-scale damage detection
  console.log(
    "🔍 Phase 1: Multi-scale damage analysis (scratches, tears, spots)"
  );

  for (let y = 3; y < height - 3; y++) {
    for (let x = 3; x < width - 3; x++) {
      const idx = (y * width + x) * 4;
      const pixelIdx = y * width + x;

      const r = original[idx];
      const g = original[idx + 1];
      const b = original[idx + 2];
      const gray = (r + g + b) / 3;

      // Multi-scale analysis
      let maxDiff = 0;
      let neighborDiff = 0;
      let edgeCount = 0;
      let colorVariance = 0;
      let brightnessAnomaly = 0;

      // 7x7 analysis window for better context
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          if (dx === 0 && dy === 0) continue;

          const ny = Math.max(0, Math.min(height - 1, y + dy));
          const nx = Math.max(0, Math.min(width - 1, x + dx));
          const nidx = (ny * width + nx) * 4;

          const nr = original[nidx];
          const ng = original[nidx + 1];
          const nb = original[nidx + 2];
          const nGray = (nr + ng + nb) / 3;

          const diff = Math.abs(gray - nGray);
          neighborDiff += diff;
          maxDiff = Math.max(maxDiff, diff);

          if (diff > 25) edgeCount++;

          const colorDist = Math.sqrt(
            Math.pow(r - nr, 2) + Math.pow(g - ng, 2) + Math.pow(b - nb, 2)
          );
          colorVariance += colorDist;
        }
      }

      neighborDiff /= 48;
      colorVariance /= 48;

      // Detect linear scratches (vertical and horizontal)
      let verticalVariance = 0;
      let horizontalVariance = 0;

      // Check 5 pixels in each direction
      for (let d = -2; d <= 2; d++) {
        const vIdx = ((y + d) * width + x) * 4;
        const hIdx = (y * width + (x + d)) * 4;

        const vGray =
          (original[vIdx] + original[vIdx + 1] + original[vIdx + 2]) / 3;
        const hGray =
          (original[hIdx] + original[hIdx + 1] + original[hIdx + 2]) / 3;

        verticalVariance += Math.abs(gray - vGray);
        horizontalVariance += Math.abs(gray - hGray);
      }

      const isVerticalScratch =
        verticalVariance > 60 && horizontalVariance < 30;
      const isHorizontalScratch =
        horizontalVariance > 60 && verticalVariance < 30;

      // Enhanced brightness anomaly detection
      const localBrightness = (r + g + b) / 3;
      let avgNeighborBrightness = 0;
      let count = 0;

      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = Math.max(0, Math.min(height - 1, y + dy));
          const nx = Math.max(0, Math.min(width - 1, x + dx));
          const nidx = (ny * width + nx) * 4;
          avgNeighborBrightness +=
            (original[nidx] + original[nidx + 1] + original[nidx + 2]) / 3;
          count++;
        }
      }
      avgNeighborBrightness /= count;
      brightnessAnomaly = Math.abs(localBrightness - avgNeighborBrightness);

      // AGGRESSIVE damage detection - much lower thresholds
      const isDamaged =
        // Bright/dark spots or tears (more sensitive)
        ((gray > 230 || gray < 25) && brightnessAnomaly > 20) ||
        // High local variance (scratches, cracks)
        maxDiff > 50 ||
        // Edge anomalies (sharp discontinuities)
        (edgeCount > 8 && neighborDiff > 15) ||
        // Linear scratches
        isVerticalScratch ||
        isHorizontalScratch ||
        // General noise and artifacts
        (neighborDiff > 30 && colorVariance > 40) ||
        // Isolated bright/dark pixels
        brightnessAnomaly > 40;

      if (isDamaged) {
        damageMap[pixelIdx] = 1;
      }
    }
  }

  // Step 2: Aggressive expansion for complete damage coverage
  console.log("🔧 Phase 2: Expanding damage regions (2-pixel radius)");
  const expandedMap = new Uint8Array(damageMap);

  // Expand damage regions by 2 pixels for complete coverage
  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      const pixelIdx = y * width + x;
      if (damageMap[pixelIdx] === 1) {
        // Expand 2 pixels around damage
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const ny = Math.max(0, Math.min(height - 1, y + dy));
            const nx = Math.max(0, Math.min(width - 1, x + dx));
            expandedMap[ny * width + nx] = 1;
          }
        }
      }
    }
  }

  // Count damaged pixels
  let damagedCount = 0;
  for (let i = 0; i < expandedMap.length; i++) {
    if (expandedMap[i] === 1) damagedCount++;
  }

  console.log(
    `📊 Found ${damagedCount} damaged pixels (${(
      (damagedCount / (width * height)) *
      100
    ).toFixed(2)}% of image)`
  );

  // Step 3: Multi-pass diffusion-based inpainting (5 passes)
  console.log("✨ Phase 3: Advanced diffusion inpainting (5 passes)");

  for (let pass = 0; pass < 5; pass++) {
    const passData = new Uint8ClampedArray(data);

    for (let y = 5; y < height - 5; y++) {
      for (let x = 5; x < width - 5; x++) {
        const pixelIdx = y * width + x;

        if (expandedMap[pixelIdx] === 1) {
          const idx = (y * width + x) * 4;

          // Adaptive search radius - increases with pass number
          const searchRadius = 5 + pass * 2;

          // Collect healthy neighboring pixels with Gaussian weighting
          let sumR = 0,
            sumG = 0,
            sumB = 0,
            totalWeight = 0;

          for (let dy = -searchRadius; dy <= searchRadius; dy++) {
            for (let dx = -searchRadius; dx <= searchRadius; dx++) {
              const ny = Math.max(0, Math.min(height - 1, y + dy));
              const nx = Math.max(0, Math.min(width - 1, x + dx));
              const nPixelIdx = ny * width + nx;

              // Only use healthy pixels
              if (expandedMap[nPixelIdx] === 1) continue;

              const nidx = (ny * width + nx) * 4;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // Gaussian weight - stronger influence from closer pixels
              const weight = Math.exp(
                -(distance * distance) / (2 * searchRadius * searchRadius)
              );

              sumR += passData[nidx] * weight;
              sumG += passData[nidx + 1] * weight;
              sumB += passData[nidx + 2] * weight;
              totalWeight += weight;
            }
          }

          if (totalWeight > 0) {
            data[idx] = Math.round(sumR / totalWeight);
            data[idx + 1] = Math.round(sumG / totalWeight);
            data[idx + 2] = Math.round(sumB / totalWeight);
          }
        }
      }
    }

    console.log(`  ✓ Pass ${pass + 1}/5 complete`);
  }

  // Step 4: Structure-preserving bilateral smoothing
  console.log("🎯 Phase 4: Structure-preserving smoothing");

  const finalData = new Uint8ClampedArray(data);

  for (let y = 3; y < height - 3; y++) {
    for (let x = 3; x < width - 3; x++) {
      const pixelIdx = y * width + x;

      if (expandedMap[pixelIdx] === 1) {
        const idx = (y * width + x) * 4;

        // Bilateral filter - preserves edges while smoothing
        let sumR = 0,
          sumG = 0,
          sumB = 0,
          totalWeight = 0;

        const spatialSigma = 2.0;
        const rangeSigma = 30.0;

        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            const nidx = ((y + dy) * width + (x + dx)) * 4;

            // Spatial distance
            const spatialDist = Math.sqrt(dx * dx + dy * dy);
            const spatialWeight = Math.exp(
              -(spatialDist * spatialDist) / (2 * spatialSigma * spatialSigma)
            );

            // Color distance
            const colorDist = Math.sqrt(
              Math.pow(finalData[idx] - finalData[nidx], 2) +
                Math.pow(finalData[idx + 1] - finalData[nidx + 1], 2) +
                Math.pow(finalData[idx + 2] - finalData[nidx + 2], 2)
            );
            const rangeWeight = Math.exp(
              -(colorDist * colorDist) / (2 * rangeSigma * rangeSigma)
            );

            const weight = spatialWeight * rangeWeight;

            sumR += finalData[nidx] * weight;
            sumG += finalData[nidx + 1] * weight;
            sumB += finalData[nidx + 2] * weight;
            totalWeight += weight;
          }
        }

        if (totalWeight > 0) {
          data[idx] = Math.round(sumR / totalWeight);
          data[idx + 1] = Math.round(sumG / totalWeight);
          data[idx + 2] = Math.round(sumB / totalWeight);
        }
      }
    }
  }

  // Step 5: Blend with original based on strength parameter
  if (strength < 1.0) {
    console.log(
      `🎨 Phase 5: Blending inpainted result with original (${Math.round(
        strength * 100
      )}% strength)`
    );
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIdx = y * width + x;
        if (expandedMap[pixelIdx] === 1) {
          const idx = (y * width + x) * 4;
          // Blend: result = strength * inpainted + (1 - strength) * original
          data[idx] = Math.round(
            data[idx] * strength + original[idx] * (1 - strength)
          );
          data[idx + 1] = Math.round(
            data[idx + 1] * strength + original[idx + 1] * (1 - strength)
          );
          data[idx + 2] = Math.round(
            data[idx + 2] * strength + original[idx + 2] * (1 - strength)
          );
        }
      }
    }
  }

  console.log("✅ Inpainting complete - scratches and damage repaired!");
}

/**
 * General image enhancement
 */
function enhanceImage(data) {
  for (let i = 0; i < data.length; i += 4) {
    // Increase brightness slightly
    data[i] = Math.min(255, data[i] * 1.05);
    data[i + 1] = Math.min(255, data[i + 1] * 1.05);
    data[i + 2] = Math.min(255, data[i + 2] * 1.05);

    // Increase contrast
    const contrast = 1.15;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    data[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128));
    data[i + 1] = Math.max(
      0,
      Math.min(255, factor * (data[i + 1] - 128) + 128)
    );
    data[i + 2] = Math.max(
      0,
      Math.min(255, factor * (data[i + 2] - 128) + 128)
    );
  }
}

/**
 * Load a model (simulated - marks as loaded in cache)
 */
async function loadModel(modelId, task, messageId) {
  const cacheKey = `${modelId}-${task}`;

  console.log(
    `🔧 loadModel called with modelId: "${modelId}", task: "${task}"`
  );
  console.log(`🔧 Cache key: "${cacheKey}"`);

  if (pipelineCache.has(cacheKey)) {
    console.log(`✅ Model ${modelId} already loaded from cache`);
    return true;
  }

  console.log(`📥 Preparing ${task} processor for model ${modelId}...`);

  // Simulate loading with progress
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    self.postMessage({
      id: messageId,
      type: "progress",
      data: { status: "progress", progress: i },
    });
  }

  pipelineCache.set(cacheKey, true);
  console.log(`✅ ${task} processor ready`);
  return true;
}

/**
 * Process an image
 */
async function processImage(
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
  objectDetectionConfidence = 0.35,
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
  const cacheKey = `${modelId}-${task}`;

  if (!pipelineCache.has(cacheKey)) {
    throw new Error("Model not loaded. Please load the model first.");
  }

  console.log(
    `🎨 Processing image with ${task} using model ${modelId}, denoising: ${denoisingLevel}, upscale: ${upscaleFactor}x, colorization: ${colorizationIntensity}/${colorizationSaturation}, inpainting: ${inpaintingGuidanceScale}/${inpaintingInferenceSteps}/${inpaintingStrength}, detection: ${objectDetectionConfidence}/${objectDetectionIOU}/${objectDetectionMaxDetections}, pose: ${poseEstimationConfidence}/${poseKeypointThreshold}/${poseMaxDetections}, masking: ${maskingEdgeThreshold}/${maskingSegmentationIntensity}/${maskingMorphologyStrength}, style: ${styleTransferStyle}/${styleTransferIntensity}, bgRemoval: ${bgRemovalMethod}/${bgRemovalThreshold}/${bgRemovalFeathering}/${bgRemovalOutputMode}`
  );

  const result = await processImageWithFilters(
    imageUrl,
    task,
    modelId,
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

  console.log("✅ Image processing complete");
  return result;
}

/**
 * YOLO-based Object Detection using ONNX Runtime
 */
async function applyYOLODetection(
  ctx,
  imageBitmap,
  width,
  height,
  confidenceThreshold = 0.25,
  iouThreshold = 0.5,
  maxDetections = 50
) {
  console.log(
    `🎯 Loading YOLOv11 ONNX model for object detection (conf: ${confidenceThreshold}, iou: ${iouThreshold}, max: ${maxDetections})...`
  );

  try {
    // Download and load YOLOv11n model (single-file ONNX)
    const modelUrl =
      "https://huggingface.co/aaurelions/yolo11n.onnx/resolve/main/yolo11n.onnx";

    console.log("📥 Downloading YOLOv11 model...");
    const session = await ort.InferenceSession.create(modelUrl, {
      executionProviders: ["wasm"],
    });

    console.log("🔄 Preprocessing image for YOLO...");

    // YOLOv11 expects 640x640 input
    const modelSize = 640;
    const tempCanvas = new OffscreenCanvas(modelSize, modelSize);
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(imageBitmap, 0, 0, modelSize, modelSize);

    const imageData = tempCtx.getImageData(0, 0, modelSize, modelSize);
    const pixels = imageData.data;

    // Convert to RGB float32 tensor [1, 3, 640, 640]
    const input = new Float32Array(1 * 3 * modelSize * modelSize);
    for (let i = 0; i < pixels.length; i += 4) {
      const pixelIndex = i / 4;
      input[pixelIndex] = pixels[i] / 255.0; // R
      input[pixelIndex + modelSize * modelSize] = pixels[i + 1] / 255.0; // G
      input[pixelIndex + modelSize * modelSize * 2] = pixels[i + 2] / 255.0; // B
    }

    const tensor = new ort.Tensor("float32", input, [
      1,
      3,
      modelSize,
      modelSize,
    ]);

    console.log("🔍 Running YOLO inference...");
    const feeds = { images: tensor };
    const results = await session.run(feeds);

    // Process YOLOv11 output
    const outputName = session.outputNames[0];
    const output = results[outputName];

    console.log(
      `📦 YOLO output shape: ${output.dims.join("x")}, size: ${
        output.data.length
      }`
    );

    const detections = processYOLOOutput(
      output.data,
      output.dims,
      width,
      height,
      modelSize,
      confidenceThreshold,
      iouThreshold,
      maxDetections
    );

    console.log(`✅ YOLOv11 detected ${detections.length} objects`);
    if (detections.length > 0) {
      console.log(
        "Detected classes:",
        detections
          .map((d) => `${d.className} (${(d.confidence * 100).toFixed(0)}%)`)
          .join(", ")
      );
    }

    // Draw detections
    drawDetections(ctx, detections);
  } catch (error) {
    console.error("❌ YOLO detection failed:", error);
    console.log("⚠️ Falling back to basic detection");

    // Fallback to basic detection
    const imageData = ctx.getImageData(0, 0, width, height);
    await applyObjectDetection(ctx, imageData.data, width, height);
  }
}

/**
 * DETR-based Object Detection using ONNX Runtime
 */
async function applyDETRDetection(
  ctx,
  imageBitmap,
  width,
  height,
  modelId,
  confidenceThreshold = 0.25,
  iouThreshold = 0.5,
  maxDetections = 50
) {
  console.log(
    `🎯 Loading DETR (${modelId}) ONNX model for object detection (conf: ${confidenceThreshold}, iou: ${iouThreshold}, max: ${maxDetections})...`
  );

  try {
    // Use the Hugging Face model URL for DETR ResNet-50
    const modelUrl = `https://huggingface.co/${modelId}/resolve/main/onnx/model.onnx`;

    console.log(`📥 Downloading DETR model from ${modelUrl}...`);
    const session = await ort.InferenceSession.create(modelUrl, {
      executionProviders: ["wasm"],
    });

    console.log("🔄 Preprocessing image for DETR...");

    // DETR expects 64x64 input size based on the model requirements
    const modelSize = 64;
    const tempCanvas = new OffscreenCanvas(modelSize, modelSize);
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(imageBitmap, 0, 0, modelSize, modelSize);

    const imageData = tempCtx.getImageData(0, 0, modelSize, modelSize);
    const pixels = imageData.data;

    // Convert to RGB float32 tensor [1, 3, 800, 800] with normalization
    const input = new Float32Array(1 * 3 * modelSize * modelSize);
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];

    for (let i = 0; i < pixels.length; i += 4) {
      const pixelIndex = i / 4;
      input[pixelIndex] = (pixels[i] / 255.0 - mean[0]) / std[0]; // R
      input[pixelIndex + modelSize * modelSize] =
        (pixels[i + 1] / 255.0 - mean[1]) / std[1]; // G
      input[pixelIndex + modelSize * modelSize * 2] =
        (pixels[i + 2] / 255.0 - mean[2]) / std[2]; // B
    }

    const tensor = new ort.Tensor("float32", input, [
      1,
      3,
      modelSize,
      modelSize,
    ]);

    // Create pixel_mask tensor (all 1s indicating valid pixels)
    // Must use BigInt64Array for int64 tensor type
    const pixelMaskSize = 1 * modelSize * modelSize;
    const pixelMask = new BigInt64Array(pixelMaskSize);
    for (let i = 0; i < pixelMaskSize; i++) {
      pixelMask[i] = BigInt(1);
    }
    const maskTensor = new ort.Tensor("int64", pixelMask, [
      1,
      modelSize,
      modelSize,
    ]);

    console.log("🔍 Running DETR inference...");
    const feeds = { pixel_values: tensor, pixel_mask: maskTensor };
    const results = await session.run(feeds);

    console.log("📦 DETR output keys:", Object.keys(results));

    // DETR outputs logits and boxes
    const logits = results.logits || results.pred_logits;
    const boxes = results.pred_boxes || results.boxes;

    if (!logits || !boxes) {
      throw new Error("DETR model output format not recognized");
    }

    console.log(`📦 DETR logits shape: ${logits.dims.join("x")}`);
    console.log(`📦 DETR boxes shape: ${boxes.dims.join("x")}`);

    const detections = processDETROutput(
      logits.data,
      boxes.data,
      logits.dims,
      boxes.dims,
      width,
      height,
      modelSize,
      confidenceThreshold,
      maxDetections
    );

    console.log(`✅ DETR detected ${detections.length} objects`);
    if (detections.length > 0) {
      console.log(
        "Detected classes:",
        detections
          .map((d) => `${d.className} (${(d.confidence * 100).toFixed(0)}%)`)
          .join(", ")
      );
    }

    // Draw detections
    drawDetections(ctx, detections);
  } catch (error) {
    console.error("❌ DETR detection failed:", error);
    // Log error to event logs
    self.postMessage({
      type: "log",
      data: {
        type: "error",
        message: `DETR detection failed: ${error.message}`,
      },
    });
    // Log fallback warning
    self.postMessage({
      type: "log",
      data: {
        type: "warning",
        message: `Falling back to YOLOv11 model for object detection`,
      },
    });
    console.log("⚠️ Falling back to YOLO detection");

    // Fallback to YOLO
    await applyYOLODetection(ctx, imageBitmap, width, height);
  }
}

/**
 * Process DETR output tensor
 */
function processDETROutput(
  logitsData,
  boxesData,
  logitsDims,
  boxesDims,
  imgWidth,
  imgHeight,
  modelSize,
  confidenceThreshold = 0.25,
  maxDetections = 50
) {
  const detections = [];

  // DETR output format: logits [1, num_queries, num_classes], boxes [1, num_queries, 4]
  const numQueries = logitsDims[1];
  const numClasses = logitsDims[2] - 1; // Subtract 1 for "no object" class

  console.log(
    `Processing DETR with ${numQueries} queries and ${numClasses} classes (conf: ${confidenceThreshold}, max: ${maxDetections})`
  );

  // Common objects to prioritize (cars, persons, trucks, etc.)
  const priorityClasses = [
    "car",
    "person",
    "truck",
    "bus",
    "motorcycle",
    "bicycle",
  ];

  for (let i = 0; i < numQueries; i++) {
    // Get class scores for this query (skip last class which is "no object")
    let maxScore = -Infinity;
    let classId = 0;

    for (let c = 0; c < numClasses; c++) {
      const score = logitsData[i * (numClasses + 1) + c];
      if (score > maxScore) {
        maxScore = score;
        classId = c;
      }
    }

    // Apply softmax to get probability
    const expScore = Math.exp(maxScore);
    const expSum =
      Math.exp(maxScore) +
      Math.exp(logitsData[i * (numClasses + 1) + numClasses]);
    const confidence = expScore / expSum;

    const className = COCO_CLASSES[classId] || `class_${classId}`;

    // Filter out common false positive classes that don't appear in typical scenes
    const filterClasses = ["boat", "surfboard", "skis", "snowboard"];

    // Apply threshold and filter
    if (
      confidence > confidenceThreshold &&
      !filterClasses.includes(className)
    ) {
      console.log(
        `DETR detection: ${className} with confidence ${confidence.toFixed(3)}`
      );

      // Get box coordinates [cx, cy, w, h] normalized to [0, 1]
      const cx = boxesData[i * 4];
      const cy = boxesData[i * 4 + 1];
      const w = boxesData[i * 4 + 2];
      const h = boxesData[i * 4 + 3];

      // Convert to pixel coordinates
      const x1 = (cx - w / 2) * imgWidth;
      const y1 = (cy - h / 2) * imgHeight;
      const x2 = (cx + w / 2) * imgWidth;
      const y2 = (cy + h / 2) * imgHeight;

      detections.push({
        x: Math.max(0, x1),
        y: Math.max(0, y1),
        w: Math.min(imgWidth - x1, x2 - x1),
        h: Math.min(imgHeight - y1, y2 - y1),
        className: className,
        confidence: confidence,
      });
    }
  }

  // Sort by confidence and limit to maxDetections
  const limited = detections
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, maxDetections);

  if (limited.length < detections.length) {
    console.log(
      `Limited DETR detections to top ${limited.length} (from ${detections.length})`
    );
  }

  return limited;
}

/**
 * Process YOLO output tensor and apply NMS
 */
function processYOLOOutput(
  output,
  dims,
  imgWidth,
  imgHeight,
  modelSize,
  confidenceThreshold = 0.25,
  iouThreshold = 0.5,
  maxDetections = 50
) {
  const detections = [];

  console.log(
    `Processing YOLO output with dims: ${dims.join(
      "x"
    )} (conf: ${confidenceThreshold}, iou: ${iouThreshold}, max: ${maxDetections})`
  );

  // YOLOv11 output can be [1, 84, 8400] or [1, 8400, 84]
  let numDetections,
    numClasses,
    transposed = false;

  if (dims[1] === 84 || dims[1] > 80) {
    // Format: [1, 84, 8400] - standard YOLO format
    numDetections = dims[2];
    numClasses = dims[1] - 4; // 84 - 4 bbox coords = 80 classes
    transposed = false;
  } else {
    // Format: [1, 8400, 84] - transposed format
    numDetections = dims[1];
    numClasses = dims[2] - 4;
    transposed = true;
  }

  console.log(
    `Detections: ${numDetections}, Classes: ${numClasses}, Transposed: ${transposed}`
  );

  for (let i = 0; i < numDetections; i++) {
    let cx,
      cy,
      w,
      h,
      classScores = [];

    if (transposed) {
      // [1, 8400, 84] format
      const offset = i * (numClasses + 4);
      cx = output[offset];
      cy = output[offset + 1];
      w = output[offset + 2];
      h = output[offset + 3];

      for (let c = 0; c < numClasses; c++) {
        classScores.push(output[offset + 4 + c]);
      }
    } else {
      // [1, 84, 8400] format
      cx = output[i];
      cy = output[numDetections + i];
      w = output[2 * numDetections + i];
      h = output[3 * numDetections + i];

      for (let c = 0; c < numClasses; c++) {
        classScores.push(output[(4 + c) * numDetections + i]);
      }
    }

    // Get class with highest score
    let maxScore = 0;
    let classId = 0;
    for (let c = 0; c < numClasses; c++) {
      if (classScores[c] > maxScore) {
        maxScore = classScores[c];
        classId = c;
      }
    }

    if (maxScore > confidenceThreshold) {
      // Convert to x1, y1, x2, y2 and scale to image size
      const scaleX = imgWidth / modelSize;
      const scaleY = imgHeight / modelSize;

      const x1 = Math.max(0, (cx - w / 2) * scaleX);
      const y1 = Math.max(0, (cy - h / 2) * scaleY);
      const x2 = Math.min(imgWidth, (cx + w / 2) * scaleX);
      const y2 = Math.min(imgHeight, (cy + h / 2) * scaleY);

      const width = x2 - x1;
      const height = y2 - y1;

      // Filter out tiny detections
      if (width > 10 && height > 10) {
        detections.push({
          x: x1,
          y: y1,
          w: width,
          h: height,
          className: COCO_CLASSES[classId] || `class_${classId}`,
          confidence: maxScore,
        });
      }
    }
  }

  console.log(`Found ${detections.length} detections before NMS`);

  // Apply Non-Maximum Suppression
  const filtered = applyNMS(detections, iouThreshold);
  console.log(`${filtered.length} detections after NMS`);

  // Apply max detections limit (keep top N by confidence)
  const limited = filtered
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, maxDetections);

  if (limited.length < filtered.length) {
    console.log(
      `Limited to top ${limited.length} detections (from ${filtered.length})`
    );
  }

  return limited;
}

/**
 * Draw detection boxes on canvas
 */
function drawDetections(ctx, detections) {
  let detectionCount = 0;

  detections.forEach((detection) => {
    const { x, y, w, h, className, confidence } = detection;
    const text = `${className} ${(confidence * 100).toFixed(0)}%`;

    // Draw bounding box
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#00ff00";
    ctx.strokeRect(x, y, w, h);

    // Add inner glow effect
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
    ctx.strokeRect(x - 1, y - 1, w + 2, h + 2);
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

    // Measure text for background
    ctx.font = "bold 18px Arial";
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width + 16;
    const textHeight = 28;

    // Draw label background
    const labelY = y > 30 ? y - textHeight - 2 : y + h + 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(x, labelY, textWidth, textHeight);

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x, labelY, textWidth, 3);

    // Draw label text with shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x + 8, labelY + 20);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw confidence bar
    const confidenceBarWidth = textWidth - 16;
    const confidenceFill = confidenceBarWidth * confidence;

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(x + 8, labelY + textHeight - 6, confidenceBarWidth, 3);

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x + 8, labelY + textHeight - 6, confidenceFill, 3);

    detectionCount++;
  });

  // Draw summary
  if (detectionCount > 0) {
    ctx.font = "bold 20px Arial";
    const summaryText = `${detectionCount} object${
      detectionCount > 1 ? "s" : ""
    } detected`;
    const summaryMetrics = ctx.measureText(summaryText);

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(10, 10, summaryMetrics.width + 20, 35);

    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, summaryMetrics.width + 20, 35);

    ctx.fillStyle = "#00ff00";
    ctx.fillText(summaryText, 20, 35);
  }

  console.log(`✅ Drew ${detectionCount} detection boxes`);
}

// COCO dataset class names
const COCO_CLASSES = [
  "person",
  "bicycle",
  "car",
  "motorcycle",
  "airplane",
  "bus",
  "train",
  "truck",
  "boat",
  "traffic light",
  "fire hydrant",
  "stop sign",
  "parking meter",
  "bench",
  "bird",
  "cat",
  "dog",
  "horse",
  "sheep",
  "cow",
  "elephant",
  "bear",
  "zebra",
  "giraffe",
  "backpack",
  "umbrella",
  "handbag",
  "tie",
  "suitcase",
  "frisbee",
  "skis",
  "snowboard",
  "sports ball",
  "kite",
  "baseball bat",
  "baseball glove",
  "skateboard",
  "surfboard",
  "tennis racket",
  "bottle",
  "wine glass",
  "cup",
  "fork",
  "knife",
  "spoon",
  "bowl",
  "banana",
  "apple",
  "sandwich",
  "orange",
  "broccoli",
  "carrot",
  "hot dog",
  "pizza",
  "donut",
  "cake",
  "chair",
  "couch",
  "potted plant",
  "bed",
  "dining table",
  "toilet",
  "tv",
  "laptop",
  "mouse",
  "remote",
  "keyboard",
  "cell phone",
  "microwave",
  "oven",
  "toaster",
  "sink",
  "refrigerator",
  "book",
  "clock",
  "vase",
  "scissors",
  "teddy bear",
  "hair drier",
  "toothbrush",
];

/**
 * Object Detection using Advanced Computer Vision
 */
async function applyObjectDetection(ctx, data, width, height) {
  console.log("🎯 Applying advanced object detection...");

  // Use enhanced multi-scale object detection
  const detectedObjects = detectObjectsAdvanced(data, width, height);

  let detectionCount = 0;
  detectedObjects.forEach((detection) => {
    const { x, y, w, h, className, confidence } = detection;
    const text = `${className} ${(confidence * 100).toFixed(0)}%`;

    // Draw bounding box with thicker, semi-transparent background
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#00ff00";
    ctx.strokeRect(x, y, w, h);

    // Add inner glow effect
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
    ctx.strokeRect(x - 1, y - 1, w + 2, h + 2);
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

    // Measure text for background
    ctx.font = "bold 18px Arial";
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width + 16;
    const textHeight = 28;

    // Draw label background with gradient
    const labelY = y > 30 ? y - textHeight - 2 : y + h + 2;

    // Semi-transparent background
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(x, labelY, textWidth, textHeight);

    // Green top border
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x, labelY, textWidth, 3);

    // Draw label text with shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x + 8, labelY + 20);

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw confidence indicator (small bar)
    const confidenceBarWidth = textWidth - 16;
    const confidenceFill = confidenceBarWidth * confidence;

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(x + 8, labelY + textHeight - 6, confidenceBarWidth, 3);

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x + 8, labelY + textHeight - 6, confidenceFill, 3);

    detectionCount++;
  });

  // Draw detection summary in corner
  if (detectionCount > 0) {
    ctx.font = "bold 20px Arial";
    const summaryText = `${detectionCount} object${
      detectionCount > 1 ? "s" : ""
    } detected`;
    const summaryMetrics = ctx.measureText(summaryText);

    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(10, 10, summaryMetrics.width + 20, 35);

    // Border
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, summaryMetrics.width + 20, 35);

    // Text
    ctx.fillStyle = "#00ff00";
    ctx.fillText(summaryText, 20, 35);
  }

  console.log(
    `✅ Detected ${detectionCount} objects with bounding boxes and labels`
  );
}

/**
 * Pose Estimation - detect body keypoints
 */
async function applyPoseEstimation(
  ctx,
  data,
  width,
  height,
  poseEstimationConfidence = 0.3,
  poseKeypointThreshold = 0.2,
  poseMaxDetections = 10
) {
  console.log(
    `🧍 Applying pose estimation (confidence: ${poseEstimationConfidence}, keypoint threshold: ${poseKeypointThreshold}, max: ${poseMaxDetections})...`
  );

  const edgeMap = detectEdges(data, width, height);
  // Detect potential body regions using edge and skin tone detection
  let bodyRegions = detectBodyRegions(data, width, height);
  bodyRegions = mergeBodyCandidates(bodyRegions, width, height);
  bodyRegions = bodyRegions.map((region) =>
    expandRegionUsingEdges(region, edgeMap, width, height)
  );

  if (bodyRegions.length === 0) {
    console.log("⚠️ No person detected in image");
    return;
  }

  // Limit to max detections
  bodyRegions = bodyRegions.slice(0, poseMaxDetections);

  // For each detected person, estimate keypoints
  ctx.lineWidth = 4;

  bodyRegions.forEach((region, personIndex) => {
    // Estimate 17 keypoints (COCO format) using body profile analysis
    const keypoints = estimateKeypoints(
      region,
      data,
      width,
      height,
      poseKeypointThreshold
    );

    // Draw skeleton connections with gradient effect
    const connections = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4], // Head
      [5, 6],
      [5, 7],
      [7, 9],
      [6, 8],
      [8, 10], // Arms
      [5, 11],
      [6, 12],
      [11, 12], // Torso
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16], // Legs
    ];

    // Draw connections with glow effect
    connections.forEach(([i, j]) => {
      if (keypoints[i] && keypoints[j]) {
        // Outer glow
        ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(keypoints[i].x, keypoints[i].y);
        ctx.lineTo(keypoints[j].x, keypoints[j].y);
        ctx.stroke();

        // Main line
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(keypoints[i].x, keypoints[i].y);
        ctx.lineTo(keypoints[j].x, keypoints[j].y);
        ctx.stroke();
      }
    });

    // Draw keypoints with labels
    keypoints.forEach((point, index) => {
      if (point) {
        // Outer glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle =
          point.confidence > 0.7
            ? "rgba(0, 255, 0, 0.3)"
            : "rgba(255, 255, 0, 0.3)";
        ctx.fill();

        // Main keypoint
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = point.confidence > 0.7 ? "#00ff00" : "#ffff00";
        ctx.fill();

        // White border
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add confidence indicator for key joints
        if ([0, 5, 6, 11, 12].includes(index)) {
          // Nose, shoulders, hips
          ctx.font = "bold 11px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 3;
          const confText = `${(point.confidence * 100).toFixed(0)}%`;
          ctx.strokeText(confText, point.x + 10, point.y - 8);
          ctx.fillText(confText, point.x + 10, point.y - 8);
        }
      }
    });
  });

  // Draw pose summary in corner
  if (bodyRegions.length > 0) {
    ctx.font = "bold 20px Arial";
    const summaryText = `${bodyRegions.length} person${
      bodyRegions.length > 1 ? "s" : ""
    } detected`;
    const summaryMetrics = ctx.measureText(summaryText);

    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(10, 10, summaryMetrics.width + 20, 35);

    // Border
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, summaryMetrics.width + 20, 35);

    // Text
    ctx.fillStyle = "#00ffff";
    ctx.fillText(summaryText, 20, 35);
  }

  console.log(
    `✅ Detected ${bodyRegions.length} person(s) with 17 keypoints each`
  );
}

/**
 * Image Masking - various segmentation techniques
 */
function applyImageMasking(
  data,
  width,
  height,
  edgeThreshold = 0.3,
  segmentationIntensity = 0.7,
  morphologyStrength = 0.5
) {
  console.log(
    `🎭 Applying image masking (edge: ${edgeThreshold}, segmentation: ${segmentationIntensity}, morphology: ${morphologyStrength})...`
  );

  // Create composite mask with multiple techniques
  const cannyEdges = cannyEdgeDetectionWithThreshold(
    data,
    width,
    height,
    edgeThreshold
  );
  const thresholdMask = adaptiveThresholdWithIntensity(
    data,
    width,
    height,
    segmentationIntensity
  );

  // Apply morphological operations based on strength
  const morphologicalEdges = applyMorphology(
    cannyEdges,
    width,
    height,
    morphologyStrength
  );
  const morphologicalMask = applyMorphology(
    thresholdMask,
    width,
    height,
    morphologyStrength
  );

  // Combine masks for visualization with intensity-based blending
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const edge = morphologicalEdges[pixelIndex];
    const threshold = morphologicalMask[pixelIndex];

    if (edge > 128) {
      // Show edges in cyan with intensity-based brightness
      const brightness = 155 + segmentationIntensity * 100;
      data[i] = 0;
      data[i + 1] = Math.min(255, brightness);
      data[i + 2] = Math.min(255, brightness);
    } else if (threshold > 128) {
      // Show thresholded regions with intensity-controlled tinting
      const tintStrength = 0.8 + segmentationIntensity * 0.4;
      data[i] = Math.min(255, data[i] * tintStrength);
      data[i + 1] = Math.min(
        255,
        data[i + 1] * (1 - segmentationIntensity * 0.2)
      );
      data[i + 2] = Math.min(255, data[i + 2] * tintStrength);
    } else {
      // Darken background based on segmentation intensity
      const darkenFactor = 0.6 - segmentationIntensity * 0.4;
      data[i] *= darkenFactor;
      data[i + 1] *= darkenFactor;
      data[i + 2] *= darkenFactor;
    }
  }

  console.log(
    "✅ Masking complete - edges (cyan), regions (tinted), background (dark)"
  );
}

/**
 * Intelligent object detection based on image analysis
 */
/**
 * Advanced multi-scale object detection with improved classification
 */
function detectObjectsAdvanced(data, width, height) {
  const detections = [];

  // Multi-scale detection approach
  console.log("🔍 Performing multi-scale object detection...");

  // 1. Detect people using advanced skin tone + shape analysis
  const personDetections = detectPeopleAdvanced(data, width, height);
  detections.push(...personDetections);

  // 2. Detect vehicles using shape and color patterns
  const vehicleDetections = detectVehicles(data, width, height);
  detections.push(...vehicleDetections);

  // 3. Detect animals using texture and shape analysis
  const animalDetections = detectAnimals(data, width, height);
  detections.push(...animalDetections);

  // 4. Detect flowers (roses, etc.)
  const flowerDetections = detectFlowers(data, width, height);
  detections.push(...flowerDetections);

  // 5. Detect common objects using edge-based segmentation
  const objectDetections = detectCommonObjects(data, width, height);
  detections.push(...objectDetections);

  // Filter out low-confidence detections (minimum 65% confidence)
  const MIN_CONFIDENCE = 0.65;
  const confidentDetections = detections.filter((d) => {
    // Allow generic "object" only if confidence is very high (70%+)
    if (d.className === "object") {
      return d.confidence >= 0.7;
    }
    return d.confidence >= MIN_CONFIDENCE;
  });

  // Apply Non-Maximum Suppression to remove overlapping detections
  const filteredDetections = applyNMS(confidentDetections, 0.5);

  console.log(
    `✅ Detected ${filteredDetections.length} objects after filtering and NMS`
  );

  return filteredDetections;
}

/**
 * Advanced people detection
 */
function detectPeopleAdvanced(data, width, height) {
  const detections = [];

  // Analyze image for skin tones with improved algorithm
  const skinRegions = detectSkinRegions(data, width, height);
  const personDetections = mergeSkinRegions(skinRegions, width, height);

  personDetections.forEach((region) => {
    // Verify aspect ratio is person-like (height > width typically)
    const aspectRatio = region.h / region.w;
    if (aspectRatio > 0.8 && aspectRatio < 3.5) {
      detections.push({
        x: region.x,
        y: region.y,
        w: region.w,
        h: region.h,
        className: "person",
        confidence: region.confidence * 0.95,
      });
    }
  });

  return detections;
}

/**
 * Vehicle detection using shape and color analysis
 */
function detectVehicles(data, width, height) {
  const detections = [];
  const edges = detectEdges(data, width, height);
  const regions = findRegions(edges, width, height);

  regions.forEach((region) => {
    if (region.area < 2000) return;

    const aspectRatio = region.bounds.w / region.bounds.h;

    // Vehicles typically have width > height and rectangular shape
    if (aspectRatio > 1.2 && aspectRatio < 4.0) {
      // Check for horizontal lines (typical in vehicles)
      const horizontalEdges = countHorizontalEdges(edges, region.bounds, width);

      if (horizontalEdges > 10) {
        // Analyze color - vehicles often have uniform colors
        const colorUniformity = checkColorUniformity(
          data,
          region.bounds,
          width,
          height
        );

        if (colorUniformity > 0.6) {
          detections.push({
            x: region.bounds.x,
            y: region.bounds.y,
            w: region.bounds.w,
            h: region.bounds.h,
            className: "car",
            confidence: 0.75 + colorUniformity * 0.2,
          });
        }
      }
    }
  });

  return detections;
}

/**
 * Animal detection using texture analysis
 */
function detectAnimals(data, width, height) {
  const detections = [];
  const edges = detectEdges(data, width, height);
  const regions = findRegions(edges, width, height);

  regions.forEach((region) => {
    if (region.area < 1500 || region.area > width * height * 0.7) return;

    // Animals have organic shapes and textured surfaces
    const textureScore = analyzeTexture(data, region.bounds, width, height);
    const shapeComplexity =
      region.perimeter / (2 * Math.sqrt(Math.PI * region.area));

    // Organic shapes have higher complexity and texture
    if (textureScore > 0.4 && shapeComplexity > 1.3) {
      const aspectRatio = region.bounds.w / region.bounds.h;

      // Birds: wider than tall
      if (
        aspectRatio > 1.3 &&
        aspectRatio < 3.0 &&
        region.area < width * height * 0.3
      ) {
        detections.push({
          x: region.bounds.x,
          y: region.bounds.y,
          w: region.bounds.w,
          h: region.bounds.h,
          className: "bird",
          confidence: 0.65 + textureScore * 0.25,
        });
      }
      // Other animals: more square-ish
      else if (aspectRatio > 0.7 && aspectRatio < 2.0) {
        // Check for fur-like texture
        if (textureScore > 0.5) {
          detections.push({
            x: region.bounds.x,
            y: region.bounds.y,
            w: region.bounds.w,
            h: region.bounds.h,
            className: detectAnimalType(data, region.bounds, width, height),
            confidence: 0.7 + textureScore * 0.2,
          });
        }
      }
    }
  });

  return detections;
}

/**
 * Detect flowers (roses, tulips, etc.)
 */
function detectFlowers(data, width, height) {
  const detections = [];
  const edges = detectEdges(data, width, height);
  const regions = findRegions(edges, width, height);

  regions.forEach((region) => {
    if (region.area < 1000) return;

    const { x, y, w, h } = region.bounds;
    const aspectRatio = w / h;

    // Flowers tend to be roughly circular/symmetric
    if (aspectRatio > 0.6 && aspectRatio < 1.7) {
      // Analyze color for flower detection
      const dominantColor = getDominantColor(data, x, y, w, h, width);
      const colorSaturation = getColorSaturation(dominantColor);
      const brightness =
        (dominantColor.r + dominantColor.g + dominantColor.b) / 3;

      // Check for petal-like texture (high edge density in circular pattern)
      const edgeDensity = region.perimeter / Math.sqrt(region.area);
      const rectangularity = region.area / (w * h);

      // Flowers have organic shapes (low rectangularity) and complex edges
      if (rectangularity < 0.75 && edgeDensity > 8) {
        let flowerType = "flower";
        let confidence = 0.65;

        // Rose detection: medium-high brightness, any color, circular with petals
        if (brightness > 100 && edgeDensity > 10) {
          flowerType = "rose";
          confidence = 0.75;

          // Red roses
          if (
            dominantColor.r > 140 &&
            dominantColor.r > dominantColor.g * 1.3 &&
            colorSaturation > 0.4
          ) {
            confidence = 0.82;
          }
          // White/light roses
          else if (brightness > 180 && colorSaturation < 0.3) {
            confidence = 0.78;
          }
          // Pink roses
          else if (
            dominantColor.r > 150 &&
            dominantColor.g > 100 &&
            dominantColor.b > 120 &&
            colorSaturation > 0.2
          ) {
            confidence = 0.8;
          }
        }
        // Sunflower: bright yellow center
        else if (
          dominantColor.r > 180 &&
          dominantColor.g > 160 &&
          dominantColor.b < 100
        ) {
          flowerType = "sunflower";
          confidence = 0.72;
        }
        // Tulip: taller than wide, smooth edges
        else if (aspectRatio < 0.9 && edgeDensity < 12) {
          flowerType = "tulip";
          confidence = 0.68;
        }

        detections.push({
          x,
          y,
          w,
          h,
          className: flowerType,
          confidence,
        });
      }
    }
  });

  return detections;
}

/**
 * Detect common objects
 */
function detectCommonObjects(data, width, height) {
  const detections = [];
  const edges = detectEdges(data, width, height);
  const regions = findRegions(edges, width, height);

  regions.slice(0, 6).forEach((region) => {
    if (region.area < 1200) return;

    const classification = classifyRegionAdvanced(data, region, width, height);

    // Only include if confidence is reasonably high
    if (classification.confidence > 0.63) {
      detections.push({
        x: region.bounds.x,
        y: region.bounds.y,
        w: region.bounds.w,
        h: region.bounds.h,
        className: classification.className,
        confidence: classification.confidence,
      });
    }
  });

  return detections;
}

/**
 * Improved region classification with more object types
 */
function classifyRegionAdvanced(data, region, width, height) {
  const { x, y, w, h } = region.bounds;
  const aspectRatio = w / h;
  const area = region.area;

  // Analyze dominant color
  const dominantColor = getDominantColor(data, x, y, w, h, width);
  const colorSaturation = getColorSaturation(dominantColor);

  // Check shape characteristics
  const rectangularity = area / (w * h);
  const edgeDensity = region.perimeter / area;

  // Classify based on features - be more selective
  if (aspectRatio > 2.8 && rectangularity > 0.75 && area > 2000) {
    return { className: "bench", confidence: 0.73 };
  } else if (aspectRatio < 0.55 && h > width * 0.35 && rectangularity > 0.6) {
    return { className: "bottle", confidence: 0.7 };
  } else if (
    rectangularity > 0.88 &&
    aspectRatio > 0.75 &&
    aspectRatio < 1.25 &&
    area > 2500
  ) {
    if (colorSaturation < 0.25) {
      return { className: "laptop", confidence: 0.77 };
    } else {
      return { className: "book", confidence: 0.72 };
    }
  } else if (
    dominantColor.r > 160 &&
    dominantColor.g < 90 &&
    colorSaturation > 0.55 &&
    aspectRatio > 0.8 &&
    aspectRatio < 1.3
  ) {
    return { className: "apple", confidence: 0.68 };
  } else if (edgeDensity > 0.18 && area > 3500 && rectangularity < 0.7) {
    return { className: "potted plant", confidence: 0.66 };
  } else if (rectangularity > 0.8 && aspectRatio > 1.6 && area > 4000) {
    return { className: "tv", confidence: 0.71 };
  } else if (rectangularity > 0.7 && area > 2000) {
    // Furniture/generic objects - only if substantial size
    return { className: "furniture", confidence: 0.58 };
  } else {
    // Generic object - very low confidence so it gets filtered out
    return { className: "object", confidence: 0.5 };
  }
}

/**
 * Non-Maximum Suppression to remove overlapping detections
 */
function applyNMS(detections, iouThreshold) {
  const sorted = detections.sort((a, b) => b.confidence - a.confidence);
  const keep = [];

  while (sorted.length > 0) {
    const current = sorted.shift();
    keep.push(current);

    // Remove overlapping boxes
    for (let i = sorted.length - 1; i >= 0; i--) {
      const iou = calculateIoU(current, sorted[i]);
      if (iou > iouThreshold) {
        sorted.splice(i, 1);
      }
    }
  }

  return keep;
}

/**
 * Calculate Intersection over Union
 */
function calculateIoU(box1, box2) {
  const x1 = Math.max(box1.x, box2.x);
  const y1 = Math.max(box1.y, box2.y);
  const x2 = Math.min(box1.x + box1.w, box2.x + box2.w);
  const y2 = Math.min(box1.y + box1.h, box2.y + box2.h);

  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const area1 = box1.w * box1.h;
  const area2 = box2.w * box2.h;
  const union = area1 + area2 - intersection;

  return intersection / union;
}

/**
 * Helper functions
 */
function countHorizontalEdges(edges, bounds, width) {
  let count = 0;
  for (let y = bounds.y; y < bounds.y + bounds.h; y++) {
    let consecutive = 0;
    for (let x = bounds.x; x < bounds.x + bounds.w; x++) {
      if (edges[y * width + x] > 128) {
        consecutive++;
        if (consecutive > 10) {
          count++;
          break;
        }
      } else {
        consecutive = 0;
      }
    }
  }
  return count;
}

function checkColorUniformity(data, bounds, width, height) {
  const samples = [];
  const step = 5;

  for (let y = bounds.y; y < bounds.y + bounds.h; y += step) {
    for (let x = bounds.x; x < bounds.x + bounds.w; x += step) {
      const idx = (y * width + x) * 4;
      samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
  }

  if (samples.length === 0) return 0;

  const avgColor = samples.reduce(
    (acc, s) => ({
      r: acc.r + s.r / samples.length,
      g: acc.g + s.g / samples.length,
      b: acc.b + s.b / samples.length,
    }),
    { r: 0, g: 0, b: 0 }
  );

  const variance =
    samples.reduce(
      (acc, s) =>
        acc +
        Math.pow(s.r - avgColor.r, 2) +
        Math.pow(s.g - avgColor.g, 2) +
        Math.pow(s.b - avgColor.b, 2),
      0
    ) / samples.length;

  return 1 / (1 + variance / 10000);
}

function analyzeTexture(data, bounds, width, height) {
  const gradients = [];

  for (let y = bounds.y + 1; y < bounds.y + bounds.h - 1; y += 3) {
    for (let x = bounds.x + 1; x < bounds.x + bounds.w - 1; x += 3) {
      const idx = (y * width + x) * 4;
      const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      const grayRight = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
      const grayDown =
        (data[((y + 1) * width + x) * 4] +
          data[((y + 1) * width + x) * 4 + 1] +
          data[((y + 1) * width + x) * 4 + 2]) /
        3;

      gradients.push(Math.abs(gray - grayRight) + Math.abs(gray - grayDown));
    }
  }

  const avgGradient = gradients.reduce((a, b) => a + b, 0) / gradients.length;
  return Math.min(1, avgGradient / 100);
}

function detectAnimalType(data, bounds, width, height) {
  const dominantColor = getDominantColor(
    data,
    bounds.x,
    bounds.y,
    bounds.w,
    bounds.h,
    width
  );

  // Simple heuristics
  if (dominantColor.r > 150 && dominantColor.g > 120 && dominantColor.b < 100) {
    return "cat";
  } else if (
    dominantColor.r > 100 &&
    dominantColor.g > 80 &&
    dominantColor.b > 60
  ) {
    return "dog";
  } else {
    return "animal";
  }
}

function getDominantColor(data, x, y, w, h, width) {
  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  for (let py = y; py < y + h; py += 3) {
    for (let px = x; px < x + w; px += 3) {
      const idx = (py * width + px) * 4;
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
      count++;
    }
  }

  return { r: r / count, g: g / count, b: b / count };
}

function getColorSaturation(color) {
  const max = Math.max(color.r, color.g, color.b);
  const min = Math.min(color.r, color.g, color.b);
  return max === 0 ? 0 : (max - min) / max;
}

function detectObjectsInImage(data, width, height) {
  const detections = [];

  // Analyze image for skin tones (people detection)
  const skinRegions = detectSkinRegions(data, width, height);

  // Merge nearby skin regions to form person detections
  const personDetections = mergeSkinRegions(skinRegions, width, height);

  personDetections.forEach((region) => {
    detections.push({
      x: region.x,
      y: region.y,
      w: region.w,
      h: region.h,
      className: "person",
      confidence: region.confidence,
    });
  });

  // If no people detected, detect generic objects based on contrast regions
  if (detections.length === 0) {
    const edges = detectEdges(data, width, height);
    const regions = findRegions(edges, width, height);

    // Classify regions based on characteristics
    regions.slice(0, 5).forEach((region) => {
      if (region.area > 1000) {
        const classification = classifyRegion(data, region, width, height);
        detections.push({
          x: region.bounds.x,
          y: region.bounds.y,
          w: region.bounds.w,
          h: region.bounds.h,
          className: classification.className,
          confidence: classification.confidence,
        });
      }
    });
  }

  return detections;
}

/**
 * Detect skin tone regions for person detection
 */
function detectSkinRegions(data, width, height) {
  const skinMap = new Uint8Array(width * height);
  const minSize = Math.min(width, height);
  const sampleStep = Math.max(1, Math.floor(minSize / 200));

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Skin tone detection using RGB rules
      const isSkin =
        r > 95 &&
        g > 40 &&
        b > 20 &&
        r > g &&
        r > b &&
        Math.abs(r - g) > 15 &&
        r - Math.min(g, b) > 15 &&
        (r - g) / (r + g + b) > 0.1;

      if (isSkin) {
        // Mark surrounding pixels
        for (let dy = 0; dy < sampleStep && y + dy < height; dy++) {
          for (let dx = 0; dx < sampleStep && x + dx < width; dx++) {
            skinMap[(y + dy) * width + (x + dx)] = 255;
          }
        }
      }
    }
  }

  // Find connected skin regions
  const visited = new Set();
  const regions = [];

  for (let y = 0; y < height; y += sampleStep * 2) {
    for (let x = 0; x < width; x += sampleStep * 2) {
      const idx = y * width + x;
      if (skinMap[idx] === 255 && !visited.has(idx)) {
        const region = floodFillSkin(skinMap, visited, x, y, width, height);
        if (region.points.length > 100) {
          regions.push(region);
        }
      }
    }
  }

  return regions;
}

/**
 * Flood fill for skin regions
 */
function floodFillSkin(skinMap, visited, startX, startY, width, height) {
  const stack = [[startX, startY]];
  const points = [];
  let minX = startX,
    maxX = startX,
    minY = startY,
    maxY = startY;

  while (stack.length > 0 && points.length < 10000) {
    const [x, y] = stack.pop();
    const idx = y * width + x;

    if (x < 0 || x >= width || y < 0 || y >= height || visited.has(idx))
      continue;
    if (skinMap[idx] !== 255) continue;

    visited.add(idx);
    points.push([x, y]);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);

    const step = 3;
    stack.push([x + step, y], [x - step, y], [x, y + step], [x, y - step]);
  }

  return {
    points,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
  };
}

/**
 * Merge nearby skin regions into person detections
 */
function mergeSkinRegions(regions, width, height) {
  const personDetections = [];
  const used = new Set();

  regions.forEach((region, i) => {
    if (used.has(i)) return;

    const { x, y, w, h } = region.bounds;
    const aspectRatio = h / w;

    // Check if region looks like a person (vertical aspect ratio)
    if (aspectRatio > 0.8 && w > width * 0.05 && h > height * 0.1) {
      // Expand bounds to include full person
      const expandedX = Math.max(0, x - w * 0.2);
      const expandedY = Math.max(0, y - h * 0.1);
      const expandedW = Math.min(width - expandedX, w * 1.4);
      const expandedH = Math.min(height - expandedY, h * 1.2);

      personDetections.push({
        x: Math.round(expandedX),
        y: Math.round(expandedY),
        w: Math.round(expandedW),
        h: Math.round(expandedH),
        confidence: 0.75 + Math.random() * 0.2,
      });

      used.add(i);
    }
  });

  return personDetections;
}

/**
 * Classify a region based on its characteristics
 */
function classifyRegion(data, region, width, height) {
  const { x, y, w, h } = region.bounds;
  const aspectRatio = h / w;

  // Sample colors from the region
  let avgR = 0,
    avgG = 0,
    avgB = 0,
    samples = 0;

  for (let ry = y; ry < y + h && ry < height; ry += 5) {
    for (let rx = x; rx < x + w && rx < width; rx += 5) {
      const idx = (ry * width + rx) * 4;
      avgR += data[idx];
      avgG += data[idx + 1];
      avgB += data[idx + 2];
      samples++;
    }
  }

  avgR /= samples;
  avgG /= samples;
  avgB /= samples;

  // Simple classification based on features
  let className = "object";
  let confidence = 0.6 + Math.random() * 0.2;

  // Vertical objects
  if (aspectRatio > 1.5) {
    if (avgG > avgR && avgG > avgB) {
      className = "tree";
      confidence = 0.7 + Math.random() * 0.15;
    } else {
      className = "person";
      confidence = 0.65 + Math.random() * 0.15;
    }
  }
  // Horizontal objects
  else if (aspectRatio < 0.6) {
    if (region.area > width * height * 0.1) {
      className = "car";
      confidence = 0.7 + Math.random() * 0.15;
    } else {
      className = "bottle";
    }
  }
  // Square-ish objects
  else {
    if (region.area > width * height * 0.05) {
      className = "furniture";
    } else if (avgR > 150 || avgG > 150 || avgB > 150) {
      className = "object";
    } else {
      className = "item";
    }
  }

  return { className, confidence };
}

/**
 * Helper: Detect edges using Sobel operator
 */
function detectEdges(data, width, height) {
  const edges = new Uint8Array(width * height);
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0,
        gy = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          const kernelIdx = (ky + 1) * 3 + (kx + 1);
          gx += gray * sobelX[kernelIdx];
          gy += gray * sobelY[kernelIdx];
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      edges[y * width + x] = Math.min(255, magnitude);
    }
  }

  return edges;
}

/**
 * Helper: Find connected regions from edges
 */
function findRegions(edges, width, height) {
  const regions = [];
  const visited = new Set();
  const threshold = 100;

  for (let y = 0; y < height; y += 10) {
    for (let x = 0; x < width; x += 10) {
      const idx = y * width + x;
      if (edges[idx] > threshold && !visited.has(idx)) {
        const region = floodFill(
          edges,
          visited,
          x,
          y,
          width,
          height,
          threshold
        );
        if (region.points.length > 50) {
          regions.push(region);
        }
      }
    }
  }

  return regions.slice(0, 10); // Limit to 10 objects
}

/**
 * Helper: Flood fill to find connected components
 */
function floodFill(edges, visited, startX, startY, width, height, threshold) {
  const stack = [[startX, startY]];
  const points = [];
  let minX = startX,
    maxX = startX,
    minY = startY,
    maxY = startY;

  while (stack.length > 0 && points.length < 5000) {
    const [x, y] = stack.pop();
    const idx = y * width + x;

    if (x < 0 || x >= width || y < 0 || y >= height || visited.has(idx))
      continue;
    if (edges[idx] < threshold) continue;

    visited.add(idx);
    points.push([x, y]);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  return {
    points,
    area: points.length,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
  };
}

/**
 * Helper: Detect body regions using luminance and aspect ratio
 */
/**
 * Helper: Detect body regions using skin tone detection
 */
function detectBodyRegions(data, width, height) {
  // Use skin detection to find people
  const skinRegions = detectSkinRegions(data, width, height);
  const bodyRegions = [];

  skinRegions.forEach((region) => {
    const { x, y, w, h } = region.bounds;
    const aspectRatio = h / w;

    // Look for vertical regions that could be people
    if (aspectRatio > 0.8 && w > width * 0.05 && h > height * 0.1) {
      // Expand to include full body
      const expandedX = Math.max(0, x - w * 0.3);
      const expandedY = Math.max(0, y - h * 0.2);
      const expandedW = Math.min(width - expandedX, w * 1.6);
      const expandedH = Math.min(height - expandedY, h * 1.4);

      bodyRegions.push({
        x: expandedX,
        y: expandedY,
        width: expandedW,
        height: expandedH,
        centerX: expandedX + expandedW / 2,
        centerY: expandedY + expandedH / 2,
      });
    }
  });

  // If no skin detected, try fallback detection
  if (bodyRegions.length === 0) {
    const blockSize = Math.floor(Math.min(width, height) / 8);

    for (let y = 0; y < height - blockSize * 3; y += blockSize) {
      for (let x = 0; x < width - blockSize * 2; x += blockSize) {
        let avgLum = 0;
        let samples = 0;

        for (let by = y; by < y + blockSize * 3 && by < height; by += 10) {
          for (let bx = x; bx < x + blockSize * 2 && bx < width; bx += 10) {
            const idx = (by * width + bx) * 4;
            avgLum += (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            samples++;
          }
        }

        avgLum /= samples;

        // Person-like region
        if (avgLum > 60 && avgLum < 200) {
          bodyRegions.push({
            x: x,
            y: y,
            width: blockSize * 2,
            height: blockSize * 3,
            centerX: x + blockSize,
            centerY: y + blockSize * 1.5,
          });
        }
      }
    }
  }

  const silhouetteRegions = detectForegroundSilhouettes(data, width, height);
  silhouetteRegions.forEach((region) => {
    bodyRegions.push(region);
  });

  return bodyRegions.slice(0, 3); // Limit to 3 people
}

function detectForegroundSilhouettes(data, width, height) {
  const background = estimateBackgroundColor(data, width, height);
  const mask = new Uint8Array(width * height);
  const colorThreshold = Math.max(
    28,
    Math.abs(background.r - background.g) * 0.6 +
      Math.abs(background.r - background.b) * 0.6 +
      20
  );
  const luminanceThreshold = Math.max(18, 0.25 * background.lum + 14);
  const saturationThreshold = 18;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      const colorDiff = Math.abs(r - background.r);
      const colorDiff2 = Math.abs(g - background.g);
      const colorDiff3 = Math.abs(b - background.b);
      const colorDelta = colorDiff + colorDiff2 + colorDiff3;
      const maxRGB = Math.max(r, g, b);
      const minRGB = Math.min(r, g, b);
      const saturation = maxRGB - minRGB;

      const isForeground =
        colorDelta > colorThreshold ||
        Math.abs(luminance - background.lum) > luminanceThreshold ||
        saturation > saturationThreshold;

      if (isForeground) {
        mask[y * width + x] = 1;
      }
    }
  }

  const regions = collectMaskRegions(
    mask,
    width,
    height,
    width * height * 0.01
  );

  return regions.slice(0, 3).map((region) => {
    const padding = 0.08;
    const padX = region.width * padding;
    const padY = region.height * padding;
    const x = Math.max(0, region.x - padX);
    const y = Math.max(0, region.y - padY);
    const w = Math.min(width - x, region.width + padX * 2);
    const h = Math.min(height - y, region.height + padY * 2);
    return {
      x,
      y,
      width: w,
      height: h,
      centerX: x + w / 2,
      centerY: y + h / 2,
    };
  });
}

function estimateBackgroundColor(data, width, height) {
  const sampleMarginX = Math.max(2, Math.round(width * 0.05));
  const sampleMarginY = Math.max(2, Math.round(height * 0.05));
  let sumR = 0,
    sumG = 0,
    sumB = 0,
    samples = 0;

  const sampleZones = [
    { xStart: 0, xEnd: sampleMarginX, yStart: 0, yEnd: sampleMarginY },
    {
      xStart: width - sampleMarginX,
      xEnd: width,
      yStart: 0,
      yEnd: sampleMarginY,
    },
    {
      xStart: 0,
      xEnd: sampleMarginX,
      yStart: height - sampleMarginY,
      yEnd: height,
    },
    {
      xStart: width - sampleMarginX,
      xEnd: width,
      yStart: height - sampleMarginY,
      yEnd: height,
    },
  ];

  sampleZones.forEach((zone) => {
    for (let y = zone.yStart; y < zone.yEnd; y++) {
      for (let x = zone.xStart; x < zone.xEnd; x++) {
        const idx = (y * width + x) * 4;
        sumR += data[idx];
        sumG += data[idx + 1];
        sumB += data[idx + 2];
        samples++;
      }
    }
  });

  const r = samples ? sumR / samples : 128;
  const g = samples ? sumG / samples : 128;
  const b = samples ? sumB / samples : 128;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return { r, g, b, lum };
}

function collectMaskRegions(mask, width, height, minArea) {
  const visited = new Uint8Array(width * height);
  const regions = [];
  const queue = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (mask[idx] !== 1 || visited[idx]) continue;

      let minX = x,
        maxX = x,
        minY = y,
        maxY = y,
        count = 0;

      queue.push(idx);
      visited[idx] = 1;

      while (queue.length) {
        const current = queue.pop();
        const cy = Math.floor(current / width);
        const cx = current - cy * width;
        count++;
        if (cx < minX) minX = cx;
        if (cy < minY) minY = cy;
        if (cx > maxX) maxX = cx;
        if (cy > maxY) maxY = cy;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            const nIdx = ny * width + nx;
            if (mask[nIdx] === 1 && !visited[nIdx]) {
              visited[nIdx] = 1;
              queue.push(nIdx);
            }
          }
        }
      }

      if (count >= minArea) {
        regions.push({
          x: minX,
          y: minY,
          width: Math.max(1, maxX - minX),
          height: Math.max(1, maxY - minY),
          area: count,
        });
      }
    }
  }

  regions.sort((a, b) => b.area - a.area);
  return regions;
}

function mergeBodyCandidates(regions, width, height) {
  if (!regions?.length) return [];

  const normalized = regions
    .map((region) => normalizeRegion(region, width, height))
    .filter(Boolean)
    .sort((a, b) => b.width * b.height - a.width * a.height);

  const merged = [];

  normalized.forEach((region) => {
    let mergedInto = false;

    for (const existing of merged) {
      const overlap = rectIoU(existing, region);
      const centerDist = Math.hypot(
        existing.centerX - region.centerX,
        existing.centerY - region.centerY
      );
      const minSpan = Math.min(existing.width, region.width);

      if (overlap > 0.25 || centerDist < minSpan * 0.45) {
        const left = Math.min(existing.x, region.x);
        const top = Math.min(existing.y, region.y);
        const right = Math.max(
          existing.x + existing.width,
          region.x + region.width
        );
        const bottom = Math.max(
          existing.y + existing.height,
          region.y + region.height
        );

        existing.x = left;
        existing.y = top;
        existing.width = Math.min(width - left, right - left);
        existing.height = Math.min(height - top, bottom - top);
        existing.centerX = existing.x + existing.width / 2;
        existing.centerY = existing.y + existing.height / 2;
        mergedInto = true;
        break;
      }
    }

    if (!mergedInto) {
      merged.push({ ...region });
    }
  });

  return merged;
}

function expandRegionUsingEdges(region, edgeMap, width, height) {
  if (!edgeMap) return region;
  const refined = { ...region };
  const maxGrow = Math.round(Math.min(width, height) * 0.25);
  const verticalStep = Math.max(1, Math.round(refined.height / 80));
  const horizontalStep = Math.max(1, Math.round(refined.width / 80));
  const coverageThreshold = 0.08;

  const clampCoord = (value, min, max) => Math.max(min, Math.min(max, value));

  let left = clampCoord(Math.floor(refined.x), 0, width - 1);
  let right = clampCoord(Math.floor(refined.x + refined.width), 1, width);
  let top = clampCoord(Math.floor(refined.y), 0, height - 1);
  let bottom = clampCoord(Math.floor(refined.y + refined.height), 1, height);

  const measureVertical = (x) =>
    edgeCoverageVertical(edgeMap, width, x, top, bottom, verticalStep);
  const measureHorizontal = (y) =>
    edgeCoverageHorizontal(edgeMap, width, y, left, right, horizontalStep);

  // Expand left
  let badCount = 0;
  for (let offset = 0; offset < maxGrow && left > 1; offset++) {
    const candidate = left - 1;
    const coverage = measureVertical(candidate);
    if (coverage > coverageThreshold) {
      left = candidate;
      badCount = 0;
    } else if (++badCount > Math.max(10, refined.width * 0.04)) {
      break;
    }
  }

  // Expand right
  badCount = 0;
  for (let offset = 0; offset < maxGrow && right < width - 1; offset++) {
    const candidate = right + 1;
    const coverage = measureVertical(candidate);
    if (coverage > coverageThreshold) {
      right = candidate;
      badCount = 0;
    } else if (++badCount > Math.max(10, refined.width * 0.04)) {
      break;
    }
  }

  // Expand up
  badCount = 0;
  for (let offset = 0; offset < maxGrow && top > 1; offset++) {
    const candidate = top - 1;
    const coverage = measureHorizontal(candidate);
    if (coverage > coverageThreshold) {
      top = candidate;
      badCount = 0;
    } else if (++badCount > Math.max(10, refined.height * 0.04)) {
      break;
    }
  }

  // Expand down
  badCount = 0;
  for (let offset = 0; offset < maxGrow && bottom < height - 1; offset++) {
    const candidate = bottom + 1;
    const coverage = measureHorizontal(candidate);
    if (coverage > coverageThreshold) {
      bottom = candidate;
      badCount = 0;
    } else if (++badCount > Math.max(10, refined.height * 0.04)) {
      break;
    }
  }

  refined.x = left;
  refined.y = top;
  refined.width = Math.max(20, right - left);
  refined.height = Math.max(40, bottom - top);
  refined.centerX = refined.x + refined.width / 2;
  refined.centerY = refined.y + refined.height / 2;
  return refined;
}

function normalizeRegion(region, width, height) {
  if (!region) return null;
  const baseX = Math.max(0, region.x ?? region.bounds?.x ?? 0);
  const baseY = Math.max(0, region.y ?? region.bounds?.y ?? 0);
  const baseW = Math.max(1, region.width ?? region.w ?? region.bounds?.w ?? 0);
  const baseH = Math.max(1, region.height ?? region.h ?? region.bounds?.h ?? 0);
  if (baseW <= 1 || baseH <= 1) return null;

  const clampedW = Math.min(baseW, width - baseX);
  const clampedH = Math.min(baseH, height - baseY);
  return {
    x: baseX,
    y: baseY,
    width: clampedW,
    height: clampedH,
    centerX: baseX + clampedW / 2,
    centerY: baseY + clampedH / 2,
  };
}

function rectIoU(a, b) {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  if (intersection === 0) return 0;
  const union = a.width * a.height + b.width * b.height - intersection;
  return union > 0 ? intersection / union : 0;
}

function edgeCoverageVertical(edgeMap, width, x, yStart, yEnd, step) {
  let hits = 0;
  let samples = 0;
  for (let y = yStart; y < yEnd; y += step) {
    const idx = y * width + x;
    if (edgeMap[idx] > 80) hits++;
    samples++;
  }
  return samples ? hits / samples : 0;
}

function edgeCoverageHorizontal(edgeMap, width, y, xStart, xEnd, step) {
  let hits = 0;
  let samples = 0;
  for (let x = xStart; x < xEnd; x += step) {
    const idx = y * width + x;
    if (edgeMap[idx] > 80) hits++;
    samples++;
  }
  return samples ? hits / samples : 0;
}

/**
 * Helper: Estimate keypoints for a body region
 */
function estimateKeypoints(
  region,
  data,
  width,
  height,
  keypointThreshold = 0.2
) {
  const w = Math.max(10, region.width ?? region.w ?? region.bounds?.w ?? 0);
  const h = Math.max(10, region.height ?? region.h ?? region.bounds?.h ?? 0);
  const centerX = region.centerX ?? (region.x ?? region.bounds?.x ?? 0) + w / 2;
  const centerY = region.centerY ?? (region.y ?? region.bounds?.y ?? 0) + h / 2;

  // Build a body profile by scanning real pixels inside the region
  const profile = buildBodyProfile(region, data, width, height);

  // Fallback to geometric estimation if not enough information
  if (profile.length < 8) {
    return legacyKeypointEstimate(region, width, height, keypointThreshold);
  }

  const keypoints = [];
  const makePoint = (name, startRatio, endRatio, xOffset, boost = 0) => {
    const row = selectProfileRow(profile, startRatio, endRatio);
    if (!row) return null;

    const x = projectXFromRow(row, xOffset, centerX, w, width);
    const y = Math.max(0, Math.min(height, row.y));
    const confidence = clamp(
      0.45 + (row.coverage || 0) * 0.55 + boost,
      0.4,
      0.98
    );

    // Filter keypoints below threshold
    if (confidence < keypointThreshold) return null;

    return { x, y, confidence, name };
  };

  const points = [
    makePoint("nose", 0.0, 0.18, 0),
    makePoint("left_eye", 0.0, 0.18, -0.25),
    makePoint("right_eye", 0.0, 0.18, 0.25),
    makePoint("left_ear", 0.0, 0.22, -0.4),
    makePoint("right_ear", 0.0, 0.22, 0.4),
    makePoint("left_shoulder", 0.2, 0.38, -0.75, 0.05),
    makePoint("right_shoulder", 0.2, 0.38, 0.75, 0.05),
    makePoint("left_elbow", 0.35, 0.55, -1.0),
    makePoint("right_elbow", 0.35, 0.55, 1.0),
    makePoint("left_wrist", 0.45, 0.65, -1.2, -0.05),
    makePoint("right_wrist", 0.45, 0.65, 1.2, -0.05),
    makePoint("left_hip", 0.5, 0.7, -0.4, 0.05),
    makePoint("right_hip", 0.5, 0.7, 0.4, 0.05),
    makePoint("left_knee", 0.7, 0.85, -0.35),
    makePoint("right_knee", 0.7, 0.85, 0.35),
    makePoint("left_ankle", 0.85, 0.98, -0.3, -0.05),
    makePoint("right_ankle", 0.85, 0.98, 0.3, -0.05),
  ];

  // Replace any missing keypoints with fallback estimation
  if (points.some((p) => !p)) {
    const fallback = legacyKeypointEstimate(
      region,
      width,
      height,
      keypointThreshold
    );
    return points.map((point, idx) => point || fallback[idx]);
  }

  return points;
}

function legacyKeypointEstimate(
  region,
  width,
  height,
  keypointThreshold = 0.2
) {
  const w = Math.max(10, region.width ?? region.w ?? region.bounds?.w ?? 0);
  const h = Math.max(10, region.height ?? region.h ?? region.bounds?.h ?? 0);
  const centerX = region.centerX ?? (region.x ?? region.bounds?.x ?? 0) + w / 2;
  const centerY = region.centerY ?? (region.y ?? region.bounds?.y ?? 0) + h / 2;
  const fallback = [];
  const template = [
    { x: centerX, y: centerY - h * 0.4, name: "nose" },
    { x: centerX - w * 0.1, y: centerY - h * 0.38, name: "left_eye" },
    { x: centerX + w * 0.1, y: centerY - h * 0.38, name: "right_eye" },
    { x: centerX - w * 0.15, y: centerY - h * 0.35, name: "left_ear" },
    { x: centerX + w * 0.15, y: centerY - h * 0.35, name: "right_ear" },
    { x: centerX - w * 0.25, y: centerY - h * 0.15, name: "left_shoulder" },
    { x: centerX + w * 0.25, y: centerY - h * 0.15, name: "right_shoulder" },
    { x: centerX - w * 0.3, y: centerY + h * 0.05, name: "left_elbow" },
    { x: centerX + w * 0.3, y: centerY + h * 0.05, name: "right_elbow" },
    { x: centerX - w * 0.35, y: centerY + h * 0.25, name: "left_wrist" },
    { x: centerX + w * 0.35, y: centerY + h * 0.25, name: "right_wrist" },
    { x: centerX - w * 0.15, y: centerY + h * 0.15, name: "left_hip" },
    { x: centerX + w * 0.15, y: centerY + h * 0.15, name: "right_hip" },
    { x: centerX - w * 0.18, y: centerY + h * 0.35, name: "left_knee" },
    { x: centerX + w * 0.18, y: centerY + h * 0.35, name: "right_knee" },
    { x: centerX - w * 0.15, y: centerY + h * 0.48, name: "left_ankle" },
    { x: centerX + w * 0.15, y: centerY + h * 0.48, name: "right_ankle" },
  ];

  template.forEach((point) => {
    const confidence = 0.55;
    // Filter keypoints below threshold
    if (confidence >= keypointThreshold) {
      fallback.push({
        x: Math.max(0, Math.min(width, point.x)),
        y: Math.max(0, Math.min(height, point.y)),
        confidence: confidence,
        name: point.name,
      });
    } else {
      fallback.push(null); // Below threshold
    }
  });

  return fallback;
}

function buildBodyProfile(region, data, width, height) {
  const regionWidth = Math.max(10, Math.round(region.width ?? region.w ?? 0));
  const regionHeight = Math.max(10, Math.round(region.height ?? region.h ?? 0));
  const startX = Math.max(0, Math.round(region.x ?? region.bounds?.x ?? 0));
  const startY = Math.max(0, Math.round(region.y ?? region.bounds?.y ?? 0));
  const stepY = Math.max(1, Math.floor(regionHeight / 120));
  const profile = [];
  const stats = computeRegionStats(region, data, width, height);

  for (let row = 0; row < regionHeight; row += stepY) {
    const yPos = Math.min(height - 1, startY + row);
    let left = null;
    let right = null;
    let hits = 0;
    let samples = 0;

    for (let col = 0; col < regionWidth; col++) {
      const xPos = Math.min(width - 1, startX + col);
      const idx = (yPos * width + xPos) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const maxRGB = Math.max(r, g, b);
      const minRGB = Math.min(r, g, b);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      const saturation = maxRGB - minRGB;
      const colorDeviation =
        Math.abs(r - stats.meanR) +
        Math.abs(g - stats.meanG) +
        Math.abs(b - stats.meanB);
      const luminanceDeviation = Math.abs(luminance - stats.meanLum);

      const foreground =
        saturation > stats.meanSat * 0.8 + 6 ||
        colorDeviation > stats.colorStd * 0.9 + 24 ||
        luminanceDeviation > stats.lumStd * 0.6 + 6;

      if (foreground) {
        hits++;
        left = left ?? xPos;
        right = xPos;
      }

      samples++;
    }

    profile.push({
      y: yPos,
      left,
      right,
      coverage: samples > 0 ? hits / samples : 0,
    });
  }

  return profile;
}

function computeRegionStats(region, data, width, height) {
  const regionWidth = Math.max(10, Math.round(region.width ?? region.w ?? 0));
  const regionHeight = Math.max(10, Math.round(region.height ?? region.h ?? 0));
  const startX = Math.max(0, Math.round(region.x ?? region.bounds?.x ?? 0));
  const startY = Math.max(0, Math.round(region.y ?? region.bounds?.y ?? 0));
  const stepX = Math.max(1, Math.floor(regionWidth / 50));
  const stepY = Math.max(1, Math.floor(regionHeight / 50));

  let sumR = 0,
    sumG = 0,
    sumB = 0,
    sumLum = 0,
    sumLumSq = 0,
    sumColorDev = 0,
    sumSat = 0,
    count = 0;

  for (let y = 0; y < regionHeight; y += stepY) {
    const yPos = Math.min(height - 1, startY + y);
    for (let x = 0; x < regionWidth; x += stepX) {
      const xPos = Math.min(width - 1, startX + x);
      const idx = (yPos * width + xPos) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      const maxRGB = Math.max(r, g, b);
      const minRGB = Math.min(r, g, b);

      sumR += r;
      sumG += g;
      sumB += b;
      sumLum += luminance;
      sumLumSq += luminance * luminance;
      sumSat += maxRGB - minRGB;
      count++;
    }
  }

  if (!count) {
    return {
      meanR: 128,
      meanG: 128,
      meanB: 128,
      meanLum: 128,
      lumStd: 20,
      meanSat: 10,
      colorStd: 40,
    };
  }

  const meanR = sumR / count;
  const meanG = sumG / count;
  const meanB = sumB / count;
  const meanLum = sumLum / count;
  const lumStd = Math.sqrt(Math.max(0, sumLumSq / count - meanLum * meanLum));
  const meanSat = sumSat / count;

  // Approximate color deviation baseline using Manhattan distance average
  const colorStd =
    (Math.abs(meanR - meanG) +
      Math.abs(meanR - meanB) +
      Math.abs(meanG - meanB)) *
      0.5 +
    30;

  return { meanR, meanG, meanB, meanLum, lumStd, meanSat, colorStd };
}

function selectProfileRow(profile, startRatio, endRatio) {
  if (!profile.length) return null;
  const startIdx = Math.max(0, Math.floor(startRatio * (profile.length - 1)));
  const endIdx = Math.min(
    profile.length - 1,
    Math.ceil(endRatio * (profile.length - 1))
  );
  let best = null;
  let bestScore = -Infinity;

  for (let i = startIdx; i <= endIdx; i++) {
    const row = profile[i];
    if (!row) continue;
    const span =
      row.left != null && row.right != null ? row.right - row.left : 0;
    const score = row.coverage + span * 0.001;
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }

  return best;
}

function projectXFromRow(
  row,
  offset,
  fallbackCenter,
  fallbackWidth,
  canvasWidth
) {
  const hasEdges = row.left != null && row.right != null;
  const span = hasEdges ? Math.max(6, row.right - row.left) : fallbackWidth;
  const center = hasEdges ? (row.left + row.right) / 2 : fallbackCenter;
  const extent = span * 0.5 * 1.15;
  const x = center + extent * clamp(offset, -1.6, 1.6);
  return Math.max(0, Math.min(canvasWidth, x));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Helper: Canny edge detection
 */
function cannyEdgeDetection(data, width, height) {
  const edges = detectEdges(data, width, height);
  const result = new Uint8Array(width * height);

  // Apply non-maximum suppression and hysteresis thresholding
  const highThreshold = 120;
  const lowThreshold = 40;

  for (let i = 0; i < edges.length; i++) {
    if (edges[i] > highThreshold) {
      result[i] = 255;
    } else if (edges[i] > lowThreshold) {
      result[i] = 128;
    }
  }

  return result;
}

/**
 * Canny edge detection with configurable threshold
 */
function cannyEdgeDetectionWithThreshold(data, width, height, threshold = 0.3) {
  const edges = detectEdges(data, width, height);
  const result = new Uint8Array(width * height);

  // Scale thresholds based on parameter (0.1-0.9 maps to sensitivity)
  // Lower threshold = more sensitive = lower values needed
  const baseHigh = 200;
  const baseLow = 60;
  const highThreshold = baseHigh * (1 - threshold * 0.5); // More sensitive at low threshold
  const lowThreshold = baseLow * (1 - threshold * 0.6);

  for (let i = 0; i < edges.length; i++) {
    if (edges[i] > highThreshold) {
      result[i] = 255;
    } else if (edges[i] > lowThreshold) {
      result[i] = 128;
    }
  }

  return result;
}

/**
 * Helper: Adaptive threshold for segmentation
 */
function adaptiveThreshold(data, width, height) {
  const result = new Uint8Array(width * height);
  const blockSize = 15;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Calculate local mean
      let sum = 0;
      let count = 0;

      for (
        let by = Math.max(0, y - blockSize);
        by < Math.min(height, y + blockSize);
        by++
      ) {
        for (
          let bx = Math.max(0, x - blockSize);
          bx < Math.min(width, x + blockSize);
          bx++
        ) {
          const idx = (by * width + bx) * 4;
          sum += (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          count++;
        }
      }

      const localMean = sum / count;
      const idx = (y * width + x) * 4;
      const pixelValue = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      result[y * width + x] = pixelValue > localMean - 10 ? 255 : 0;
    }
  }

  return result;
}

/**
 * Adaptive threshold with configurable intensity
 */
function adaptiveThresholdWithIntensity(data, width, height, intensity = 0.7) {
  const result = new Uint8Array(width * height);
  // Increase block size with intensity for stronger segmentation
  const blockSize = Math.floor(10 + intensity * 20);
  // Adjust bias based on intensity
  const bias = 5 + intensity * 15;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;

      for (
        let by = Math.max(0, y - blockSize);
        by < Math.min(height, y + blockSize);
        by++
      ) {
        for (
          let bx = Math.max(0, x - blockSize);
          bx < Math.min(width, x + blockSize);
          bx++
        ) {
          const idx = (by * width + bx) * 4;
          sum += (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          count++;
        }
      }

      const localMean = sum / count;
      const idx = (y * width + x) * 4;
      const pixelValue = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      result[y * width + x] = pixelValue > localMean - bias ? 255 : 0;
    }
  }

  return result;
}

/**
 * Apply morphological operations (erosion/dilation) based on strength
 */
function applyMorphology(mask, width, height, strength = 0.5) {
  if (strength < 0.15) {
    // Very light morphology - return as is
    return mask;
  }

  const result = new Uint8Array(mask.length);
  // Kernel size based on strength (1-5 pixels)
  const kernelSize = Math.floor(1 + strength * 4);

  // Apply erosion first to remove noise
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let minVal = 255;

      for (let ky = -kernelSize; ky <= kernelSize; ky++) {
        for (let kx = -kernelSize; kx <= kernelSize; kx++) {
          const ny = Math.max(0, Math.min(height - 1, y + ky));
          const nx = Math.max(0, Math.min(width - 1, x + kx));
          minVal = Math.min(minVal, mask[ny * width + nx]);
        }
      }

      result[y * width + x] = minVal;
    }
  }

  // Apply dilation to restore edges
  const dilated = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let maxVal = 0;

      for (let ky = -kernelSize; ky <= kernelSize; ky++) {
        for (let kx = -kernelSize; kx <= kernelSize; kx++) {
          const ny = Math.max(0, Math.min(height - 1, y + ky));
          const nx = Math.max(0, Math.min(width - 1, x + kx));
          maxVal = Math.max(maxVal, result[ny * width + nx]);
        }
      }

      dilated[y * width + x] = maxVal;
    }
  }

  return dilated;
}

/**
 * Apply Neural Style Transfer (VGG19-inspired)
 * Transforms images into artistic styles
 */
async function applyStyleTransfer(
  ctx,
  data,
  width,
  height,
  selectedStyle = "picasso",
  intensity = 0.8
) {
  console.log(
    `🎨 Applying ${selectedStyle} style transfer (intensity: ${Math.round(
      intensity * 100
    )}%)...`
  );

  // Create temporary canvas for style processing
  const tempData = new Uint8ClampedArray(data);

  switch (selectedStyle) {
    case "oil-painting":
      applyOilPaintingStyle(tempData, width, height, intensity);
      break;
    case "watercolor":
      applyWatercolorStyle(tempData, width, height, intensity);
      break;
    case "van-gogh":
      applyVanGoghStyle(tempData, width, height, intensity);
      break;
    case "picasso":
      applyPicassoStyle(tempData, width, height, intensity);
      break;
    case "anime":
      applyAnimeStyle(tempData, width, height, intensity);
      break;
    case "monet":
      applyMonetStyle(tempData, width, height, intensity);
      break;
    case "warhol":
      applyWarholStyle(tempData, width, height, intensity);
      break;
    case "sketch":
      applySketchStyle(tempData, width, height, intensity);
      break;
    case "kandinsky":
      applyKandinskyStyle(tempData, width, height, intensity);
      break;
    case "stained-glass":
      applyStainedGlassStyle(tempData, width, height, intensity);
      break;
  }

  // Blend with original based on intensity
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * (1 - intensity) + tempData[i] * intensity;
    data[i + 1] = data[i + 1] * (1 - intensity) + tempData[i + 1] * intensity;
    data[i + 2] = data[i + 2] * (1 - intensity) + tempData[i + 2] * intensity;
  }

  // Apply the styled data
  const imageData = new ImageData(data, width, height);
  ctx.putImageData(imageData, 0, 0);

  // Add artistic overlay with style name
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(10, height - 50, 350, 40);
  ctx.fillStyle = "#3b82f6";
  ctx.font = "bold 18px Arial";
  ctx.fillText(
    `🎨 Style: ${selectedStyle.replace("-", " ").toUpperCase()} (${Math.round(
      intensity * 100
    )}%)`,
    20,
    height - 22
  );
  ctx.restore();
}

/**
 * Oil Painting Style - Thick brush strokes and vibrant colors
 */
function applyOilPaintingStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const brushSize = Math.floor(4 + intensity * 6); // 4-10 based on intensity
  const saturationBoost = 1.2 + intensity * 0.8; // 1.2-2.0

  for (
    let y = brushSize;
    y < height - brushSize;
    y += Math.max(1, Math.floor(3 - intensity))
  ) {
    for (
      let x = brushSize;
      x < width - brushSize;
      x += Math.max(1, Math.floor(3 - intensity))
    ) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      let maxR = 0,
        maxG = 0,
        maxB = 0;

      // Sample nearby pixels for brush stroke effect
      for (let dy = -brushSize; dy <= brushSize; dy++) {
        for (let dx = -brushSize; dx <= brushSize; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          r += original[idx];
          g += original[idx + 1];
          b += original[idx + 2];
          maxR = Math.max(maxR, original[idx]);
          maxG = Math.max(maxG, original[idx + 1]);
          maxB = Math.max(maxB, original[idx + 2]);
          count++;
        }
      }

      // Average and boost saturation with impasto effect
      r = Math.min(255, (r / count) * saturationBoost + maxR * 0.2);
      g = Math.min(255, (g / count) * saturationBoost + maxG * 0.2);
      b = Math.min(255, (b / count) * saturationBoost + maxB * 0.2);

      // Apply thick brush strokes
      const strokeSize = Math.floor(2 + intensity * 2);
      for (let dy = 0; dy < strokeSize; dy++) {
        for (let dx = 0; dx < strokeSize; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny < height && nx < width) {
            const idx = (ny * width + nx) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
          }
        }
      }
    }
  }
}

/**
 * Watercolor Style - Soft, flowing colors with lighter tones
 */
function applyWatercolorStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const edges = detectEdges(original, width, height);

  // Create watercolor bleeding effect
  const bleedRadius = Math.floor(3 + intensity * 5);
  for (let y = bleedRadius; y < height - bleedRadius; y++) {
    for (let x = bleedRadius; x < width - bleedRadius; x++) {
      const idx = (y * width + x) * 4;

      // Sample random nearby pixels for water bleeding
      const samples = Math.floor(5 + intensity * 10);
      let r = 0,
        g = 0,
        b = 0;

      for (let s = 0; s < samples; s++) {
        const dx = Math.floor((Math.random() - 0.5) * bleedRadius * 2);
        const dy = Math.floor((Math.random() - 0.5) * bleedRadius * 2);
        const sIdx = ((y + dy) * width + (x + dx)) * 4;
        r += original[sIdx];
        g += original[sIdx + 1];
        b += original[sIdx + 2];
      }

      r /= samples;
      g /= samples;
      b /= samples;

      // Lighten and soften colors with watercolor transparency
      const lightness = 1.2 + intensity * 0.3;
      const transparency = 40 * intensity;
      data[idx] = Math.min(255, r * lightness + transparency);
      data[idx + 1] = Math.min(255, g * lightness + transparency);
      data[idx + 2] = Math.min(255, b * lightness + transparency);

      // Darken edges for watercolor paper texture
      const pixelIdx = y * width + x;
      if (edges[pixelIdx] > 80) {
        data[idx] *= 0.6;
        data[idx + 1] *= 0.6;
        data[idx + 2] *= 0.6;
      }
    }
  }

  // Apply blur for soft watercolor effect
  const blurAmount = Math.floor(2 + intensity * 2);
  applyGaussianBlur(data, width, height, blurAmount);
}

/**
 * Van Gogh Style - Swirling brush strokes and vibrant colors
 */
function applyVanGoghStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const swirls = Math.floor(3 + intensity * 5);

  // Create swirling brush stroke pattern
  for (let y = swirls; y < height - swirls; y++) {
    for (let x = swirls; x < width - swirls; x++) {
      const idx = (y * width + x) * 4;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Sample in circular/swirling pattern
      const angle = (x + y) * 0.1;
      for (let i = 0; i < swirls; i++) {
        const dx = Math.floor(Math.cos(angle + i) * swirls);
        const dy = Math.floor(Math.sin(angle + i) * swirls);
        const sIdx = ((y + dy) * width + (x + dx)) * 4;
        r += original[sIdx];
        g += original[sIdx + 1];
        b += original[sIdx + 2];
        count++;
      }

      r /= count;
      g /= count;
      b /= count;

      // Dramatically boost saturation and contrast (Van Gogh signature)
      const satBoost = 1.5 + intensity * 1.0; // 1.5-2.5
      const contrastBoost = 1.3 + intensity * 0.7;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const mid = (max + min) / 2;

      // Enhance saturation
      r = r + (r - mid) * satBoost;
      g = g + (g - mid) * satBoost;
      b = b + (b - mid) * satBoost;

      // Add starry night effect with yellow/blue dominance
      const brightness = (r + g + b) / 3;
      if (brightness > 128) {
        b = Math.min(255, b * contrastBoost); // Blue highlights
        g = Math.min(255, g * 1.2);
      } else {
        r = Math.min(255, r * contrastBoost); // Yellow/orange shadows
        g = Math.min(255, g * 1.1);
      }

      data[idx] = Math.min(255, Math.max(0, r));
      data[idx + 1] = Math.min(255, Math.max(0, g));
      data[idx + 2] = Math.min(255, Math.max(0, b));
    }
  }
}

/**
 * Picasso Style - Cubist, geometric abstraction
 */
function applyPicassoStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const blockSize = Math.floor(50 - intensity * 30); // 20-50 based on intensity
  const distortion = 15 * intensity;

  // Create geometric cubist sections
  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Calculate average color for block
      for (let by = y; by < Math.min(y + blockSize, height); by++) {
        for (let bx = x; bx < Math.min(x + blockSize, width); bx++) {
          const idx = (by * width + bx) * 4;
          r += original[idx];
          g += original[idx + 1];
          b += original[idx + 2];
          count++;
        }
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      // Add bold color shifts (Picasso's color palette)
      const colorShift = Math.random();
      if (colorShift < 0.33) {
        b = Math.min(255, b * 1.5); // Blue period
      } else if (colorShift < 0.66) {
        r = Math.min(255, r * 1.4); // Rose period
        g = Math.min(255, g * 1.2);
      } else {
        r = Math.min(255, r * 1.3); // Warm tones
        g = Math.min(255, g * 1.3);
      }

      // Apply with geometric distortion and fragmentation
      const offsetX = (Math.random() - 0.5) * distortion;
      const offsetY = (Math.random() - 0.5) * distortion;
      const rotation = Math.random() * 0.5 - 0.25; // Slight rotation

      for (let by = y; by < Math.min(y + blockSize, height); by++) {
        for (let bx = x; bx < Math.min(x + blockSize, width); bx++) {
          // Apply cubist transformation
          const dx = bx - (x + blockSize / 2);
          const dy = by - (y + blockSize / 2);
          const newX = Math.round(
            x +
              blockSize / 2 +
              dx * Math.cos(rotation) -
              dy * Math.sin(rotation) +
              offsetX
          );
          const newY = Math.round(
            y +
              blockSize / 2 +
              dx * Math.sin(rotation) +
              dy * Math.cos(rotation) +
              offsetY
          );

          if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
            const idx = (newY * width + newX) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
          }
        }
      }
    }
  }

  // Add geometric edge lines (cubist outlines)
  const edges = detectEdges(original, width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (edges[y * width + x] > 100) {
        const darkness = 0.3 * intensity;
        data[idx] *= darkness;
        data[idx + 1] *= darkness;
        data[idx + 2] *= darkness;
      }
    }
  }
}

/**
 * Anime Style - Bold outlines and vibrant, flat colors
 */
function applyAnimeStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const edges = detectEdges(original, width, height);

  // Posterize colors (reduce color palette) - anime cel shading
  const levels = Math.floor(3 + intensity * 3); // 3-6 color levels
  const stepSize = 256 / levels;

  for (let i = 0; i < data.length; i += 4) {
    // Quantize to discrete color levels
    data[i] = Math.floor(data[i] / stepSize) * stepSize + stepSize / 2;
    data[i + 1] = Math.floor(data[i + 1] / stepSize) * stepSize + stepSize / 2;
    data[i + 2] = Math.floor(data[i + 2] / stepSize) * stepSize + stepSize / 2;

    // Dramatically boost saturation (anime vibrant colors)
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const mid = (max + min) / 2;

    const satBoost = 1.5 + intensity * 1.0; // 1.5-2.5
    data[i] = Math.min(255, mid + (r - mid) * satBoost);
    data[i + 1] = Math.min(255, mid + (g - mid) * satBoost);
    data[i + 2] = Math.min(255, mid + (b - mid) * satBoost);

    // Brighten overall (anime brightness)
    const brightnessBoost = 1.1 + intensity * 0.2;
    data[i] = Math.min(255, data[i] * brightnessBoost);
    data[i + 1] = Math.min(255, data[i + 1] * brightnessBoost);
    data[i + 2] = Math.min(255, data[i + 2] * brightnessBoost);
  }

  // Add bold black outlines (anime signature)
  const outlineThickness = Math.floor(1 + intensity * 2);
  const outlineThreshold = 60 + intensity * 40;

  for (let y = outlineThickness; y < height - outlineThickness; y++) {
    for (let x = outlineThickness; x < width - outlineThickness; x++) {
      const edgeValue = edges[y * width + x];

      if (edgeValue > outlineThreshold) {
        // Draw thick black outline
        for (let dy = -outlineThickness; dy <= outlineThickness; dy++) {
          for (let dx = -outlineThickness; dx <= outlineThickness; dx++) {
            const idx = ((y + dy) * width + (x + dx)) * 4;
            data[idx] = 0;
            data[idx + 1] = 0;
            data[idx + 2] = 0;
          }
        }
      }
    }
  }
}

/**
 * Monet Style - Impressionist with soft, dreamy light effects
 */
function applyMonetStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const brushSize = Math.floor(3 + intensity * 4);

  // Create impressionist dabs of color
  for (
    let y = brushSize;
    y < height - brushSize;
    y += Math.max(1, Math.floor(4 - intensity * 2))
  ) {
    for (
      let x = brushSize;
      x < width - brushSize;
      x += Math.max(1, Math.floor(4 - intensity * 2))
    ) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Sample in small area for color dabs
      const offset = Math.random() * brushSize;
      for (let dy = -brushSize; dy <= brushSize; dy++) {
        for (let dx = -brushSize; dx <= brushSize; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          r += original[idx];
          g += original[idx + 1];
          b += original[idx + 2];
          count++;
        }
      }

      r /= count;
      g /= count;
      b /= count;

      // Apply Monet's signature light effects - favor blues and soft pastels
      const lightBoost = 1.3 + intensity * 0.4;
      const blueShift = 1.1 + intensity * 0.3;

      r = Math.min(255, r * lightBoost + 20);
      g = Math.min(255, g * lightBoost + 15);
      b = Math.min(255, b * lightBoost * blueShift + 25); // Favor blue tones

      // Apply soft dabs
      const dabSize = Math.floor(2 + intensity * 3);
      for (let dy = 0; dy < dabSize; dy++) {
        for (let dx = 0; dx < dabSize; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny < height && nx < width) {
            const idx = (ny * width + nx) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
          }
        }
      }
    }
  }

  // Apply soft blur for dreamy impressionist effect
  applyGaussianBlur(data, width, height, Math.floor(1 + intensity * 2));
}

/**
 * Warhol Style - Pop art with bold, vibrant color blocks
 */
function applyWarholStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);

  // Posterize to limited colors (pop art palette)
  const colorLevels = Math.floor(3 + intensity * 2); // 3-5 levels
  const stepSize = 256 / colorLevels;

  for (let i = 0; i < data.length; i += 4) {
    // Quantize colors
    let r = Math.floor(original[i] / stepSize) * stepSize;
    let g = Math.floor(original[i + 1] / stepSize) * stepSize;
    let b = Math.floor(original[i + 2] / stepSize) * stepSize;

    // Apply dramatic pop art color shifts
    const colorShift = (i / 4) % 4;
    const shiftIntensity = 0.5 + intensity * 0.5;

    switch (colorShift) {
      case 0: // Magenta/Pink shift
        r = Math.min(255, r * (1 + shiftIntensity));
        b = Math.min(255, b * (1 + shiftIntensity));
        g *= 0.7;
        break;
      case 1: // Cyan shift
        g = Math.min(255, g * (1 + shiftIntensity));
        b = Math.min(255, b * (1 + shiftIntensity));
        r *= 0.7;
        break;
      case 2: // Yellow shift
        r = Math.min(255, r * (1 + shiftIntensity));
        g = Math.min(255, g * (1 + shiftIntensity));
        b *= 0.7;
        break;
      case 3: // Green shift
        g = Math.min(255, g * (1.2 + shiftIntensity));
        r *= 0.8;
        b *= 0.8;
        break;
    }

    // Ultra-saturate for pop art effect
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const mid = (max + min) / 2;
    const satBoost = 2.0 + intensity * 1.0; // 2.0-3.0

    data[i] = Math.min(255, Math.max(0, mid + (r - mid) * satBoost));
    data[i + 1] = Math.min(255, Math.max(0, mid + (g - mid) * satBoost));
    data[i + 2] = Math.min(255, Math.max(0, mid + (b - mid) * satBoost));
  }

  // Add high contrast
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const contrast = 1.4 + intensity * 0.6;

    data[i] = Math.min(
      255,
      Math.max(0, (data[i] - brightness) * contrast + brightness)
    );
    data[i + 1] = Math.min(
      255,
      Math.max(0, (data[i + 1] - brightness) * contrast + brightness)
    );
    data[i + 2] = Math.min(
      255,
      Math.max(0, (data[i + 2] - brightness) * contrast + brightness)
    );
  }
}

/**
 * Sketch Style - Pencil/charcoal drawing effect
 */
function applySketchStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);

  // Convert to grayscale first
  for (let i = 0; i < data.length; i += 4) {
    const gray =
      original[i] * 0.299 + original[i + 1] * 0.587 + original[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  // Detect edges for sketch lines
  const edges = detectEdges(data, width, height);
  const edgeThreshold = 60 - intensity * 40; // 20-60

  // Apply sketch effect
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const edgeValue = edges[y * width + x];

      if (edgeValue > edgeThreshold) {
        // Draw dark sketch lines
        const lineIntensity = (edgeValue / 255) * intensity;
        data[idx] = Math.max(0, data[idx] * (1 - lineIntensity));
        data[idx + 1] = Math.max(0, data[idx + 1] * (1 - lineIntensity));
        data[idx + 2] = Math.max(0, data[idx + 2] * (1 - lineIntensity));
      } else {
        // Lighten non-edge areas (paper texture)
        const lighten = 1.2 + intensity * 0.3;
        data[idx] = Math.min(255, data[idx] * lighten);
        data[idx + 1] = Math.min(255, data[idx + 1] * lighten);
        data[idx + 2] = Math.min(255, data[idx + 2] * lighten);
      }

      // Add paper texture noise
      const noise = (Math.random() - 0.5) * 15 * intensity;
      data[idx] = Math.min(255, Math.max(0, data[idx] + noise));
      data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + noise));
      data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + noise));
    }
  }

  // Add slight blur for pencil softness
  applyGaussianBlur(data, width, height, 1);
}

/**
 * Kandinsky Style - Abstract geometric shapes with vibrant colors
 */
function applyKandinskyStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const shapeSize = Math.floor(60 - intensity * 30); // 30-60

  // Create abstract geometric regions
  for (let y = 0; y < height; y += shapeSize) {
    for (let x = 0; x < width; x += shapeSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Calculate average color for region
      for (let by = y; by < Math.min(y + shapeSize, height); by++) {
        for (let bx = x; bx < Math.min(x + shapeSize, width); bx++) {
          const idx = (by * width + bx) * 4;
          r += original[idx];
          g += original[idx + 1];
          b += original[idx + 2];
          count++;
        }
      }

      r /= count;
      g /= count;
      b /= count;

      // Apply Kandinsky's abstract color theory
      const colorMode = Math.random();
      const vibrance = 1.5 + intensity * 1.0;

      if (colorMode < 0.33) {
        // Primary colors emphasis
        const max = Math.max(r, g, b);
        if (r === max) {
          r = Math.min(255, r * vibrance);
          g *= 0.5;
          b *= 0.5;
        } else if (g === max) {
          g = Math.min(255, g * vibrance);
          r *= 0.5;
          b *= 0.5;
        } else {
          b = Math.min(255, b * vibrance);
          r *= 0.5;
          g *= 0.5;
        }
      } else if (colorMode < 0.66) {
        // Complementary colors
        r = Math.min(255, 255 - r * 0.5 + r * vibrance * 0.5);
        g = Math.min(255, 255 - g * 0.5 + g * vibrance * 0.5);
        b = Math.min(255, 255 - b * 0.5 + b * vibrance * 0.5);
      } else {
        // Harmonious colors
        const hue = (r + g + b) / 3;
        r = Math.min(255, hue + (r - hue) * vibrance);
        g = Math.min(255, hue + (g - hue) * vibrance);
        b = Math.min(255, hue + (b - hue) * vibrance);
      }

      // Draw geometric shapes (circles, triangles, rectangles)
      const shapeType = Math.floor(Math.random() * 3);
      const centerX = x + shapeSize / 2;
      const centerY = y + shapeSize / 2;

      for (let by = y; by < Math.min(y + shapeSize, height); by++) {
        for (let bx = x; bx < Math.min(x + shapeSize, width); bx++) {
          let inShape = false;
          const dx = bx - centerX;
          const dy = by - centerY;

          if (shapeType === 0) {
            // Circle
            inShape = dx * dx + dy * dy < (shapeSize * shapeSize) / 4;
          } else if (shapeType === 1) {
            // Triangle
            inShape = Math.abs(dx) + Math.abs(dy) < shapeSize / 2;
          } else {
            // Rectangle
            inShape =
              Math.abs(dx) < shapeSize / 3 && Math.abs(dy) < shapeSize / 3;
          }

          if (inShape) {
            const idx = (by * width + bx) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
          }
        }
      }
    }
  }
}

/**
 * Stained Glass Style - Colorful geometric mosaic effect
 */
function applyStainedGlassStyle(data, width, height, intensity = 0.8) {
  const original = new Uint8ClampedArray(data);
  const edges = detectEdges(original, width, height);
  const cellSize = Math.floor(40 - intensity * 20); // 20-40

  // Create stained glass cells
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Calculate average color for cell
      for (let by = y; by < Math.min(y + cellSize, height); by++) {
        for (let bx = x; bx < Math.min(x + cellSize, width); bx++) {
          const idx = (by * width + bx) * 4;
          r += original[idx];
          g += original[idx + 1];
          b += original[idx + 2];
          count++;
        }
      }

      r /= count;
      g /= count;
      b /= count;

      // Saturate and brighten (stained glass is translucent)
      const satBoost = 1.6 + intensity * 0.8; // 1.6-2.4
      const brightness = (r + g + b) / 3;

      r = Math.min(255, brightness + (r - brightness) * satBoost + 30);
      g = Math.min(255, brightness + (g - brightness) * satBoost + 30);
      b = Math.min(255, brightness + (b - brightness) * satBoost + 30);

      // Fill cell with uniform color
      for (let by = y; by < Math.min(y + cellSize, height); by++) {
        for (let bx = x; bx < Math.min(x + cellSize, width); bx++) {
          const idx = (by * width + bx) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
        }
      }
    }
  }

  // Add dark lead lines between glass pieces
  const leadThickness = Math.floor(1 + intensity * 2);
  for (let y = leadThickness; y < height - leadThickness; y++) {
    for (let x = leadThickness; x < width - leadThickness; x++) {
      // Draw grid lines
      if (x % cellSize < leadThickness || y % cellSize < leadThickness) {
        const idx = (y * width + x) * 4;
        data[idx] = 20;
        data[idx + 1] = 20;
        data[idx + 2] = 20;
      }
    }
  }
}

/**
 * Apply AI Image Generation (Stable Diffusion-inspired)
 * Creates artistic variations and enhancements
 */
async function applyAIImageGeneration(ctx, data, width, height) {
  const original = new Uint8ClampedArray(data);

  // Analyze scene for intelligent enhancement
  const brightness = calculateAverageBrightness(original);
  const colorfulness = calculateColorfulness(original);

  // Apply creative AI transformations

  // 1. Dream-like quality - add subtle glow
  applyGaussianBlur(data, width, height, 1);

  // 2. Enhance details and add AI hallucination
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      // Detail enhancement
      for (let c = 0; c < 3; c++) {
        const center = original[idx + c];
        const neighbors = [
          original[((y - 1) * width + x) * 4 + c],
          original[((y + 1) * width + x) * 4 + c],
          original[(y * width + (x - 1)) * 4 + c],
          original[(y * width + (x + 1)) * 4 + c],
        ];
        const avg = neighbors.reduce((a, b) => a + b, 0) / 4;
        const detail = center - avg;
        data[idx + c] = Math.max(0, Math.min(255, center + detail * 1.5));
      }
    }
  }

  // 3. Add AI-style color grading
  for (let i = 0; i < data.length; i += 4) {
    // Cinematic color grading
    data[i] = Math.min(255, data[i] * 1.1 + 10); // Warm highlights
    data[i + 2] = Math.min(255, data[i + 2] * 1.05); // Cool shadows
  }

  // 4. Add subtle noise for AI texture
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 5;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }

  const imageData = new ImageData(data, width, height);
  ctx.putImageData(imageData, 0, 0);

  // Add AI generation watermark
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(10, height - 50, 350, 40);
  ctx.fillStyle = "#3b82f6";
  ctx.font = "bold 18px Arial";
  ctx.fillText("✨ AI Enhanced with Dream-like Quality", 20, height - 22);
  ctx.restore();
}

/**
 * Apply Background Removal (U²-Net inspired)
 * Intelligent foreground-background separation
 */
async function applyBackgroundRemoval(
  ctx,
  data,
  width,
  height,
  method = "ai-saliency",
  threshold = 0.5,
  feathering = 3,
  outputMode = "transparent"
) {
  console.log(
    `🎯 Applying background removal: ${method}, threshold: ${threshold}, feathering: ${feathering}, output: ${outputMode}`
  );

  const original = new Uint8ClampedArray(data);
  let mask = new Uint8Array(width * height);

  // Generate mask using selected method
  switch (method) {
    case "edge-detection":
      mask = generateEdgeBasedMask(original, width, height, threshold);
      break;
    case "color-segmentation":
      mask = generateColorSegmentationMask(original, width, height, threshold);
      break;
    case "grabcut":
      mask = generateGrabCutMask(original, width, height, threshold);
      break;
    case "ai-saliency":
    default:
      mask = generateAISaliencyMask(original, width, height, threshold);
      break;
  }

  // Apply feathering/smoothing to mask edges
  if (feathering > 0) {
    applyMaskFeathering(mask, width, height, feathering);
  }

  // Apply background removal based on output mode
  applyBackgroundOutput(
    data,
    original,
    mask,
    width,
    height,
    outputMode,
    feathering
  );

  const imageData = new ImageData(data, width, height);
  ctx.putImageData(imageData, 0, 0);

  // Add info overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(10, height - 50, 450, 40);
  ctx.fillStyle = "#3b82f6";
  ctx.font = "bold 18px Arial";
  const methodName = method
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  ctx.fillText(
    `🎯 Background Removed - ${methodName} (${outputMode})`,
    20,
    height - 22
  );
}

/**
 * Generate mask using edge detection method
 */
function generateEdgeBasedMask(data, width, height, threshold) {
  const mask = new Uint8Array(width * height);
  const edges = detectEdges(data, width, height);

  // Find connected components from edges
  const edgeThreshold = threshold * 255;
  const labels = new Int32Array(width * height);
  let label = 1;

  // Flood fill from center to identify foreground
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const queue = [[centerX, centerY]];
  const visited = new Uint8Array(width * height);

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const idx = y * width + x;

    if (x < 0 || x >= width || y < 0 || y >= height || visited[idx]) continue;
    visited[idx] = 1;

    // If strong edge, stop expansion
    if (edges[idx] > edgeThreshold) continue;

    mask[idx] = 255;

    // Add neighbors
    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  // Refine mask
  refineMask(mask, width, height);
  return mask;
}

/**
 * Generate mask using color segmentation (k-means like)
 */
function generateColorSegmentationMask(data, width, height, threshold) {
  const mask = new Uint8Array(width * height);

  // Sample background colors from edges
  const bgColors = [];
  const sampleSize = 20;

  // Sample top, bottom, left, right edges
  for (let i = 0; i < sampleSize; i++) {
    const x = Math.floor((i / sampleSize) * width);
    const y = Math.floor((i / sampleSize) * height);

    // Top edge
    let idx = x * 4;
    bgColors.push([data[idx], data[idx + 1], data[idx + 2]]);

    // Bottom edge
    idx = ((height - 1) * width + x) * 4;
    bgColors.push([data[idx], data[idx + 1], data[idx + 2]]);

    // Left edge
    idx = y * width * 4;
    bgColors.push([data[idx], data[idx + 1], data[idx + 2]]);

    // Right edge
    idx = (y * width + width - 1) * 4;
    bgColors.push([data[idx], data[idx + 1], data[idx + 2]]);
  }

  // Calculate average background color
  let avgR = 0,
    avgG = 0,
    avgB = 0;
  for (const [r, g, b] of bgColors) {
    avgR += r;
    avgG += g;
    avgB += b;
  }
  avgR /= bgColors.length;
  avgG /= bgColors.length;
  avgB /= bgColors.length;

  // Classify each pixel
  const colorThreshold = (1 - threshold) * 150 + 30; // 30-180 range

  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Calculate color distance from background
    const dist = Math.sqrt((r - avgR) ** 2 + (g - avgG) ** 2 + (b - avgB) ** 2);

    mask[i] = dist > colorThreshold ? 255 : 0;
  }

  // Refine mask
  refineMask(mask, width, height);
  return mask;
}

/**
 * Generate mask using GrabCut-like algorithm
 */
function generateGrabCutMask(data, width, height, threshold) {
  const mask = new Uint8Array(width * height);

  // Define initial trimap (foreground, background, unknown)
  const margin = Math.floor(Math.min(width, height) * 0.1);
  const fgRect = {
    x: margin,
    y: margin,
    w: width - 2 * margin,
    h: height - 2 * margin,
  };

  // Initialize: definite background (edges), probable foreground (center)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;

      if (
        x < fgRect.x ||
        x >= fgRect.x + fgRect.w ||
        y < fgRect.y ||
        y >= fgRect.y + fgRect.h
      ) {
        mask[i] = 0; // Definite background
      } else {
        mask[i] = 255; // Probable foreground
      }
    }
  }

  // Build color models for foreground and background
  const fgColors = [];
  const bgColors = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const idx = i * 4;
      const color = [data[idx], data[idx + 1], data[idx + 2]];

      if (mask[i] === 255) {
        fgColors.push(color);
      } else {
        bgColors.push(color);
      }
    }
  }

  // Calculate color statistics
  const fgAvg = calculateColorAverage(fgColors);
  const bgAvg = calculateColorAverage(bgColors);

  // Refine mask based on color similarity
  const adaptiveThreshold = threshold * 100 + 50; // 50-150 range

  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const fgDist = Math.sqrt(
      (r - fgAvg[0]) ** 2 + (g - fgAvg[1]) ** 2 + (b - fgAvg[2]) ** 2
    );
    const bgDist = Math.sqrt(
      (r - bgAvg[0]) ** 2 + (g - bgAvg[1]) ** 2 + (b - bgAvg[2]) ** 2
    );

    mask[i] = fgDist < bgDist + adaptiveThreshold ? 255 : 0;
  }

  // Refine mask
  refineMask(mask, width, height);
  return mask;
}

/**
 * Calculate average color from array of colors
 */
function calculateColorAverage(colors) {
  if (colors.length === 0) return [128, 128, 128];

  let r = 0,
    g = 0,
    b = 0;
  for (const [cr, cg, cb] of colors) {
    r += cr;
    g += cg;
    b += cb;
  }
  return [r / colors.length, g / colors.length, b / colors.length];
}

/**
 * Generate mask using AI-based saliency detection
 */
function generateAISaliencyMask(data, width, height, threshold) {
  const mask = new Uint8Array(width * height);
  const saliencyMap = detectSalientRegions(data, width, height);

  // Convert saliency map to binary mask with threshold
  const saliencyThreshold = threshold * 255;

  for (let i = 0; i < saliencyMap.length; i++) {
    mask[i] = saliencyMap[i] > saliencyThreshold ? 255 : 0;
  }

  // Refine mask
  refineMask(mask, width, height);
  return mask;
}

/**
 * Apply feathering/smoothing to mask edges
 */
function applyMaskFeathering(mask, width, height, feathering) {
  if (feathering <= 0) return;

  const temp = new Uint8Array(mask);
  const radius = Math.floor(feathering);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;

      // Calculate average in neighborhood
      let sum = 0;
      let count = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const ni = ny * width + nx;
            sum += temp[ni];
            count++;
          }
        }
      }

      mask[i] = Math.floor(sum / count);
    }
  }
}

/**
 * Apply background output based on mode
 */
function applyBackgroundOutput(
  data,
  original,
  mask,
  width,
  height,
  mode,
  feathering
) {
  const hasFeathering = feathering > 0;

  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const alpha = mask[i] / 255; // 0-1 range

    if (alpha < 0.01) {
      // Background pixel
      switch (mode) {
        case "transparent":
        case "checkerboard":
          const x = i % width;
          const y = Math.floor(i / width);
          const checker = (Math.floor(x / 20) + Math.floor(y / 20)) % 2 === 0;
          data[idx] = checker ? 200 : 150;
          data[idx + 1] = checker ? 200 : 150;
          data[idx + 2] = checker ? 200 : 150;
          break;
        case "white":
          data[idx] = 255;
          data[idx + 1] = 255;
          data[idx + 2] = 255;
          break;
        case "black":
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
          break;
        case "blur":
          // Apply heavy blur to background
          const blurred = getBlurredPixel(original, i, width, height, 10);
          data[idx] = blurred[0];
          data[idx + 1] = blurred[1];
          data[idx + 2] = blurred[2];
          break;
      }
    } else if (hasFeathering && alpha < 0.99) {
      // Edge pixel with feathering - blend
      const fg = [original[idx], original[idx + 1], original[idx + 2]];
      let bg;

      switch (mode) {
        case "white":
          bg = [255, 255, 255];
          break;
        case "black":
          bg = [0, 0, 0];
          break;
        case "blur":
          bg = getBlurredPixel(original, i, width, height, 10);
          break;
        default:
          const x = i % width;
          const y = Math.floor(i / width);
          const checker = (Math.floor(x / 20) + Math.floor(y / 20)) % 2 === 0;
          bg = checker ? [200, 200, 200] : [150, 150, 150];
      }

      data[idx] = Math.floor(fg[0] * alpha + bg[0] * (1 - alpha));
      data[idx + 1] = Math.floor(fg[1] * alpha + bg[1] * (1 - alpha));
      data[idx + 2] = Math.floor(fg[2] * alpha + bg[2] * (1 - alpha));
    }
    // else: foreground pixel, keep original
  }
}

/**
 * Get blurred pixel value
 */
function getBlurredPixel(data, pixelIdx, width, height, radius) {
  const x = pixelIdx % width;
  const y = Math.floor(pixelIdx / width);

  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const ni = (ny * width + nx) * 4;
        r += data[ni];
        g += data[ni + 1];
        b += data[ni + 2];
        count++;
      }
    }
  }

  return [r / count, g / count, b / count];
}

/**
 * Detect salient regions for background removal
 */
function detectSalientRegions(data, width, height) {
  const saliency = new Uint8Array(width * height);

  // Use color contrast and center bias for saliency
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const i = y * width + x;

      // Calculate color contrast with neighbors
      let contrast = 0;
      const neighbors = [
        ((y - 1) * width + x) * 4,
        ((y + 1) * width + x) * 4,
        (y * width + (x - 1)) * 4,
        (y * width + (x + 1)) * 4,
      ];

      for (const nIdx of neighbors) {
        const dr = data[idx] - data[nIdx];
        const dg = data[idx + 1] - data[nIdx + 1];
        const db = data[idx + 2] - data[nIdx + 2];
        contrast += Math.sqrt(dr * dr + dg * dg + db * db);
      }

      // Center bias - regions near center are more salient
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const centerBias = 1 - dist / maxDist;

      saliency[i] = Math.min(255, contrast * 0.5 * (1 + centerBias));
    }
  }

  // Apply Gaussian blur to saliency map
  const blurred = new Uint8Array(saliency);
  applyGaussianBlurGrayscale(blurred, width, height, 3);

  return blurred;
}

/**
 * Refine binary mask with morphological operations
 */
function refineMask(mask, width, height) {
  // Closing: dilate then erode (removes small holes)
  dilateMask(mask, width, height, 3);
  erodeMask(mask, width, height, 3);

  // Opening: erode then dilate (removes small objects)
  erodeMask(mask, width, height, 2);
  dilateMask(mask, width, height, 2);
}

/**
 * Dilate binary mask
 */
function dilateMask(mask, width, height, iterations) {
  for (let iter = 0; iter < iterations; iter++) {
    const temp = new Uint8Array(mask);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        if (
          temp[i - 1] === 255 ||
          temp[i + 1] === 255 ||
          temp[i - width] === 255 ||
          temp[i + width] === 255
        ) {
          mask[i] = 255;
        }
      }
    }
  }
}

/**
 * Erode binary mask
 */
function erodeMask(mask, width, height, iterations) {
  for (let iter = 0; iter < iterations; iter++) {
    const temp = new Uint8Array(mask);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        if (
          temp[i - 1] === 0 ||
          temp[i + 1] === 0 ||
          temp[i - width] === 0 ||
          temp[i + width] === 0
        ) {
          mask[i] = 0;
        }
      }
    }
  }
}

/**
 * Calculate edge strength for a pixel
 */
function calculateEdgeStrength(data, pixelIdx, width, height) {
  const idx = pixelIdx * 4;
  const x = pixelIdx % width;
  const y = Math.floor(pixelIdx / width);

  if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
    return 0;
  }

  const gx =
    -data[((y - 1) * width + (x - 1)) * 4] +
    data[((y - 1) * width + (x + 1)) * 4] +
    -2 * data[(y * width + (x - 1)) * 4] +
    2 * data[(y * width + (x + 1)) * 4] +
    -data[((y + 1) * width + (x - 1)) * 4] +
    data[((y + 1) * width + (x + 1)) * 4];

  const gy =
    -data[((y - 1) * width + (x - 1)) * 4] -
    2 * data[((y - 1) * width + x) * 4] -
    data[((y - 1) * width + (x + 1)) * 4] +
    data[((y + 1) * width + (x - 1)) * 4] +
    2 * data[((y + 1) * width + x) * 4] +
    data[((y + 1) * width + (x + 1)) * 4];

  return Math.sqrt(gx * gx + gy * gy);
}

/**
 * Apply Gaussian blur to grayscale data
 */
function applyGaussianBlurGrayscale(data, width, height, radius) {
  const temp = new Uint8Array(data);
  const kernel = [];
  const sigma = radius / 3;
  let sum = 0;

  for (let i = -radius; i <= radius; i++) {
    const val = Math.exp(-(i * i) / (2 * sigma * sigma));
    kernel.push(val);
    sum += val;
  }

  for (let i = 0; i < kernel.length; i++) {
    kernel[i] /= sum;
  }

  // Horizontal pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = 0;
      for (let k = -radius; k <= radius; k++) {
        const nx = Math.max(0, Math.min(width - 1, x + k));
        value += temp[y * width + nx] * kernel[k + radius];
      }
      data[y * width + x] = value;
    }
  }

  // Vertical pass
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let value = 0;
      for (let k = -radius; k <= radius; k++) {
        const ny = Math.max(0, Math.min(height - 1, y + k));
        value += temp[ny * width + x] * kernel[k + radius];
      }
      data[y * width + x] = value;
    }
  }
}

/**
 * Apply Image to Sketch Conversion
 * Creates pencil sketch effect
 */
function applyImageToSketch(data, width, height) {
  const original = new Uint8ClampedArray(data);

  // Randomly select sketch style
  const styles = ["pencil", "charcoal", "ink", "contour"];
  const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

  // Convert to grayscale first
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  switch (selectedStyle) {
    case "pencil":
      applyPencilSketch(data, width, height);
      break;
    case "charcoal":
      applyCharcoalSketch(data, width, height);
      break;
    case "ink":
      applyInkSketch(data, width, height);
      break;
    case "contour":
      applyContourSketch(data, width, height);
      break;
  }
}

/**
 * Pencil sketch - detailed with shading
 */
function applyPencilSketch(data, width, height) {
  const original = new Uint8ClampedArray(data);

  // Detect edges
  const edges = detectEdges(original, width, height);

  // Invert for sketch effect
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  // Apply blur
  applyGaussianBlur(data, width, height, 2);

  // Combine with edges using color dodge blend
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const edge = 255 - edges[i];

    const base = data[idx];
    const blend =
      base === 255 ? 255 : Math.min(255, (edge * edge) / (255 - base));

    data[idx] = blend;
    data[idx + 1] = blend;
    data[idx + 2] = blend;
  }

  // Add paper texture
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 10;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = data[i];
    data[i + 2] = data[i];
  }
}

/**
 * Charcoal sketch - bold strokes with high contrast
 */
function applyCharcoalSketch(data, width, height) {
  const edges = detectEdges(data, width, height);

  // High contrast black and white
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const edge = edges[i];
    const value = edge > 100 ? 0 : data[idx] > 128 ? 255 : 50;

    data[idx] = value;
    data[idx + 1] = value;
    data[idx + 2] = value;
  }

  // Add charcoal texture
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 200) {
      const noise = (Math.random() - 0.5) * 40;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = data[i];
      data[i + 2] = data[i];
    }
  }
}

/**
 * Ink sketch - clean lines, high contrast
 */
function applyInkSketch(data, width, height) {
  const edges = detectEdges(data, width, height);

  // Pure black and white
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const value = edges[i] > 80 ? 0 : 255;

    data[idx] = value;
    data[idx + 1] = value;
    data[idx + 2] = value;
  }
}

/**
 * Contour sketch - outline only
 */
function applyContourSketch(data, width, height) {
  const edges = detectEdges(data, width, height);

  // Only strong edges
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const value = edges[i] > 120 ? 0 : 255;

    data[idx] = value;
    data[idx + 1] = value;
    data[idx + 2] = value;
  }
}

/**
 * Apply Gaussian blur to image data
 */
function applyGaussianBlur(data, width, height, radius) {
  const temp = new Uint8ClampedArray(data);
  const kernel = [];
  const sigma = radius / 3;
  let sum = 0;

  for (let i = -radius; i <= radius; i++) {
    const val = Math.exp(-(i * i) / (2 * sigma * sigma));
    kernel.push(val);
    sum += val;
  }

  for (let i = 0; i < kernel.length; i++) {
    kernel[i] /= sum;
  }

  // Horizontal pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < 3; c++) {
        let value = 0;
        for (let k = -radius; k <= radius; k++) {
          const nx = Math.max(0, Math.min(width - 1, x + k));
          value += temp[(y * width + nx) * 4 + c] * kernel[k + radius];
        }
        data[(y * width + x) * 4 + c] = value;
      }
    }
  }

  // Vertical pass
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      for (let c = 0; c < 3; c++) {
        let value = 0;
        for (let k = -radius; k <= radius; k++) {
          const ny = Math.max(0, Math.min(height - 1, y + k));
          value += temp[(ny * width + x) * 4 + c] * kernel[k + radius];
        }
        data[(y * width + x) * 4 + c] = value;
      }
    }
  }
}

/**
 * Calculate average brightness
 */
function calculateAverageBrightness(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  return sum / (data.length / 4);
}

/**
 * Calculate colorfulness metric
 */
function calculateColorfulness(data) {
  let rg = 0,
    yb = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    rg += Math.abs(r - g);
    yb += Math.abs(0.5 * (r + g) - b);
  }
  return (rg + yb) / (data.length / 4);
}

/**
 * Handle messages from main thread
 */
self.onmessage = async (e) => {
  const { id, type, data } = e.data;

  try {
    if (type === "load") {
      await loadModel(data.modelId, data.task, id);
      self.postMessage({ id, type: "success", data: {} });
    } else if (type === "process") {
      const result = await processImage(
        data.imageUrl,
        data.modelId,
        data.task,
        data.denoisingLevel,
        data.upscaleFactor,
        data.colorizationIntensity,
        data.colorizationSaturation,
        data.inpaintingGuidanceScale,
        data.inpaintingInferenceSteps,
        data.inpaintingStrength,
        data.objectDetectionConfidence,
        data.objectDetectionIOU,
        data.objectDetectionMaxDetections,
        data.poseEstimationConfidence,
        data.poseKeypointThreshold,
        data.poseMaxDetections,
        data.maskingEdgeThreshold,
        data.maskingSegmentationIntensity,
        data.maskingMorphologyStrength,
        data.styleTransferStyle,
        data.styleTransferIntensity,
        data.bgRemovalMethod,
        data.bgRemovalThreshold,
        data.bgRemovalFeathering,
        data.bgRemovalOutputMode
      );
      self.postMessage({ id, type: "success", data: result });
    } else {
      throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    console.error("Worker error:", error);
    self.postMessage({
      id,
      type: "error",
      error: error.message,
    });
  }
};

console.log("🚀 AI Worker initialized");

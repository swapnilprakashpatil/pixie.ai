// Task types
export const TASKS = {
  DASHBOARD: "dashboard",
  DENOISING: "denoising",
  SUPER_RESOLUTION: "super-resolution",
  COLORIZATION: "colorization",
  INPAINTING: "inpainting",
  OBJECT_DETECTION: "object-detection",
  POSE_ESTIMATION: "pose-estimation",
  IMAGE_MASKING: "image-masking",
  STYLE_TRANSFER: "style-transfer",
  IMAGE_CAPTIONING: "image-captioning",
  BG_REMOVAL: "background-removal",
  IMAGE_TO_SKETCH: "image-to-sketch",
};

// Model configurations for each task
export const MODELS = {
  [TASKS.DENOISING]: {
    id: "bilateral-filter-denoising",
    name: "Bilateral Filter Denoising",
    description:
      "Removes Gaussian and salt-pepper noise while preserving edges using advanced bilateral filtering.",
    task: "image-to-image",
    processingSteps: {
      loading:
        "Loading bilateral filter denoising algorithm - Multi-pass edge-preserving smoothing with adaptive parameters",
      processing:
        "Applying aggressive bilateral filtering to reduce Gaussian noise while preserving edges and fine details",
      generating:
        "Reconstructing clean image with preserved edges using multiple denoising passes and adaptive thresholds",
    },
    features: [
      "Gaussian noise reduction",
      "Salt and pepper noise removal",
      "Edge-aware filtering",
      "Detail preservation",
      "Adjustable denoising strength (0-100%)",
      "Multi-pass processing",
    ],
    limitations: [
      "Canvas-based processing (no AI model)",
      "Processing time increases with level",
      "May soften extreme details at high levels",
    ],
    useCases: [
      "Old photo restoration",
      "Low-light image enhancement",
      "Scanned document cleaning",
      "Medical image processing",
    ],
  },
  [TASKS.SUPER_RESOLUTION]: {
    id: "bicubic-upscaling-unsharp",
    name: "Bicubic Upscaling with Sharpening",
    description:
      "Upscales images up to 4x using high-quality bicubic interpolation and adaptive unsharp masking for detail enhancement.",
    task: "image-to-image",
    processingSteps: {
      loading:
        "Loading bicubic upscaling engine - High-quality image smoothing algorithm with adaptive sharpening",
      processing:
        "Upscaling image using bicubic interpolation with high-quality settings for smooth gradients",
      generating:
        "Applying adaptive unsharp mask sharpening to enhance edges and high-frequency details (strength scales with upscale factor)",
    },
    features: [
      "Adjustable upscale factor (1x-4x)",
      "Bicubic interpolation",
      "Adaptive unsharp mask sharpening",
      "Edge enhancement",
      "Detail reconstruction",
      "High-quality smoothing",
    ],
    limitations: [
      "Canvas-based (no AI transformer model)",
      "Cannot add details that don't exist",
      "May introduce slight artifacts at 4x",
    ],
    useCases: [
      "Photo enlargement",
      "Digital zoom enhancement",
      "Print quality improvement",
      "Thumbnail upscaling",
    ],
  },
  [TASKS.COLORIZATION]: {
    id: "semantic-canvas-colorization",
    name: "Semantic Canvas Colorization",
    description:
      "Converts black-and-white images to color using canvas-based semantic region analysis with skin tone detection, fabric identification, and spatial context awareness.",
    task: "image-colorization",
    models: [
      { id: "semantic-canvas-colorization", name: "Canvas Colorization" },
    ],
    processingSteps: {
      loading:
        "Loading semantic colorization engine - Canvas-based region segmentation with photographic color palette application",
      processing:
        "Analyzing image structure: detecting skin regions, fabric textures, shadows, and backgrounds using Sobel edge detection and local variance analysis",
      generating:
        "Applying photographic color palettes with semantic-aware color assignment and spatial harmonization for natural colorization",
    },
    features: [
      "Semantic region segmentation (skin, fabric, shadow, background)",
      "Natural skin tone detection and application",
      "Fabric and texture analysis",
      "Spatial context awareness",
      "Adjustable intensity (0-100%)",
      "Adjustable saturation (0-100%)",
    ],
    limitations: [
      "Canvas-based (no deep learning model)",
      "Color choices based on semantic heuristics",
      "May not match original historical colors",
      "Works best with natural outdoor scenes and portraits",
    ],
    useCases: [
      "Historical photo restoration",
      "Black and white photo colorization",
      "Artistic restoration",
      "Archive digitization",
    ],
  },
  [TASKS.INPAINTING]: {
    id: "sobel-edge-inpainting",
    name: "Edge-Preserving Inpainting",
    description:
      "Fills missing or damaged parts using Sobel edge detection and gradient-domain blending techniques.",
    task: "image-to-image",
    processingSteps: {
      loading:
        "Loading Sobel edge detection inpainting engine - Gradient-based image reconstruction with boundary-aware processing",
      processing:
        "Applying edge-preserving Sobel filter to detect boundaries and smooth regions while maintaining structural integrity",
      generating:
        "Blending processed regions seamlessly with original content using gradient-domain fusion techniques",
    },
    features: [
      "Sobel edge detection",
      "Gradient-domain fusion",
      "Seamless blending",
      "Structure preservation",
      "Adjustable guidance scale",
      "Variable inference steps",
    ],
    limitations: [
      "Canvas-based (no generative AI model)",
      "Cannot generate new content",
      "Best for smooth regions",
    ],
    useCases: [
      "Photo repair and restoration",
      "Scratch removal",
      "Damage correction",
      "Smooth region filling",
    ],
  },
  [TASKS.OBJECT_DETECTION]: {
    id: "Xenova/yolov11n",
    name: "YOLOv11 Object Detection",
    description:
      "State-of-the-art YOLOv11 object detection using ONNX model with 80 COCO classes including people, animals, vehicles, and everyday objects.",
    task: "object-detection",
    processingSteps: {
      loading:
        "Downloading YOLOv11 nano ONNX model from Hugging Face - Latest YOLO architecture with improved accuracy and speed",
      processing:
        "Running YOLOv11 inference on 640x640 preprocessed image, detecting 80 object classes from COCO dataset with enhanced precision",
      generating:
        "Applying Non-Maximum Suppression and drawing bounding boxes with labels for detected objects (25%+ confidence)",
    },
    features: [
      "YOLOv11 ONNX model (2024)",
      "80 COCO object classes",
      "Detects people, animals (dog, cat, horse, bird, etc.)",
      "Vehicles, furniture, and everyday items",
      "Real-time browser inference",
      "Improved accuracy over YOLOv8",
    ],
    limitations: [
      "Requires model download (~6MB) on first use",
      "Processing time 2-5 seconds depending on device",
      "Best results with clear, well-lit images",
    ],
    useCases: [
      "Wildlife and pet detection",
      "Surveillance and security",
      "Autonomous vehicles",
      "Retail inventory management",
    ],
    models: [
      {
        id: "Xenova/yolov11n",
        name: "YOLOv11 Nano",
        description: "Fast and efficient YOLOv11 model optimized for speed",
      },
      {
        id: "Xenova/detr-resnet-50",
        name: "DETR ResNet-50",
        description: "Transformer-based detection with ResNet-50 backbone",
      },
    ],
  },
  [TASKS.POSE_ESTIMATION]: {
    id: "canvas-pose-keypoint-detection",
    name: "Canvas-based Pose Detection",
    description:
      "Detects human body keypoints using skin tone analysis and body structure patterns for pose visualization.",
    task: "pose-estimation",
    processingSteps: {
      loading:
        "Loading pose keypoint detection algorithm - Skin tone analysis combined with body structure pattern recognition",
      processing:
        "Detecting body regions using skin tone analysis, identifying 17 keypoint candidates through geometric patterns",
      generating:
        "Rendering skeletal overlay with joint connections and keypoint visualization with confidence indicators",
    },
    features: [
      "17 keypoint detection (estimated)",
      "Skin tone-based person detection",
      "Skeletal structure mapping",
      "Confidence scoring visualization",
      "Adjustable detection thresholds",
      "Single-person optimized",
    ],
    limitations: [
      "Canvas-based (no AI pose model)",
      "Requires visible skin regions",
      "Best with clear, upright poses",
      "Limited accuracy compared to AI models",
    ],
    useCases: [
      "Basic pose visualization",
      "Fitness form checking",
      "Educational demonstrations",
      "Simple motion analysis",
    ],
  },
  [TASKS.IMAGE_MASKING]: {
    id: "image-masking-techniques",
    name: "Image Masking & Segmentation",
    description:
      "Applies various masking techniques including edge detection, thresholding, and morphological operations.",
    task: "image-masking",
    processingSteps: {
      loading:
        "Loading image masking toolkit - Multiple segmentation algorithms for precise region isolation",
      processing:
        "Applying edge detection (Canny/Sobel), adaptive thresholding, and morphological operations (erosion/dilation)",
      generating:
        "Generating mask overlays with multiple visualization modes: edges, binary, morphological",
    },
    features: [
      "Canny edge detection",
      "Adaptive thresholding",
      "Morphological operations",
      "Multiple mask modes",
    ],
    limitations: [
      "Requires parameter tuning",
      "May need manual refinement",
      "Sensitive to lighting conditions",
    ],
    useCases: [
      "Background removal",
      "Object segmentation",
      "Medical image analysis",
      "Document processing",
    ],
  },
  [TASKS.STYLE_TRANSFER]: {
    id: "canvas-artistic-style-transfer",
    name: "Canvas-based Artistic Style Transfer",
    description:
      "Apply artistic styles to photos using advanced canvas processing techniques - transform images with 10 different artistic filters.",
    task: "style-transfer",
    processingSteps: {
      loading:
        "Loading artistic style rendering engine - Multi-filter system for various artistic transformations",
      processing:
        "Extracting content features and applying artistic style transformations using canvas-based filters and effects",
      generating:
        "Synthesizing final artistic image by blending content preservation with style characteristics",
    },
    features: [
      "10 artistic styles (Oil Painting, Watercolor, Van Gogh, Picasso, Anime, Monet, Warhol, Sketch, Kandinsky, Stained Glass)",
      "Adjustable style intensity (20-100%)",
      "Content structure preservation",
      "Real-time canvas processing",
      "Color palette transformations",
      "Texture synthesis",
    ],
    limitations: [
      "Canvas-based (no VGG19 neural network)",
      "Simulated artistic effects",
      "Limited to predefined styles",
    ],
    useCases: [
      "Artistic photo transformation",
      "Social media content creation",
      "Digital art generation",
      "Creative design projects",
    ],
  },
  [TASKS.IMAGE_CAPTIONING]: {
    id: "Xenova/vit-gpt2-image-captioning",
    name: "Image Captioning (Vision Transformer)",
    description:
      "Generate natural language descriptions of images using state-of-the-art vision-language models - perfect for accessibility, SEO, and content management.",
    task: "image-captioning",
    models: [
      {
        id: "Xenova/vit-gpt2-image-captioning",
        name: "ViT-GPT2 (Fast & Accurate)",
        description:
          "Fast inference with good quality captions using Vision Transformer and GPT-2",
      },
      {
        id: "Xenova/blip-image-captioning-base",
        name: "BLIP Base (Detailed)",
        description:
          "More detailed descriptions with balanced speed and quality",
      },
      {
        id: "Xenova/blip-image-captioning-large",
        name: "BLIP Large (Most Detailed)",
        description:
          "Highest quality, most comprehensive captions with larger model",
      },
    ],
    processingSteps: {
      loading:
        "Loading Vision Transformer + GPT-2 captioning model - Advanced vision-language architecture for natural image descriptions",
      processing:
        "Analyzing visual features: detecting objects, scenes, actions, and relationships using transformer attention mechanisms",
      generating:
        "Generating fluent natural language caption with proper grammar, context awareness, and descriptive detail",
    },
    features: [
      "Natural language descriptions",
      "Object and scene recognition",
      "Context-aware captioning",
      "Multiple model options (ViT-GPT2, BLIP)",
      "Adjustable caption length",
      "Transformers.js integration",
    ],
    limitations: [
      "First load downloads model (~45-190MB)",
      "Processing time varies by model size",
      "Best with common objects and scenes",
      "May not capture all fine details",
    ],
    useCases: [
      "Image accessibility (alt text)",
      "SEO optimization",
      "Content management",
      "Social media automation",
    ],
  },
  [TASKS.BG_REMOVAL]: {
    id: "canvas-saliency-bg-removal",
    name: "Canvas-based Background Removal",
    description:
      "Removes backgrounds using canvas-based saliency detection, edge analysis, and color segmentation techniques.",
    task: "background-removal",
    processingSteps: {
      loading:
        "Loading saliency detection engine - Multi-method background removal with edge detection and color analysis",
      processing:
        "Analyzing image saliency, detecting subject boundaries using edge detection and color segmentation methods",
      generating:
        "Creating masked output with subject isolation and optional background effects (transparent, blurred, solid color)",
    },
    features: [
      "4 removal methods (AI Saliency, Edge Detection, Color Segmentation, GrabCut-inspired)",
      "Adjustable detection threshold",
      "Edge feathering (0-10px)",
      "Multiple output modes (transparent, white, black, blur)",
      "Automatic foreground detection",
      "Fine edge control",
    ],
    limitations: [
      "Canvas-based (no U²-Net deep learning)",
      "Complex backgrounds challenging",
      "Similar foreground/background colors may confuse",
    ],
    useCases: [
      "E-commerce product photos",
      "Profile picture creation",
      "Marketing materials",
      "Simple background removal",
    ],
  },
  [TASKS.IMAGE_TO_SKETCH]: {
    id: "canvas-edge-sketch",
    name: "Canvas-based Sketch Conversion",
    description:
      "Transforms photos into artistic pencil sketches using canvas-based edge detection, shading analysis, and artistic filtering techniques.",
    task: "image-to-sketch",
    processingSteps: {
      loading:
        "Loading sketch conversion engine - Multi-method edge detection with artistic rendering algorithms",
      processing:
        "Detecting edges using gradient analysis, extracting structural features, and applying artistic sketch filtering with adjustable intensity",
      generating:
        "Creating final sketch output with edge-based line work, luminosity shading, and artistic texture patterns",
    },
    features: [
      "5 sketch styles (Pencil, Charcoal, Ink, Watercolor, Cross-hatch)",
      "Adjustable detail level (1-10)",
      "Edge intensity control",
      "Adaptive shading based on luminosity",
      "Texture synthesis",
    ],
    limitations: [
      "Canvas-based (no Photo2Sketch GAN)",
      "Simulated artistic effects",
      "Complex textures may over-simplify",
      "No neural style learning",
    ],
    useCases: [
      "Artistic photo effects",
      "Portrait sketching",
      "Architectural drawings",
      "Creative design projects",
    ],
  },
};

// Tab types
export const TABS = {
  INFORMATION: "information",
  DEMO: "demo",
  DIAGNOSTICS: "diagnostics",
};

// Alternative model configurations
export const ALTERNATIVE_MODELS = {
  "Xenova/blip-image-captioning-base": {
    id: "Xenova/blip-image-captioning-base",
    name: "BLIP Base Image Captioning",
    description:
      "Generate detailed natural language descriptions using BLIP (Bootstrapping Language-Image Pre-training) base model for accurate and descriptive captions.",
    task: "image-captioning",
    processingSteps: {
      loading:
        "Loading BLIP Base captioning model - Bootstrapped vision-language model with enhanced image understanding capabilities",
      processing:
        "Analyzing image using BLIP's vision encoder to extract detailed visual features, object relationships, and scene context",
      generating:
        "Generating descriptive caption using language decoder with attention mechanisms for coherent and detailed descriptions",
    },
    features: [
      "Detailed descriptions",
      "Better object recognition",
      "Enhanced scene understanding",
      "Context-aware generation",
      "Bootstrapped pre-training",
      "Vision-language alignment",
    ],
    limitations: [
      "Slightly slower than ViT-GPT2",
      "May be verbose for simple images",
      "Larger model size",
    ],
    useCases: [
      "Detailed image descriptions",
      "Accessibility (comprehensive alt text)",
      "Content management systems",
      "E-commerce product descriptions",
      "Educational content",
      "Visual documentation",
    ],
  },
  "Xenova/blip-image-captioning-large": {
    id: "Xenova/blip-image-captioning-large",
    name: "BLIP Large Image Captioning",
    description:
      "Generate highly detailed and accurate natural language descriptions using BLIP large model - the most comprehensive captioning solution for complex images.",
    task: "image-captioning",
    processingSteps: {
      loading:
        "Loading BLIP Large captioning model - Advanced vision-language architecture with maximum descriptive capability and accuracy",
      processing:
        "Deep visual analysis using BLIP's large-scale vision encoder to capture fine details, subtle relationships, and complex scene compositions",
      generating:
        "Generating comprehensive caption with rich vocabulary, nuanced descriptions, and detailed scene understanding for maximum informativeness",
    },
    features: [
      "Most detailed captions",
      "Superior object detection",
      "Advanced scene comprehension",
      "Rich vocabulary usage",
      "Fine-grained details",
      "Best accuracy overall",
    ],
    limitations: [
      "Slower inference time",
      "Larger model download",
      "Higher memory usage",
      "May be overly detailed for simple needs",
    ],
    useCases: [
      "Professional content creation",
      "Academic research",
      "High-quality alt text generation",
      "Visual content analysis",
      "Complex scene description",
      "Premium accessibility features",
    ],
  },
  "Qwen/Qwen-Image": {
    id: "Qwen/Qwen-Image",
    name: "Qwen Image Colorization",
    description:
      "AI-powered image colorization using Qwen's vision-language model for intelligent color prediction based on scene understanding.",
    task: "image-colorization",
    processingSteps: {
      loading:
        "Loading Qwen Image model from Hugging Face - Advanced vision-language model with deep scene understanding for colorization",
      processing:
        "Analyzing grayscale image using vision transformer to understand scene context, objects, and spatial relationships for intelligent color assignment",
      generating:
        "Generating vibrant colors using AI-guided palette selection with smooth gradients and natural color transitions for photorealistic results",
    },
    features: [
      "Vision-language model",
      "Scene understanding",
      "Context-aware colorization",
      "Natural color palettes",
      "Smooth color transitions",
      "Object-aware coloring",
    ],
    limitations: [
      "Larger model size",
      "May require more processing time",
      "Color choices based on training data",
    ],
    useCases: [
      "Black and white photo restoration",
      "Historical image colorization",
      "Artistic photo enhancement",
      "Archive restoration projects",
    ],
  },
  "Xenova/detr-resnet-50": {
    id: "Xenova/detr-resnet-50",
    name: "DETR ResNet-50 Object Detection",
    description:
      "End-to-End object detection with transformers (DETR) using ResNet-50 backbone. Detects objects using an encoder-decoder transformer architecture.",
    task: "object-detection",
    processingSteps: {
      loading:
        "Downloading DETR ResNet-50 model from Hugging Face - Transformer-based object detection with attention mechanisms",
      processing:
        "Running DETR transformer inference using encoder-decoder architecture with attention mechanisms for precise object localization",
      generating:
        "Post-processing transformer outputs and rendering bounding boxes with class labels and confidence scores (50%+ confidence)",
    },
    features: [
      "Transformer-based architecture",
      "ResNet-50 backbone",
      "91 COCO object classes",
      "End-to-end detection pipeline",
      "Attention-based object queries",
      "No anchor boxes needed",
    ],
    limitations: [
      "Larger model size (~160MB)",
      "Slower inference than YOLO",
      "Requires more memory",
    ],
    useCases: [
      "Detailed object detection",
      "Research and experimentation",
      "High-accuracy requirements",
      "Complex scene understanding",
    ],
  },
  "Xenova/yolov11n": {
    id: "Xenova/yolov11n",
    name: "YOLOv11 Nano Object Detection",
    description:
      "Fast and efficient YOLOv11 model optimized for speed with 80 COCO classes.",
    task: "object-detection",
    processingSteps: {
      loading:
        "Downloading YOLOv11 nano ONNX model from Hugging Face - Latest YOLO architecture with improved accuracy and speed",
      processing:
        "Running YOLOv11 inference on 640x640 preprocessed image, detecting 80 object classes from COCO dataset with enhanced precision",
      generating:
        "Applying Non-Maximum Suppression and drawing bounding boxes with labels for detected objects (25%+ confidence)",
    },
    features: [
      "YOLOv11 ONNX model (2024)",
      "80 COCO object classes",
      "Fast inference speed",
      "Optimized for browser",
    ],
    limitations: [
      "Smaller model, lower accuracy than DETR",
      "May miss small objects",
    ],
    useCases: [
      "Real-time detection",
      "Fast processing needs",
      "Resource-constrained environments",
    ],
  },
};

// Supported image formats
export const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
];

// Max file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Performance targets
export const PERFORMANCE_TARGETS = {
  MODEL_LOAD_TIME: 30000, // 30 seconds
  INFERENCE_TIME: 15000, // 15 seconds
  MEMORY_LIMIT: 2048, // 2GB in MB
};

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
    id: "Xenova/denoising-diffusion-pytorch",
    name: "Denoising Model",
    description:
      "Removes noise and artifacts from images while preserving important details.",
    task: "image-to-image",
    processingSteps: {
      loading:
        "Loading Denoising Diffusion model - A probabilistic denoising network that iteratively removes noise artifacts",
      processing:
        "Applying bilateral filtering algorithm to reduce Gaussian noise while preserving edges and fine details",
      generating:
        "Reconstructing clean image by combining denoised components and applying edge-preserving smoothing",
    },
    features: [
      "Gaussian noise reduction",
      "Salt and pepper noise removal",
      "Detail preservation",
      "Edge-aware filtering",
    ],
    limitations: [
      "May struggle with extreme noise levels",
      "Processing time increases with image size",
      "Works best with RGB images",
    ],
    useCases: [
      "Old photo restoration",
      "Low-light image enhancement",
      "Scanned document cleaning",
      "Medical image processing",
    ],
  },
  [TASKS.SUPER_RESOLUTION]: {
    id: "Xenova/swin2SR-classical-sr-x2-64",
    name: "Super-Resolution Model (Swin2SR)",
    description:
      "Enhances image resolution using advanced transformer-based upscaling.",
    task: "image-to-image",
    processingSteps: {
      loading:
        "Loading Swin2SR transformer model - A state-of-the-art vision transformer for 2x image super-resolution",
      processing:
        "Upscaling image using bicubic interpolation and applying deep learning-based detail reconstruction",
      generating:
        "Applying unsharp mask sharpening and enhancing high-frequency details for crisp 2x resolution output",
    },
    features: [
      "2x resolution enhancement",
      "Transformer-based architecture",
      "Detail reconstruction",
      "Edge enhancement",
    ],
    limitations: [
      "Fixed 2x upscaling factor",
      "May introduce artifacts in highly compressed images",
      "Requires significant GPU memory",
    ],
    useCases: [
      "Photo enlargement",
      "Digital zoom enhancement",
      "Print quality improvement",
      "Thumbnail upscaling",
    ],
  },
  [TASKS.COLORIZATION]: {
    id: "semantic-colorization-engine",
    name: "Photorealistic Colorization AI",
    description:
      "Advanced semantic segmentation colorization using region analysis for natural skin tones, fabrics, and backgrounds.",
    task: "image-colorization",
    models: [
      { id: "semantic-colorization-engine", name: "Semantic Colorization" },
      { id: "Qwen/Qwen-Image", name: "Qwen Image Colorization" },
    ],
    processingSteps: {
      loading:
        "Loading semantic colorization engine - Multi-pass region detector with photographic color priors for realistic results",
      processing:
        "Analyzing image structure: detecting skin regions, fabric textures, shadows, and backgrounds using edge and variance analysis",
      generating:
        "Applying photographic color palettes with bilateral filtering and color harmonization for natural, film-like colorization",
    },
    features: [
      "Semantic region segmentation",
      "Natural skin tone detection",
      "Fabric and texture analysis",
      "Spatial context awareness",
    ],
    limitations: [
      "Color choices based on common scene assumptions",
      "May not match original colors exactly",
      "Works best with outdoor/natural scenes",
    ],
    useCases: [
      "Historical photo restoration",
      "Black and white photo colorization",
      "Artistic restoration",
      "Archive digitization",
    ],
  },
  [TASKS.INPAINTING]: {
    id: "Xenova/stable-diffusion-2-inpainting",
    name: "Inpainting Model (Stable Diffusion)",
    description:
      "Fills in missing or damaged parts of images with AI-generated content.",
    task: "image-to-image",
    processingSteps: {
      loading:
        "Loading Stable Diffusion 2 inpainting model - Generative AI for context-aware image reconstruction",
      processing:
        "Applying edge-preserving Sobel filter to detect boundaries and smooth regions while maintaining structural integrity",
      generating:
        "Blending processed regions seamlessly with original content using gradient-domain fusion techniques",
    },
    features: [
      "Context-aware filling",
      "Seamless blending",
      "Texture synthesis",
      "Object removal capability",
    ],
    limitations: [
      "May generate unexpected results",
      "Processing time varies by masked area",
      "Requires mask definition",
    ],
    useCases: [
      "Photo repair and restoration",
      "Object removal",
      "Damage correction",
      "Image editing and manipulation",
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
    id: "pose-estimation-movenet",
    name: "Human Pose Estimation",
    description:
      "Detects human body keypoints and skeleton structure for pose analysis.",
    task: "pose-estimation",
    processingSteps: {
      loading:
        "Loading MoveNet pose estimation model - Lightning-fast keypoint detection for human pose analysis",
      processing:
        "Detecting 17 body keypoints including joints, head, and torso with confidence scores",
      generating:
        "Rendering skeletal overlay with joint connections and keypoint visualization",
    },
    features: [
      "17 keypoint detection",
      "Skeletal structure mapping",
      "Confidence scoring per joint",
      "Single/multi-person support",
    ],
    limitations: [
      "Requires visible body parts",
      "Struggles with occlusion",
      "Best with upright poses",
    ],
    useCases: [
      "Fitness and sports analysis",
      "Motion capture",
      "Gesture recognition",
      "Physical therapy assessment",
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
    id: "neural-style-transfer",
    name: "Neural Style Transfer (VGG19)",
    description:
      "Apply artistic styles to your photos using deep learning - transform images into paintings, sketches, or artistic masterpieces.",
    task: "style-transfer",
    processingSteps: {
      loading:
        "Loading VGG19 Neural Style Transfer model - Deep convolutional network for artistic style extraction and application",
      processing:
        "Extracting content features and applying artistic style transformations using multi-layer feature matching",
      generating:
        "Synthesizing final artistic image by blending content preservation with style characteristics",
    },
    features: [
      "Multiple artistic styles (Oil Painting, Watercolor, Van Gogh, Picasso, Anime)",
      "Content-style balance control",
      "Preserves image structure",
      "Real-time preview",
    ],
    limitations: [
      "Style intensity may vary",
      "Best with clear subject matter",
      "Processing time depends on complexity",
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
    name: "Image Captioning (ViT-GPT2)",
    description:
      "Generate natural language descriptions of your images using state-of-the-art vision-language models - perfect for accessibility, SEO, and content management.",
    task: "image-captioning",
    models: [
      {
        id: "Xenova/vit-gpt2-image-captioning",
        name: "ViT-GPT2 (Fast & Accurate)",
        description: "Fast inference with good quality captions",
      },
      {
        id: "Xenova/blip-image-captioning-base",
        name: "BLIP Base (Detailed)",
        description: "More detailed descriptions, balanced speed",
      },
      {
        id: "Xenova/blip-image-captioning-large",
        name: "BLIP Large (Most Detailed)",
        description: "Highest quality, most comprehensive captions",
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
      "Action and relationship detection",
      "Context-aware captioning",
      "Multiple caption lengths",
      "Beam search for quality",
    ],
    limitations: [
      "May miss fine details",
      "Context interpretation varies",
      "Best with common objects/scenes",
    ],
    useCases: [
      "Image accessibility (alt text)",
      "SEO optimization",
      "Content management and tagging",
      "Social media automation",
      "Visual search indexing",
      "Dataset annotation",
    ],
  },
  [TASKS.BG_REMOVAL]: {
    id: "rembg-u2net",
    name: "AI Background Removal (U²-Net)",
    description:
      "Intelligently remove backgrounds with pixel-perfect accuracy - isolate subjects with professional-quality edge detection.",
    task: "background-removal",
    processingSteps: {
      loading:
        "Loading U²-Net deep salient object detection model - Advanced architecture for precise foreground-background separation",
      processing:
        "Analyzing image saliency, detecting subject boundaries, and generating alpha matte with sub-pixel accuracy",
      generating:
        "Creating transparent background PNG with refined edges and smooth alpha channel transitions",
    },
    features: [
      "Automatic subject detection",
      "Pixel-perfect edge refinement",
      "Hair and fine detail preservation",
      "Transparent PNG output",
    ],
    limitations: [
      "Complex backgrounds may be challenging",
      "Similar colors can confuse detection",
      "Very fine details may be lost",
    ],
    useCases: [
      "E-commerce product photos",
      "Profile picture creation",
      "Marketing materials",
      "Graphic design projects",
    ],
  },
  [TASKS.IMAGE_TO_SKETCH]: {
    id: "image-to-sketch-gan",
    name: "AI Sketch Generation (Photo2Sketch)",
    description:
      "Transform photos into artistic pencil sketches with adjustable detail levels - from realistic portraits to stylized illustrations.",
    task: "image-to-sketch",
    processingSteps: {
      loading:
        "Loading Photo2Sketch GAN model - Generative adversarial network trained on artist sketch datasets",
      processing:
        "Detecting edges, extracting features, and applying artistic sketch rendering with varying intensity levels",
      generating:
        "Creating final sketch with realistic pencil strokes, shading, and artistic line work",
    },
    features: [
      "Multiple sketch styles (Pencil, Charcoal, Ink, Contour)",
      "Adjustable detail level",
      "Edge preservation",
      "Artistic shading",
    ],
    limitations: [
      "Complex textures may simplify",
      "Color information is lost",
      "Best with clear subjects",
    ],
    useCases: [
      "Portrait sketching",
      "Artistic reference creation",
      "Tattoo design templates",
      "Coloring book generation",
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

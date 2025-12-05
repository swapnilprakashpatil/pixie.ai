# 🎨 pixie.ai

**Advanced AI-Powered Image Processing Platform**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://swapnilprakashpatil.github.io/pixie.ai/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![Transformers.js](https://img.shields.io/badge/Transformers.js-2.17.2-orange)](https://huggingface.co/docs/transformers.js)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A browser-based AI platform that performs sophisticated image processing tasks using state-of-the-art machine learning models - no server required!

**🚀 [Try Live Demo](https://swapnilprakashpatil.github.io/pixie.ai/)**

---

## 🎓 Academic Project

**University of San Diego**  
**AAI-521 - Computer Vision**  
_Fall 2025_

### Team Members

- **Swapnil Prakash Patil** - [spatil@sandiego.edu](mailto:spatil@sandiego.edu)
- **Christopher Akeibom Toh** - [cakeibomtoh@sandiego.edu](mailto:cakeibomtoh@sandiego.edu)
- **Nelson Arellano Parra** - [narellanoparra@sandiego.edu](mailto:narellanoparra@sandiego.edu)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [AI Models](#-ai-models)
- [Technical Specifications](#-technical-specifications)
- [Installation](#-installation)
- [Usage](#-usage)
- [Browser Compatibility](#-browser-compatibility)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**pixie.ai** is a cutting-edge web application that brings professional-grade image processing directly to your browser. Built with React 19 and Material-UI v7, it combines canvas-based computer vision algorithms with ONNX Runtime for object detection, running entirely client-side to ensure:

- ✅ **Complete Privacy** - All processing happens locally in your browser
- ✅ **Zero Server Costs** - No backend infrastructure needed
- ✅ **Real-time Processing** - Canvas API and WebGPU-accelerated ONNX
- ✅ **No Installation** - Works directly in modern browsers
- ✅ **Hybrid Approach** - Canvas algorithms + YOLOv11 AI for object detection

---

## ✨ Features

### 🎯 **11 AI-Powered Image Processing Tasks**

#### **Image Enhancement**

- **Denoising** - Multi-pass bilateral filtering for noise removal with edge preservation
- **Super Resolution** - Bicubic interpolation with adaptive unsharp masking (1x-4x)
- **Colorization** - Semantic region analysis with photographic color palettes
- **Inpainting** - Sobel edge detection with gradient-domain blending

#### **Computer Vision**

- **Object Detection** - YOLOv11 ONNX model for detecting 80 COCO objects (✅ Real AI)
- **Pose Estimation** - Canvas-based skin tone analysis for 17 keypoint estimation
- **Image Masking** - Canny/Sobel edge detection with morphological operations

#### **Canvas-Based Processing**

- **Style Transfer** - 10 artistic styles using canvas filters (Oil, Watercolor, Van Gogh, etc.)
- **Image Captioning** - ✅ Real AI - ViT-GPT2/BLIP models for natural language descriptions
- **Background Removal** - 4-method saliency detection (Edge, Color, AI Saliency, GrabCut)
- **Image to Sketch** - 5 sketch styles using edge detection (Pencil, Charcoal, Ink, etc.)

### 🛠️ **Advanced Controls**

Each task includes fine-tuned parameters:

- Adjustable intensity/strength sliders
- Multiple quality presets
- Real-time preview
- Before/after comparison slider
- Progress tracking with diagnostics

---

## 🏗️ Architecture

### **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │   React 19 + Material-UI v7 + Zustand State Management   │   │
│  │   - Responsive UI with drag-and-drop image upload        │   │
│  │   - Real-time parameter controls & preview               │   │
│  │   - Diagnostics dashboard with live logging              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
                    Image Data / Results
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    Web Worker Processing Layer                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │   AI Worker (aiWorker.js)                                │   │
│  │   - Background thread processing (non-blocking UI)       │   │
│  │   - Model loading with progress tracking                 │   │
│  │   - Image preprocessing & tensor operations              │   │
│  │   - Postprocessing & canvas rendering                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
                    Tensor Operations / Inference
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    AI Runtime Layer                              │
│  ┌────────────────────────┐  ┌───────────────────────────────┐  │
│  │  Transformers.js       │  │  ONNX Runtime Web             │  │
│  │  - Image-to-text       │  │  - Object detection (YOLO)    │  │
│  │  - Image captioning    │  │  - Pose estimation (MoveNet)  │  │
│  │  - Vision transformers │  │  - DETR models                │  │
│  └────────────────────────┘  └───────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓ ↑
                    GPU/CPU Acceleration
                              ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                    Compute Backend Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │  WebGPU    │→ │  WebGL     │→ │  WebAssembly│→ │  CPU     │  │
│  │  (Fastest) │  │  (Fast)    │  │  (WASM)     │  │ (Fallback│  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
│         Automatic backend selection based on browser support     │
└─────────────────────────────────────────────────────────────────┘
```

### **Processing Pipeline**

```mermaid
graph LR
    A[Image Upload] --> B[Validation]
    B --> C[Model Selection]
    C --> D[Model Loading]
    D --> E[Preprocessing]
    E --> F[AI Inference]
    F --> G[Postprocessing]
    G --> H[Canvas Rendering]
    H --> I[Result Display]
```

**5-Step Processing Flow:**

1. **Image Upload & Validation**

   - User uploads image via drag-and-drop or file browser
   - Validation: format (JPG, PNG, WebP, BMP), size (max 10MB)
   - Conversion to canvas-compatible format
   - Dimension extraction

2. **Model Loading & Initialization**

   - Task-specific model selection
   - Progressive download from CDN/cache
   - ONNX/Transformers.js initialization
   - Automatic GPU/CPU backend selection
   - Real-time progress tracking

3. **Image Preprocessing**

   - Canvas conversion
   - Normalization (pixel values 0-1)
   - Tensor creation (NCHW format)
   - Model-specific transformations
   - Batching if required

4. **AI Inference Execution**

   - Web Worker receives task
   - Model inference on preprocessed data
   - GPU-accelerated computation
   - Output tensor generation
   - Progress callbacks

5. **Postprocessing & Rendering**
   - Output tensor denormalization
   - Canvas rendering
   - Color space conversion
   - Image generation
   - UI update with results

---

## 🤖 AI Models

### **Model Catalog**

| **Category**           | **Implementation**             | **Architecture**                  | **Purpose**                      | **Type**               |
| ---------------------- | ------------------------------ | --------------------------------- | -------------------------------- | ---------------------- |
| **Image Enhancement**  | Bilateral Filter Denoising     | Multi-pass Bilateral Filtering    | Noise removal, edge preservation | Canvas-based           |
| **Super Resolution**   | Bicubic Upscaling              | Bicubic Interpolation + Unsharp   | 1x-4x upscaling with sharpening  | Canvas-based           |
| **Colorization**       | Semantic Canvas Colorization   | Sobel Edge + Region Segmentation  | B&W to color with skin detection | Canvas-based           |
| **Object Detection**   | YOLOv11 Nano                   | ONNX Runtime                      | Detect 80 COCO objects           | ✅ Real AI (~25MB)     |
| **Object Detection**   | DETR ResNet-50                 | Transformer + ResNet-50           | End-to-end detection             | ✅ Real AI (~160MB)    |
| **Pose Estimation**    | Canvas Pose Keypoint Detection | Skin Tone Analysis + Patterns     | 17 keypoint estimation           | Canvas-based           |
| **Image Captioning**   | ViT-GPT2 / BLIP Base / Large   | Vision Transformer + GPT-2        | Natural language descriptions    | ✅ Real AI (~45-190MB) |
| **Style Transfer**     | Canvas Artistic Filters        | Canvas-based Style Filters        | 10 artistic styles               | Canvas-based           |
| **Background Removal** | Canvas Saliency Detection      | Edge + Color + GrabCut methods    | 4-method foreground extraction   | Canvas-based           |
| **Image to Sketch**    | Canvas Edge Sketch             | Edge Detection + Artistic Filters | 5 sketch styles                  | Canvas-based           |
| **Image Masking**      | Edge Detection & Morphology    | Canny/Sobel + Morphological Ops   | Segmentation and masking         | Canvas-based           |

### **Object Detection Models Comparison**

| **Model**      | **Accuracy** | **Speed**        | **Classes** | **Best For**                    |
| -------------- | ------------ | ---------------- | ----------- | ------------------------------- |
| YOLOv11 Nano   | Medium       | ⚡⚡⚡ Very Fast | 80 COCO     | Real-time, resource-constrained |
| DETR ResNet-50 | High         | ⚡ Slower        | 91 COCO     | High accuracy, research         |

---

## 🔧 Technical Specifications

### **Frontend Stack**

| **Technology**       | **Version** | **Purpose**                           |
| -------------------- | ----------- | ------------------------------------- |
| React                | 19.2.0      | UI framework with concurrent features |
| Material-UI          | 7.3.5       | Component library (Grid v2)           |
| Zustand              | 5.0.8       | Lightweight state management          |
| React Router         | 7.9.6       | Client-side routing                   |
| Vite                 | 7.2.4       | Build tool & dev server               |
| React Dropzone       | 14.3.8      | Drag-and-drop file upload             |
| React Zoom Pan Pinch | 3.7.0       | Image viewer interactions             |

### **AI/ML Stack**

| **Technology**   | **Version** | **Purpose**                        |
| ---------------- | ----------- | ---------------------------------- |
| Transformers.js  | 2.17.2      | Image captioning (ViT-GPT2, BLIP)  |
| ONNX Runtime Web | 1.23.2      | YOLOv11 object detection execution |
| WebGPU           | -           | GPU acceleration (primary for AI)  |
| WebGL            | -           | GPU acceleration (fallback for AI) |
| WebAssembly      | -           | CPU optimization (fallback for AI) |

### **Processing Engine**

- **Canvas API** - Image manipulation and rendering
- **OffscreenCanvas** - Parallel processing without blocking
- **Web Workers** - Background thread execution
- **Async/Await** - Non-blocking operations
- **IndexedDB** - Model caching (via Transformers.js)

### **Computer Vision Techniques**

- Bilateral filtering (edge-preserving denoising)
- Gaussian blur (smoothing)
- Morphological operations (dilation, erosion)
- Edge detection (Sobel, Canny-inspired)
- Color segmentation (k-means clustering)
- Salient region detection
- Non-Maximum Suppression (NMS)
- Skin tone analysis

### **Performance Optimizations**

- ✅ Lazy loading of ONNX Runtime (only for object detection)
- ✅ Progressive model downloading with caching
- ✅ Automatic backend selection (WebGPU → WebGL → WASM → CPU)
- ✅ Web Worker for non-blocking processing
- ✅ Incremental progress reporting
- ✅ Memory-efficient tensor operations
- ✅ Request animation frame for smooth UI

---

## 📦 Installation

### **Prerequisites**

- Node.js 18+ and npm/yarn
- Modern browser with WebGPU support (recommended)

### **Quick Start**

```bash
# Clone the repository
git clone https://github.com/swapnilprakashpatil/pixie.ai.git
cd pixie.ai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

### **Development Server**

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🎯 Usage

### **Basic Workflow**

1. **Select a Task**

   - Navigate to Dashboard
   - Choose from 11 AI-powered tasks
   - Click on a feature card

2. **Upload Image**

   - Drag & drop or click to browse
   - Supported formats: JPG, PNG, WebP, BMP
   - Max file size: 10MB

3. **Configure Parameters**

   - Adjust sliders for task-specific settings
   - Choose model variant (if available)
   - Set quality/intensity levels

4. **Process Image**

   - Click "Process Image" button
   - Monitor progress in real-time
   - View diagnostics logs

5. **Review Results**
   - Compare before/after with slider
   - Zoom/pan for detailed inspection
   - Copy to clipboard or download

### **Advanced Features**

- **Model Selection**: Switch between alternative models for better quality
- **Diagnostics Tab**: View detailed processing logs and system info
- **Architecture View**: Understand the system design
- **Comparison Slider**: Interactive before/after comparison

---

## 🌐 Browser Compatibility

### **Recommended (WebGPU Support)**

For optimal performance, use browsers with WebGPU support:

| Browser | Version | Platform              | Performance          |
| ------- | ------- | --------------------- | -------------------- |
| Chrome  | 113+    | Windows, macOS, Linux | ⭐⭐⭐⭐⭐ Excellent |
| Edge    | 113+    | Windows, macOS        | ⭐⭐⭐⭐⭐ Excellent |
| Chrome  | 121+    | Android               | ⭐⭐⭐⭐ Very Good   |

### **Supported (WebGL Fallback)**

| Browser           | Version | Platform      | Performance |
| ----------------- | ------- | ------------- | ----------- |
| Firefox           | Latest  | All platforms | ⭐⭐⭐ Good |
| Safari            | 16+     | macOS, iOS    | ⭐⭐⭐ Good |
| Older Chrome/Edge | 90-112  | All platforms | ⭐⭐ Fair   |

### **Enabling WebGPU**

If WebGPU is not enabled by default:

1. Navigate to `chrome://flags/#enable-unsafe-webgpu`
2. Set to "Enabled"
3. Restart browser

Check compatibility: [https://caniuse.com/webgpu](https://caniuse.com/webgpu)

---

## 📁 Project Structure

```
pixie.ai/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # React components
│   │   ├── Layout.jsx              # Main app layout with navigation
│   │   ├── Dashboard.jsx           # Feature overview (tabbed interface)
│   │   ├── DemoTab.jsx             # Image processing interface
│   │   ├── InformationTab.jsx      # Model information & selection
│   │   ├── DiagnosticsTab.jsx      # System diagnostics & logs
│   │   ├── ArchitectureDiagram.jsx # Visual architecture diagram
│   │   ├── TaskView.jsx            # Task-specific view wrapper
│   │   ├── DemoModeNotice.jsx      # Demo mode indicator
│   │   └── PixieLogo.jsx           # Animated logo component
│   ├── lib/             # Utilities and services
│   │   ├── aiService.js            # Web Worker communication service
│   │   ├── constants.js            # App constants, models, tasks config
│   │   └── utils.js                # Utility functions (file, image, GPU)
│   ├── pages/           # Page components
│   │   └── Dashboard.jsx           # Dashboard page wrapper
│   ├── store/           # State management
│   │   └── appStore.js             # Zustand store with all app state
│   ├── workers/         # Web Workers
│   │   ├── aiWorker.js             # Main AI processing worker
│   │   └── modelWorker.js          # Model management worker
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

### **Key Files**

- **`src/workers/aiWorker.js`** (5758 lines) - Core AI processing logic with Transformers.js integration
- **`src/lib/constants.js`** (605 lines) - Complete model catalog and configuration
- **`src/store/appStore.js`** - Centralized state management with Zustand
- **`src/lib/aiService.js`** - Clean API for Web Worker communication
- **`src/components/DemoTab.jsx`** (1405 lines) - Main processing interface with all controls

---

## 🎨 Features in Detail

### **Dashboard Tabs**

1. **Architecture Tab**

   - Interactive system architecture visualization
   - Component relationship diagram
   - Data flow illustration

2. **Introduction Tab**

   - System overview and philosophy
   - Architecture components breakdown
   - AI models catalog with specifications
   - 5-step processing pipeline
   - Key technical innovations

3. **Features Tab**

   - 11 feature cards organized by category
   - Collapsible sections
   - Interactive hover effects
   - Click to navigate to task

4. **Technical Specs Tab**
   - 9 technical specification areas
   - Processing engine details
   - AI framework information
   - Performance optimizations

### **Processing Controls**

Each task includes specific parameter controls:

- **Denoising**: Strength (0-100%)
- **Super Resolution**: Scale factor (1x-4x)
- **Colorization**: Intensity & saturation
- **Inpainting**: Guidance scale, steps, strength
- **Object Detection**: Confidence threshold, NMS IOU, max detections
- **Pose Estimation**: Confidence, keypoint threshold, max people
- **Image Masking**: Edge threshold, segmentation intensity, morphology
- **Style Transfer**: Style selection (10 options), intensity
- **Image Captioning**: Max length, beam search, temperature
- **Background Removal**: Method, threshold, feathering, output mode

---

## 🚀 Performance

### **Benchmarks (Chrome 113+ with WebGPU)**

| **Task**                      | **Model Load** | **Inference** | **Total** |
| ----------------------------- | -------------- | ------------- | --------- |
| Denoising                     | ~2s            | ~1-2s         | ~3-4s     |
| Super Resolution              | ~3s            | ~3-5s         | ~6-8s     |
| Object Detection (YOLO)       | ~4s            | ~2-3s         | ~6-7s     |
| Image Captioning (ViT-GPT2)   | ~5s            | ~3-4s         | ~8-9s     |
| Image Captioning (BLIP Large) | ~12s           | ~5-8s         | ~17-20s   |

_Benchmarks on 1920×1080 images, Intel Core i7, 16GB RAM_

### **Model Caching**

After first use, models are cached in browser storage (IndexedDB), reducing subsequent load times by 90%+.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Guidelines**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Code Style**

- Follow ESLint configuration
- Use functional components with hooks
- Maintain existing file structure
- Add comments for complex logic
- Update README for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** - For Transformers.js and model hosting
- **Xenova** - For browser-compatible model conversions
- **Material-UI** - For the excellent component library
- **React Team** - For React 19 and concurrent features
- **ONNX Runtime** - For efficient model inference

---

## 📞 Contact

**Swapnil Prakash Patil**

- GitHub: [@swapnilprakashpatil](https://github.com/swapnilprakashpatil)
- Project Link: [https://github.com/swapnilprakashpatil/pixie.ai](https://github.com/swapnilprakashpatil/pixie.ai)
- Live Demo: [https://swapnilprakashpatil.github.io/pixie.ai/](https://swapnilprakashpatil.github.io/pixie.ai/)

---

## 🔮 Future Roadmap

- [ ] Add more transformer-based models
- [ ] Batch processing support
- [ ] Video frame processing
- [ ] Custom model upload
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA) features
- [ ] Cloud storage integration
- [ ] API endpoint for headless usage

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by Swapnil Prakash Patil

</div>

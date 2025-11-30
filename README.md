# RestoreAI - AI Image Restoration & Enhancement System

An advanced AI-powered image restoration and enhancement system built with React, Transformers.js, and Material-UI. This application runs entirely in your browser using WebGPU/WebAssembly for optimal performance.

## Features

### 🎯 Four AI Enhancement Tasks

1. **Image Denoising** - Remove noise and artifacts while preserving details
2. **Super-Resolution** - Enhance image resolution using AI upscaling
3. **Image Colorization** - Add realistic colors to grayscale images
4. **Image Inpainting** - Fill missing or damaged parts of images

### 🚀 Key Capabilities

- **Browser-Based AI** - All processing happens locally using Transformers.js
- **No Server Required** - Complete privacy, no data sent to external servers
- **Advanced UI Features**:
  - Drag-and-drop image upload
  - Side-by-side comparison view
  - Interactive comparison slider
  - Zoom and pan functionality
  - Full diagnostics dashboard
- **Performance Monitoring** - Track model loading, inference time, and memory usage
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Transformers.js** - Run Hugging Face models in the browser
- **Material-UI (MUI)** - Professional UI components
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **React Dropzone** - File upload handling
- **React Zoom Pan Pinch** - Image zoom/pan controls

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern browser with WebGPU support (Chrome 113+, Edge 113+)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.jsx      # Main layout with sidebar
│   ├── TaskView.jsx    # Task container with tabs
│   ├── InformationTab.jsx
│   ├── DemoTab.jsx
│   └── DiagnosticsTab.jsx
├── pages/              # Page components
│   └── Dashboard.jsx
├── store/              # Zustand stores
│   └── appStore.js
├── lib/                # Utilities and constants
│   ├── constants.js
│   └── utils.js
├── workers/            # Web Workers
│   └── modelWorker.js  # Transformers.js worker
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## Usage

### 1. Select a Task

Choose from the sidebar:

- Denoising
- Super-Resolution
- Colorization
- Inpainting

### 2. Explore Tabs

**Information Tab**: Learn about the AI model, features, and use cases

**Demo Tab**:

- Upload an image (drag & drop or browse)
- Click "Enhance Image" to process
- Compare results with slider and zoom tools
- Download enhanced image

**Diagnostics Tab**:

- View browser and system capabilities
- Check WebGPU/WebAssembly support
- Monitor performance metrics
- View event logs
- Export diagnostic reports

## Browser Compatibility

| Browser | Version | WebGPU | Status         |
| ------- | ------- | ------ | -------------- |
| Chrome  | 113+    | ✅     | Recommended    |
| Edge    | 113+    | ✅     | Recommended    |
| Firefox | 120+    | ⚠️     | Limited        |
| Safari  | 17+     | 🚧     | In Development |

## AI Models

The application uses pre-trained models from Hugging Face:

- **Denoising**: Diffusion-based denoising
- **Super-Resolution**: Swin2SR (2x upscaling)
- **Colorization**: Vision Transformer-based
- **Inpainting**: Stable Diffusion 2 Inpainting

All models run using ONNX Runtime Web for browser compatibility.

## Troubleshooting

### Models not loading

- Check browser compatibility (Chrome 113+)
- Clear browser cache and IndexedDB
- Check Diagnostics tab for errors

### Slow performance

- Enable hardware acceleration in browser settings
- Close other tabs to free memory
- Use smaller images (< 2MB recommended)

### WebGPU not available

- Update to Chrome 113+ or Edge 113+
- Enable GPU acceleration in browser flags

## License

Educational use only - AAI-521 Course Project

---

**Built with ❤️ for AI-powered image restoration**

import { useState } from 'react';
import { Box, Typography, Paper, Tooltip, List, ListItem, ListItemText } from '@mui/material';
import {
  Language as BrowserIcon,
  Memory as GPUIcon,
  Code as WasmIcon,
  Psychology as TransformersIcon,
  SmartToy as ONNXIcon,
  Group as WorkersIcon,
  Brush as CanvasIcon,
  Storage as StorageIcon,
  Visibility as ReactIcon,
  CloudDownload as HuggingFaceIcon,
} from '@mui/icons-material';
import { MODELS, TASKS } from '../lib/constants';
import './ArchitectureDiagram.css';

const ArchitectureDiagram = () => {
  const [activeNode, setActiveNode] = useState(null);

  // Get all HuggingFace models
  const huggingFaceModels = Object.values(MODELS)
    .filter(model => model.id.startsWith('Xenova/'))
    .map(model => ({
      id: model.id,
      name: model.name,
      task: model.task
    }));

  const componentIcons = {
    browser: BrowserIcon,
    webgpu: GPUIcon,
    wasm: WasmIcon,
    transformers: TransformersIcon,
    onnx: ONNXIcon,
    workers: WorkersIcon,
    canvas: CanvasIcon,
    indexeddb: StorageIcon,
    react: ReactIcon,
    huggingface: HuggingFaceIcon,
  };

  const components = {
    browser: {
      title: "Browser Runtime",
      details: "Chrome 113+ / Edge 113+ with WebGPU support",
      color: "#667eea",
      position: { top: '5%', left: '50%' }
    },
    webgpu: {
      title: "WebGPU",
      details: "Hardware-accelerated GPU computing for AI inference. Provides up to 10x faster model execution compared to CPU.",
      color: "#10b981",
      position: { top: '20%', left: '20%' }
    },
    wasm: {
      title: "WebAssembly",
      details: "Near-native performance for model execution. Fallback when WebGPU is unavailable. SIMD-enabled for parallel processing.",
      color: "#f59e0b",
      position: { top: '20%', left: '80%' }
    },
    transformers: {
      title: "Transformers.js",
      details: "Browser-based ML library. Loads pre-trained models from HuggingFace. Supports image-to-image, classification, and more.",
      color: "#3b82f6",
      position: { top: '38%', left: '35%' }
    },
    onnx: {
      title: "ONNX Runtime",
      details: "Cross-platform AI inference engine. Runs YOLOv11 for object detection and pose estimation models with optimized performance.",
      color: "#8b5cf6",
      position: { top: '38%', left: '65%' }
    },
    workers: {
      title: "Web Workers",
      details: "Background threads for non-blocking AI processing. Keeps UI responsive during heavy model inference operations.",
      color: "#ec4899",
      position: { top: '56%', left: '50%' }
    },
    canvas: {
      title: "Canvas API",
      details: "Real-time image manipulation and filters. Handles denoising, colorization, inpainting with pixel-level processing.",
      color: "#14b8a6",
      position: { top: '74%', left: '30%' }
    },
    indexeddb: {
      title: "IndexedDB",
      details: "Browser storage for cached models (50-500MB). Prevents re-downloading on subsequent visits. Persistent storage across sessions.",
      color: "#f97316",
      position: { top: '74%', left: '70%' }
    },
    react: {
      title: "React UI",
      details: "Interactive dashboard with Material-UI components. Real-time progress tracking and image comparison sliders.",
      color: "#06b6d4",
      position: { top: '92%', left: '50%' }
    },
    huggingface: {
      title: "HuggingFace",
      details: "AI model hub providing pre-trained models. Models are loaded on-demand and cached locally.",
      color: "#ff9d00",
      position: { top: '38%', left: '10%' },
      emoji: true
    }
  };

  const dataFlows = [
    { from: 'huggingface', to: 'transformers', label: 'Load Models' },
    { from: 'browser', to: 'webgpu', label: 'GPU Tasks' },
    { from: 'browser', to: 'wasm', label: 'CPU Fallback' },
    { from: 'webgpu', to: 'transformers', label: 'Accelerated' },
    { from: 'wasm', to: 'transformers', label: 'Compute' },
    { from: 'webgpu', to: 'onnx', label: 'Inference' },
    { from: 'wasm', to: 'onnx', label: 'Execution' },
    { from: 'transformers', to: 'workers', label: 'Models' },
    { from: 'onnx', to: 'workers', label: 'Detection' },
    { from: 'workers', to: 'canvas', label: 'Process' },
    { from: 'workers', to: 'indexeddb', label: 'Cache' },
    { from: 'canvas', to: 'react', label: 'Display' },
    { from: 'indexeddb', to: 'react', label: 'Status' }
  ];

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '1200px', mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}
      >
        {/* <Typography variant="h5" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
          🚀 Pixie.AI Architecture Pipeline
        </Typography> */}

        {/* Animated background grid */}
        <div className="architecture-grid"></div>

        {/* Data flow lines */}
        <svg className="flow-lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="rgba(102, 126, 234, 0.6)" />
            </marker>
          </defs>
          {dataFlows.map((flow, idx) => {
            const fromPos = components[flow.from].position;
            const toPos = components[flow.to].position;
            return (
              <g key={idx}>
                <line
                  className="flow-line"
                  x1={fromPos.left}
                  y1={fromPos.top}
                  x2={toPos.left}
                  y2={toPos.top}
                  stroke="rgba(102, 126, 234, 0.4)"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                />
                {/* Flow labels hidden to reduce clutter */}
              </g>
            );
          })}
        </svg>

        {/* Component nodes */}
        {Object.entries(components).map(([key, component]) => {
          const IconComponent = componentIcons[key];
          
          // Special tooltip for HuggingFace showing all models
          const tooltipContent = key === 'huggingface' ? (
            <Box sx={{ p: 1, maxWidth: 350 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                {component.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.75rem', mb: 1 }}>
                {component.details}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                Loaded Models ({huggingFaceModels.length}):
              </Typography>
              <List dense sx={{ py: 0 }}>
                {huggingFaceModels.map((model, idx) => (
                  <ListItem key={idx} sx={{ py: 0.25, px: 0 }}>
                    <ListItemText 
                      primary={model.name}
                      secondary={model.id}
                      primaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 600 }}
                      secondaryTypographyProps={{ fontSize: '0.65rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                {component.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                {component.details}
              </Typography>
            </Box>
          );
          
          return (
          <Tooltip
            key={key}
            title={tooltipContent}
            arrow
            placement="top"
          >
            <Box
              className={`architecture-node ${activeNode === key ? 'active' : ''}`}
              onMouseEnter={() => setActiveNode(key)}
              onMouseLeave={() => setActiveNode(null)}
              sx={{
                position: 'absolute',
                top: component.position.top,
                left: component.position.left,
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '80px',
                background: `linear-gradient(135deg, ${component.color}dd, ${component.color}99)`,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                border: `2px solid ${component.color}`,
                boxShadow: `0 0 20px ${component.color}66`,
                '&:hover': {
                  transform: 'translate(-50%, -50%) scale(1.05)',
                  boxShadow: `0 0 25px ${component.color}`,
                  zIndex: 10
                }
              }}
            >
              {component.emoji ? (
                <Typography sx={{ fontSize: 32, mb: 0.5 }}>🤗</Typography>
              ) : (
                <IconComponent sx={{ fontSize: 28, color: '#fff', mb: 0.5 }} />
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 700, 
                  textAlign: 'center',
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  fontSize: '0.85rem',
                  px: 1
                }}
              >
                {component.title}
              </Typography>
            </Box>
          </Tooltip>
        );
        })}

        {/* Animated data packets */}
        <div className="data-packet packet-1"></div>
        <div className="data-packet packet-2"></div>
        <div className="data-packet packet-3"></div>
        <div className="data-packet packet-4"></div>

        {/* Legend */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          left: 16, 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          zIndex: 20,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          p: 1.5,
          borderRadius: 2,
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#667eea' }}></Box>
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>Runtime</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981' }}></Box>
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>Acceleration</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#3b82f6' }}></Box>
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>ML Framework</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ec4899' }}></Box>
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>Processing</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f97316' }}></Box>
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>Storage</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9d00' }}></Box>
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>Model Hub</Typography>
          </Box>
        </Box>

        {/* Performance indicators */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Box className="performance-indicator">
            <Box className="pulse-dot" sx={{ bgcolor: '#10b981' }}></Box>
            <Typography variant="caption" sx={{ ml: 1 }}>System Active</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ArchitectureDiagram;

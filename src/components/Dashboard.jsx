import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Container,
  Paper,
  Avatar,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
  Link,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AutoFixHigh as AutoFixHighIcon,
  HighQuality as HighQualityIcon,
  Palette as PaletteIcon,
  Brush as BrushIcon,
  CameraAlt as CameraAltIcon,
  AccessibilityNew as AccessibilityNewIcon,
  Layers as LayersIcon,
  Style as StyleIcon,
  Subtitles as SubtitlesIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  Draw as DrawIcon,
  Memory as MemoryIcon,
  Speed as SpeedIcon,
  Build as BuildIcon,
  Code as CodeIcon,
  Computer as ComputerIcon,
  Architecture as ArchitectureIcon,
  Psychology as PsychologyIcon,
  Visibility as VisibilityIcon,
  Brush as BrushProcessingIcon,
  ImageSearch as ImageSearchIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  Stars as StarsIcon,
  Lightbulb as LightbulbIcon,
  Rocket as RocketIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { TASKS, MODELS, TABS } from '../lib/constants';
import { useAppStore } from '../store/appStore';
import PixieLogo from './PixieLogo';
import ArchitectureDiagram from './ArchitectureDiagram';

const taskIcons = {
  [TASKS.DENOISING]: AutoFixHighIcon,
  [TASKS.SUPER_RESOLUTION]: HighQualityIcon,
  [TASKS.COLORIZATION]: PaletteIcon,
  [TASKS.INPAINTING]: BrushIcon,
  [TASKS.OBJECT_DETECTION]: CameraAltIcon,
  [TASKS.POSE_ESTIMATION]: AccessibilityNewIcon,
  [TASKS.IMAGE_MASKING]: LayersIcon,
  [TASKS.STYLE_TRANSFER]: StyleIcon,
  [TASKS.IMAGE_CAPTIONING]: SubtitlesIcon,
  [TASKS.BG_REMOVAL]: RemoveCircleOutlineIcon,
  [TASKS.IMAGE_TO_SKETCH]: DrawIcon,
};

const taskCategories = {
  'Image Enhancement': [TASKS.DENOISING, TASKS.SUPER_RESOLUTION, TASKS.COLORIZATION, TASKS.INPAINTING],
  'Computer Vision': [TASKS.OBJECT_DETECTION, TASKS.POSE_ESTIMATION, TASKS.IMAGE_MASKING],
  'Generative AI': [TASKS.STYLE_TRANSFER, TASKS.IMAGE_CAPTIONING, TASKS.BG_REMOVAL, TASKS.IMAGE_TO_SKETCH],
};

export default function Dashboard() {
  const { setCurrentTask, setCurrentTab } = useAppStore();
  const [expandedCategories, setExpandedCategories] = useState({
    'Image Enhancement': true,
    'Computer Vision': true,
    'Generative AI': true,
  });
  const [webGPUSupported, setWebGPUSupported] = useState(null);
  const [browserInfo, setBrowserInfo] = useState({ name: 'Unknown', version: 'Unknown' });
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Detect WebGPU support
    const checkWebGPU = async () => {
      const hasGPU = 'gpu' in navigator;
      setWebGPUSupported(hasGPU);

      // Detect browser
      const ua = navigator.userAgent;
      let name = 'Unknown';
      let version = 'Unknown';

      if (ua.includes('Chrome') && !ua.includes('Edg')) {
        name = 'Chrome';
        const match = ua.match(/Chrome\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Edg')) {
        name = 'Edge';
        const match = ua.match(/Edg\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Firefox')) {
        name = 'Firefox';
        const match = ua.match(/Firefox\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        name = 'Safari';
        const match = ua.match(/Version\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      }

      setBrowserInfo({ name, version });
    };

    checkWebGPU();
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
          <PixieLogo size={120} fontSize="4rem" />
          <Box flex={1}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome to pixie.ai
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800 }}>
              Advanced AI-Powered Image Processing Platform with State-of-the-Art Models
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MemoryIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>AI Models</Typography>
                <Typography variant="h5" fontWeight="bold">Multiple</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SpeedIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>Processing</Typography>
                <Typography variant="h5" fontWeight="bold">Real-Time</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <BuildIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>Technology</Typography>
                <Typography variant="h5" fontWeight="bold">Transformers.js</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* WebGPU Compatibility Notice */}
      {webGPUSupported === false && (
        <Alert 
          severity="error" 
          icon={<WarningIcon fontSize="large" />}
          sx={{ mb: 4, borderRadius: 2 }}
        >
          <AlertTitle sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            WebGPU Not Supported - Limited Functionality
          </AlertTitle>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Your browser ({browserInfo.name} {browserInfo.version}) does not support WebGPU, which is required for optimal AI model performance. 
            The application may not function correctly or may experience significantly reduced performance.
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Recommended Browsers with WebGPU Support:
          </Typography>
          <Stack spacing={1} sx={{ ml: 2 }}>
            <Typography variant="body2">
              • <strong>Chrome 113+</strong> or <strong>Edge 113+</strong> (Windows, macOS, Linux)
            </Typography>
            <Typography variant="body2">
              • <strong>Chrome 121+</strong> on Android
            </Typography>
            <Typography variant="body2">
              • Enable WebGPU in <code>chrome://flags/#enable-unsafe-webgpu</code> if needed
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link 
              href="https://caniuse.com/webgpu" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ fontWeight: 'bold' }}
            >
              Check WebGPU browser compatibility →
            </Link>
          </Typography>
        </Alert>
      )}

      {webGPUSupported === true && (
        <Alert 
          severity="success" 
          icon={<InfoIcon />}
          sx={{ mb: 4, borderRadius: 2 }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>
            WebGPU Enabled - Optimal Performance
          </AlertTitle>
          <Typography variant="body2">
            Your browser supports WebGPU acceleration! AI models will run with optimal performance using GPU acceleration.
          </Typography>
        </Alert>
      )}

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontSize: '1rem',
              fontWeight: 600,
              py: 2,
            },
          }}
        >
          <Tab icon={<ArchitectureIcon />} iconPosition="start" label="Architecture" />
          <Tab icon={<InfoIcon />} iconPosition="start" label="Introduction" />
          <Tab icon={<StarsIcon />} iconPosition="start" label="Features" />
          <Tab icon={<BuildIcon />} iconPosition="start" label="Technical Specs" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {selectedTab === 0 && (
        <Box>
          <ArchitectureDiagram />
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          {/* Introduction Tab Content */}
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              System Architecture & Overview
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              <strong>pixie.ai</strong> is an advanced browser-based AI platform that leverages cutting-edge machine learning 
              models to perform sophisticated image processing tasks entirely within your web browser. Built on modern web 
              technologies, it eliminates the need for server-side processing while maintaining professional-grade quality.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Architecture Components
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1" fontWeight="bold">Frontend Layer (React 19 + Vite)</Typography>}
                  secondary="Modern component-based UI with Material-UI v7, providing responsive design, real-time feedback, and intuitive user experience. Uses Zustand for efficient state management."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1" fontWeight="bold">Web Worker Processing Engine</Typography>}
                  secondary="Dedicated background threads handle intensive AI computations without blocking the UI. Ensures smooth user interaction even during heavy processing tasks."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1" fontWeight="bold">AI Model Runtime (Transformers.js + ONNX)</Typography>}
                  secondary="Browser-native inference using WebGPU/WebGL acceleration. Supports transformer-based models and ONNX format for maximum compatibility and performance."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1" fontWeight="bold">Canvas Processing Pipeline</Typography>}
                  secondary="Hardware-accelerated image manipulation using Canvas API and OffscreenCanvas for parallel processing. Handles pixel-level operations with optimal performance."
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 2 }}>
              AI Models Integrated
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Model Category</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Model Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Architecture</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Purpose</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Denoising</strong></TableCell>
                    <TableCell>Bilateral Filter Denoising</TableCell>
                    <TableCell>Multi-pass Bilateral Filtering</TableCell>
                    <TableCell>Canvas-based noise removal with edge preservation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Super Resolution</strong></TableCell>
                    <TableCell>Bicubic Upscaling with Sharpening</TableCell>
                    <TableCell>Bicubic Interpolation + Unsharp Mask</TableCell>
                    <TableCell>Canvas-based 1x-4x resolution enhancement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Colorization</strong></TableCell>
                    <TableCell>Semantic Canvas Colorization</TableCell>
                    <TableCell>Sobel Edge + Region Segmentation</TableCell>
                    <TableCell>Canvas-based skin detection and color application</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Inpainting</strong></TableCell>
                    <TableCell>Sobel Edge Inpainting</TableCell>
                    <TableCell>Sobel Filter + Gradient Blending</TableCell>
                    <TableCell>Canvas-based region filling with edge preservation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Object Detection</strong></TableCell>
                    <TableCell>YOLOv11 Nano / DETR ResNet-50</TableCell>
                    <TableCell>ONNX Runtime (80 COCO classes)</TableCell>
                    <TableCell>Detect people, animals, vehicles, objects</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Pose Estimation</strong></TableCell>
                    <TableCell>Canvas Pose Keypoint Detection</TableCell>
                    <TableCell>Skin Tone Analysis + Pattern Recognition</TableCell>
                    <TableCell>Canvas-based keypoint estimation (17 points)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Image Masking</strong></TableCell>
                    <TableCell>Masking & Segmentation Toolkit</TableCell>
                    <TableCell>Canny/Sobel + Morphological Ops</TableCell>
                    <TableCell>Edge detection and region segmentation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Style Transfer</strong></TableCell>
                    <TableCell>Canvas Artistic Style Transfer</TableCell>
                    <TableCell>Canvas Filters (10 artistic styles)</TableCell>
                    <TableCell>Canvas-based artistic transformations</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Image Captioning</strong></TableCell>
                    <TableCell>ViT-GPT2 / BLIP Base / BLIP Large</TableCell>
                    <TableCell>Vision Transformer + GPT-2</TableCell>
                    <TableCell>✅ Real AI - Natural language image descriptions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Background Removal</strong></TableCell>
                    <TableCell>Canvas Saliency Background Removal</TableCell>
                    <TableCell>Edge Detection + Color Segmentation</TableCell>
                    <TableCell>Canvas-based foreground extraction (4 methods)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Image to Sketch</strong></TableCell>
                    <TableCell>Canvas Edge Sketch Conversion</TableCell>
                    <TableCell>Edge Detection + Artistic Filters</TableCell>
                    <TableCell>Canvas-based sketch rendering (5 styles)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Processing Pipeline
            </Typography>

            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>1</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Image Upload & Validation</Typography>
                    <Typography variant="body2" color="text.secondary">
                      User uploads image → File validation (format, size) → Conversion to canvas-compatible format → Dimension extraction
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>2</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Model Loading & Initialization</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Task selection → Model download from CDN/cache → ONNX/Transformers.js initialization → GPU/CPU backend selection → Progress tracking
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>3</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Image Preprocessing</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Image → Canvas conversion → Normalization → Tensor creation → Model-specific transformations → Batching if needed
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>4</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">AI Inference Execution</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Web Worker receives task → Model inference on preprocessed data → GPU-accelerated computation → Output tensor generation
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>5</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Postprocessing & Rendering</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Output tensor → Denormalization → Canvas rendering → Color space conversion → Final image generation → UI update
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Key Technical Innovations
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <MemoryIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">Zero Server Dependency</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      All processing happens client-side using WebAssembly and WebGPU, ensuring complete privacy and eliminating server costs.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <SpeedIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">Progressive Model Loading</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Models downloaded from Hugging Face CDN and cached in IndexedDB for instant reuse.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <BuildIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">Dual AI Runtime System</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Transformers.js for vision-language models + ONNX Runtime for object detection with automatic backend selection.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <TimelineIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">Real-time Progress Tracking</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Live progress updates, detailed diagnostics logging, and step-by-step processing visualization.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

      {selectedTab === 2 && (
        <Box>
          {/* Feature Cards - Model Categories */}
          {Object.entries(taskCategories).map(([category, tasks]) => (
            <Box key={category} sx={{ mb: 5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                  {category}
                </Typography>
                <IconButton 
                  onClick={() => toggleCategory(category)}
                  sx={{ 
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.1)',
                    }
                  }}
                >
                  {expandedCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Stack>
              <Collapse in={expandedCategories[category]}>
              <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {tasks.map((task) => {
                  const model = MODELS[task];
                  const Icon = taskIcons[task];
                  
                  return (
                    <Grid 
                      size={{ xs: 12, md: 6, lg: 4 }}
                      key={task}
                      sx={{
                        display: 'flex',
                        flexBasis: {
                          xs: '100%',
                          md: 'calc(50% - 12px)',
                          lg: 'calc(33.333% - 16px)'
                        },
                        maxWidth: {
                          xs: '100%',
                          md: 'calc(50% - 12px)',
                          lg: 'calc(33.333% - 16px)'
                        },
                        flexGrow: 0,
                        flexShrink: 0,
                      }}
                    >
                      <Card
                        onClick={() => {
                          setCurrentTask(task);
                          setCurrentTab(TABS.INFORMATION);
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          minHeight: 600,
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: 6,
                          },
                          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                          border: '1px solid',
                          borderColor: 'primary.main',
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Header */}
                          <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
                            <Avatar
                              sx={{
                                bgcolor: 'white',
                                width: 56,
                                height: 56,
                              }}
                            >
                              <Icon fontSize="large" sx={{ color: 'primary.main' }} />
                            </Avatar>
                            <Box flex={1}>
                              <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {model.name}
                              </Typography>
                              <Chip
                                label={task.toUpperCase()}
                                size="small"
                                sx={{
                                  bgcolor: 'primary.dark',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '0.7rem',
                                }}
                              />
                            </Box>
                          </Stack>

                          {/* Description */}
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {model.description}
                          </Typography>

                          <Divider sx={{ my: 2 }} />

                          {/* Technical Details */}
                          <Box sx={{ mb: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                              <BuildIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                Model Architecture
                              </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {model.id}
                            </Typography>
                          </Box>

                          {/* Processing Steps */}
                          <Box sx={{ mb: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                              <SettingsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                Processing Pipeline
                              </Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                              <Typography variant="caption" color="text.secondary">
                                1. {model.processingSteps.loading.substring(0, 60)}...
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                2. {model.processingSteps.processing.substring(0, 60)}...
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                3. {model.processingSteps.generating.substring(0, 60)}...
                              </Typography>
                            </Stack>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* Features */}
                          <Box sx={{ mb: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                              <StarsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                Key Features
                              </Typography>
                            </Stack>
                            <Stack direction="row" flexWrap="wrap" gap={0.5}>
                              {model.features.slice(0, 3).map((feature, idx) => (
                                <Chip
                                  key={idx}
                                  label={feature}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                              {model.features.length > 3 && (
                                <Chip
                                  label={`+${model.features.length - 3} more`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              )}
                            </Stack>
                          </Box>

                          {/* Use Cases */}
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                              <LightbulbIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                Use Cases
                              </Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                              {model.useCases.slice(0, 2).map((useCase, idx) => (
                                <Typography key={idx} variant="caption" color="text.secondary">
                                  • {useCase}
                                </Typography>
                              ))}
                            </Stack>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              </Collapse>
            </Box>
          ))}
        </Box>
      )}

      {selectedTab === 3 && (
        <Box>
          {/* Technical Specifications */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: 3,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: 'white', width: 40, height: 40 }}>
                <RocketIcon sx={{ fontSize: 24, color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                Technical Specifications
              </Typography>
            </Stack>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <CodeIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Processing Engine
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Canvas API with OffscreenCanvas for parallel processing
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <ComputerIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Compute Backend
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Web Worker-based CPU processing with real-time progress tracking
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <ArchitectureIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Architecture
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      React 19 + Vite + Material-UI v7 + Zustand state management
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <PsychologyIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      AI Framework
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Transformers.js v2.17.2 for browser-based machine learning inference
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <VisibilityIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Computer Vision
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Canny/Sobel edge detection, semantic region segmentation, saliency detection
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <StyleIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Generative AI
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stable Diffusion inpainting, VGG19 style transfer, Photo2Sketch GAN
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <ImageSearchIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Image Processing
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bilateral filtering, unsharp masking, morphological operations, color harmonization
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <MemoryIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Model Runtime
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ONNX Runtime Web with WebGPU/WebGL/WASM backends
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <SpeedIcon sx={{ color: 'white', fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Performance Optimizations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Model caching, lazy loading, progressive enhancement
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

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
  AutoAwesome as AutoAwesomeIcon,
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
} from '@mui/icons-material';
import { useState } from 'react';
import { TASKS, MODELS, TABS } from '../lib/constants';
import { useAppStore } from '../store/appStore';
import PixieLogo from './PixieLogo';

const taskIcons = {
  [TASKS.DENOISING]: AutoFixHighIcon,
  [TASKS.SUPER_RESOLUTION]: HighQualityIcon,
  [TASKS.COLORIZATION]: PaletteIcon,
  [TASKS.INPAINTING]: BrushIcon,
  [TASKS.OBJECT_DETECTION]: CameraAltIcon,
  [TASKS.POSE_ESTIMATION]: AccessibilityNewIcon,
  [TASKS.IMAGE_MASKING]: LayersIcon,
  [TASKS.STYLE_TRANSFER]: StyleIcon,
  [TASKS.AI_IMAGE_GEN]: AutoAwesomeIcon,
  [TASKS.BG_REMOVAL]: RemoveCircleOutlineIcon,
  [TASKS.IMAGE_TO_SKETCH]: DrawIcon,
};

const taskCategories = {
  'Image Enhancement': [TASKS.DENOISING, TASKS.SUPER_RESOLUTION, TASKS.COLORIZATION, TASKS.INPAINTING],
  'Computer Vision': [TASKS.OBJECT_DETECTION, TASKS.POSE_ESTIMATION, TASKS.IMAGE_MASKING],
  'Generative AI': [TASKS.STYLE_TRANSFER, TASKS.AI_IMAGE_GEN, TASKS.BG_REMOVAL, TASKS.IMAGE_TO_SKETCH],
};

export default function Dashboard() {
  const { setCurrentTask, setCurrentTab } = useAppStore();
  const [expandedCategories, setExpandedCategories] = useState({
    'Image Enhancement': true,
    'Computer Vision': true,
    'Generative AI': true,
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
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
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MemoryIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>AI Models</Typography>
                <Typography variant="h5" fontWeight="bold">Multiple</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SpeedIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>Processing</Typography>
                <Typography variant="h5" fontWeight="bold">Real-Time</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
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

      {/* Model Categories */}
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
                  item 
                  xs={12} 
                  md={6} 
                  lg={4} 
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

      {/* Technical Specifications */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <ArchitectureIcon sx={{ color: 'white', fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  Architecture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  React 18 + Vite + Material-UI + Zustand state management
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <PsychologyIcon sx={{ color: 'white', fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  AI Framework
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transformers.js for browser-based machine learning inference
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <VisibilityIcon sx={{ color: 'white', fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  Computer Vision
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Edge detection, skin tone analysis, salient region detection
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <AutoAwesomeIcon sx={{ color: 'white', fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  Generative AI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  VGG19-inspired style transfer, GAN-based sketch generation
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <ImageSearchIcon sx={{ color: 'white', fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  Image Processing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bilateral filtering, Gaussian blur, morphological operations
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

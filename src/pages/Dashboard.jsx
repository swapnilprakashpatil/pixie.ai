import { Box, Typography, Container } from '@mui/material';
import TaskView from '../components/TaskView';
import DashboardComponent from '../components/Dashboard';
import { useAppStore } from '../store/appStore';
import { TASKS } from '../lib/constants';

const taskTitles = {
  [TASKS.DENOISING]: 'Image Denoising',
  [TASKS.SUPER_RESOLUTION]: 'Super-Resolution Enhancement',
  [TASKS.COLORIZATION]: 'Image Colorization',
  [TASKS.INPAINTING]: 'Image Inpainting & Restoration',
  [TASKS.OBJECT_DETECTION]: 'Object Detection',
  [TASKS.POSE_ESTIMATION]: 'Human Pose Estimation',
  [TASKS.IMAGE_MASKING]: 'Image Masking & Segmentation',
  [TASKS.STYLE_TRANSFER]: 'Neural Style Transfer',
  [TASKS.AI_IMAGE_GEN]: 'AI Image Generation',
  [TASKS.BG_REMOVAL]: 'Background Removal',
  [TASKS.IMAGE_TO_SKETCH]: 'Image to Sketch',
};

const taskDescriptions = {
  [TASKS.DENOISING]: 'Remove noise and artifacts from images while preserving important details',
  [TASKS.SUPER_RESOLUTION]: 'Enhance image resolution and quality using AI-powered upscaling',
  [TASKS.COLORIZATION]: 'Automatically add realistic colors to grayscale or black-and-white images',
  [TASKS.INPAINTING]: 'Fill in missing or damaged parts of images with AI-generated content',
  [TASKS.OBJECT_DETECTION]: 'Detect and classify objects in images with bounding boxes and labels',
  [TASKS.POSE_ESTIMATION]: 'Estimate human body keypoints and skeleton structure',
  [TASKS.IMAGE_MASKING]: 'Apply various masking techniques for image segmentation',
  [TASKS.STYLE_TRANSFER]: 'Transform photos into artistic masterpieces with neural style transfer',
  [TASKS.AI_IMAGE_GEN]: 'Generate stunning variations of your images using AI',
  [TASKS.BG_REMOVAL]: 'Intelligently remove backgrounds with pixel-perfect accuracy',
  [TASKS.IMAGE_TO_SKETCH]: 'Convert photos into artistic pencil sketches',
};

export default function Dashboard() {
  const { currentTask } = useAppStore();

  // Show dashboard component for dashboard task
  if (currentTask === TASKS.DASHBOARD) {
    return <DashboardComponent />;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {taskTitles[currentTask]}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {taskDescriptions[currentTask]}
        </Typography>
      </Box>
      <TaskView />
    </Container>
  );
}

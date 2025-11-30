import { Paper, Typography, Box, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useAppStore } from '../store/appStore';
import { MODELS } from '../lib/constants';

export default function InformationTab() {
  const { currentTask } = useAppStore();
  const modelInfo = MODELS[currentTask];

  if (!modelInfo) return null;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {modelInfo.name}
      </Typography>

      <Typography variant="body1" paragraph color="text.secondary">
        {modelInfo.description}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Model Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip label={`Model ID: ${modelInfo.id}`} variant="outlined" />
          <Chip label={`Task: ${modelInfo.task}`} variant="outlined" color="primary" />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Key Features
        </Typography>
        <List dense>
          {modelInfo.features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${feature}`} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Limitations
        </Typography>
        <List dense>
          {modelInfo.limitations.map((limitation, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${limitation}`} sx={{ color: 'text.secondary' }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Use Cases
        </Typography>
        <List dense>
          {modelInfo.useCases.map((useCase, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${useCase}`} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 1 }}>
        <Typography variant="body2" color="info.dark">
          <strong>Note:</strong> This model runs entirely in your browser using Transformers.js and WebGPU/WebAssembly.
          No data is sent to external servers.
        </Typography>
      </Box>
    </Paper>
  );
}

import React from 'react';
import { Alert, AlertTitle, Box, Chip, Stepper, Step, StepLabel, StepContent, Typography, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppStore } from '../store/appStore';
import { MODELS } from '../lib/constants';

export default function DemoModeNotice() {
  const { processing, modelLoading, currentTask, loadProgress = 0, processingProgress = 0 } = useAppStore();
  const [activeStep, setActiveStep] = React.useState(-1);
  const [hasProcessed, setHasProcessed] = React.useState(false);

  // Get current model configuration
  const modelConfig = MODELS[currentTask];
  const processingSteps = modelConfig?.processingSteps || {
    loading: "Initializing AI model and loading weights into memory",
    processing: "Applying neural network transformations to enhance your image",
    generating: "Finalizing the enhanced image and preparing it for display"
  };

  React.useEffect(() => {
    if (!processing && !modelLoading) {
      if (activeStep >= 0) {
        // Processing just completed, show all steps as done
        setActiveStep(3);
        setHasProcessed(true);
      }
    } else if (modelLoading) {
      setActiveStep(0);
    } else if (processing) {
      setActiveStep(1);
    }
  }, [processing, modelLoading, activeStep]);

  const steps = [
    {
      label: `Loading AI Model: ${modelConfig?.name || 'Neural Network'}`,
      description: processingSteps.loading,
    },
    {
      label: 'Processing Image',
      description: processingSteps.processing,
    },
    {
      label: 'Generating Result',
      description: processingSteps.generating,
    },
  ];

  if (processing || modelLoading || hasProcessed) {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity={hasProcessed && !processing && !modelLoading ? "success" : "info"} icon={<CheckCircleIcon />}>
          <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {hasProcessed && !processing && !modelLoading ? 'AI Processing Complete' : 'AI Processing Pipeline'}
            <Chip label={hasProcessed && !processing && !modelLoading ? "Complete" : "Active"} size="small" color={hasProcessed && !processing && !modelLoading ? "success" : "primary"} />
          </AlertTitle>
        </Alert>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2, ml: 2 }}>
          {steps.map((step, index) => (
            <Step key={step.label} expanded={true}>
              <StepLabel>
                <Typography variant="subtitle2">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {step.description}
                </Typography>
                {/* Show progress bar for active steps */}
                {index === 0 && modelLoading && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={loadProgress} sx={{ mb: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {loadProgress}% loaded
                    </Typography>
                  </Box>
                )}
                {index === 1 && processing && !modelLoading && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={processingProgress} sx={{ mb: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {processingProgress}% processed
                    </Typography>
                  </Box>
                )}
                {index === 2 && processing && processingProgress >= 100 && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="indeterminate" sx={{ mb: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      Finalizing...
                    </Typography>
                  </Box>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }

  return (
    <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircleIcon />}>
      <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        AI Mode Ready
        <Chip label="WebGPU Active" size="small" color="success" />
      </AlertTitle>
      <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
        Upload an image and click "Process Image" to start AI processing.
      </Box>
    </Alert>
  );
}

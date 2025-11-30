import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppStore } from '../store/appStore';
import { detectCapabilities, getGPUInfo, getMemoryInfo, formatTime, formatBytes } from '../lib/utils';

export default function DiagnosticsTab() {
  const { logs, clearLogs, performanceMetrics } = useAppStore();
  const [systemInfo, setSystemInfo] = useState(null);
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    loadSystemInfo();
    const interval = setInterval(() => {
      setMemoryInfo(getMemoryInfo());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const loadSystemInfo = async () => {
    const capabilities = detectCapabilities();
    const gpuInfo = await getGPUInfo();
    setSystemInfo({ ...capabilities, gpu: gpuInfo });
    setMemoryInfo(getMemoryInfo());
  };

  const handleClearCache = () => {
    if (window.confirm('This will clear all cached models. Continue?')) {
      // Clear IndexedDB cache
      if ('indexedDB' in window) {
        indexedDB.databases().then((dbs) => {
          dbs.forEach((db) => {
            if (db.name.includes('transformers')) {
              indexedDB.deleteDatabase(db.name);
            }
          });
        });
      }
      alert('Cache cleared. Please reload the page.');
    }
  };

  const handleExportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      systemInfo,
      memoryInfo,
      performanceMetrics,
      logs,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagnostic-report-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!systemInfo) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Loading diagnostics...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        System Diagnostics
      </Typography>

      <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>AI Mode Active:</strong> Transformers.js is enabled and ready to process images with real AI models.
          WebGPU acceleration is available for optimal performance.
        </Typography>
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Browser Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Browser"
                    secondary={`${systemInfo.browser.name} ${systemInfo.browser.version}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Platform" secondary={systemInfo.platform} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="User Agent"
                    secondary={systemInfo.browser.userAgent}
                    secondaryTypographyProps={{ sx: { wordBreak: 'break-all' } }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Capabilities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {systemInfo.webGPU ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                  <Typography>WebGPU Support</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {systemInfo.webAssembly ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                  <Typography>WebAssembly Support</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {systemInfo.webWorkers ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                  <Typography>Web Workers Support</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {systemInfo.indexedDB ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                  <Typography>IndexedDB Support</Typography>
                </Box>
                {systemInfo.maxTextureSize && (
                  <Typography variant="body2" color="text.secondary">
                    Max Texture Size: {systemInfo.maxTextureSize}px
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {systemInfo.gpu && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  GPU Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Vendor" secondary={systemInfo.gpu.vendor} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Device" secondary={systemInfo.gpu.device} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Description" secondary={systemInfo.gpu.description} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Model Load Time"
                    secondary={
                      performanceMetrics.modelLoadTime
                        ? formatTime(performanceMetrics.modelLoadTime)
                        : 'Not available'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Inference Time"
                    secondary={
                      performanceMetrics.inferenceTime
                        ? formatTime(performanceMetrics.inferenceTime)
                        : 'Not available'
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Memory Usage
              </Typography>
              {memoryInfo ? (
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Used JS Heap"
                      secondary={memoryInfo.usedJSHeapSize}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Total JS Heap"
                      secondary={memoryInfo.totalJSHeapSize}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="JS Heap Limit"
                      secondary={memoryInfo.jsHeapSizeLimit}
                    />
                  </ListItem>
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Memory information not available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button startIcon={<RefreshIcon />} onClick={loadSystemInfo} variant="outlined">
          Refresh
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={handleClearCache} variant="outlined">
          Clear Model Cache
        </Button>
        <Button startIcon={<DownloadIcon />} onClick={handleExportReport} variant="outlined">
          Export Report
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Event Logs</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                startIcon={<ContentCopyIcon />}
                onClick={() => {
                  const logText = logs.map(log => 
                    `[${new Date(log.timestamp).toLocaleTimeString()}] [${log.type.toUpperCase()}] ${log.message}`
                  ).join('\n');
                  navigator.clipboard.writeText(logText).then(() => {
                    alert('Logs copied to clipboard!');
                  });
                }}
                disabled={logs.length === 0}
              >
                Copy Logs
              </Button>
              <Button size="small" onClick={clearLogs} disabled={logs.length === 0}>
                Clear Logs
              </Button>
            </Box>
          </Box>
          {logs.length === 0 ? (
            <Alert severity="info">No logs available</Alert>
          ) : (
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {logs.map((log, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: 'background.default',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                    <Chip
                      label={log.type}
                      size="small"
                      color={
                        log.type === 'error'
                          ? 'error'
                          : log.type === 'success'
                          ? 'success'
                          : 'default'
                      }
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{log.message}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Alert severity="warning">
          <Typography variant="body2">
            <strong>Browser Compatibility:</strong> For best performance, use Chrome 113+ or Edge 113+ with WebGPU support enabled.
          </Typography>
        </Alert>
      </Box>
    </Paper>
  );
}

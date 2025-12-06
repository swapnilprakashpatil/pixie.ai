import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Toolbar, AppBar, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import PaletteIcon from '@mui/icons-material/Palette';
import BrushIcon from '@mui/icons-material/Brush';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LayersIcon from '@mui/icons-material/Layers';
import StyleIcon from '@mui/icons-material/Style';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DrawIcon from '@mui/icons-material/Draw';
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { TASKS, TABS } from '../lib/constants';
import PixieLogo from './PixieLogo';

const drawerWidth = 280;
const miniDrawerWidth = 64;

const taskIcons = {
  [TASKS.DASHBOARD]: <DashboardIcon />,
  [TASKS.DENOISING]: <AutoFixHighIcon />,
  [TASKS.SUPER_RESOLUTION]: <HighQualityIcon />,
  [TASKS.COLORIZATION]: <PaletteIcon />,
  [TASKS.INPAINTING]: <BrushIcon />,
  [TASKS.OBJECT_DETECTION]: <CameraAltIcon />,
  [TASKS.POSE_ESTIMATION]: <AccessibilityNewIcon />,
  [TASKS.IMAGE_MASKING]: <LayersIcon />,
  [TASKS.STYLE_TRANSFER]: <StyleIcon />,
  [TASKS.IMAGE_CLASSIFICATION]: <ImageSearchIcon />,
  [TASKS.BG_REMOVAL]: <RemoveCircleOutlineIcon />,
  [TASKS.IMAGE_TO_SKETCH]: <DrawIcon />,
};

const taskLabels = {
  [TASKS.DASHBOARD]: 'Dashboard',
  [TASKS.DENOISING]: 'Denoising',
  [TASKS.SUPER_RESOLUTION]: 'Super-Resolution',
  [TASKS.COLORIZATION]: 'Colorization',
  [TASKS.INPAINTING]: 'Inpainting',
  [TASKS.OBJECT_DETECTION]: 'Object Detection',
  [TASKS.POSE_ESTIMATION]: 'Pose Estimation',
  [TASKS.IMAGE_MASKING]: 'Image Masking',
  [TASKS.STYLE_TRANSFER]: 'Style Transfer',
  [TASKS.IMAGE_CLASSIFICATION]: 'Image Classification',
  [TASKS.BG_REMOVAL]: 'Background Removal',
  [TASKS.IMAGE_TO_SKETCH]: 'Image to Sketch',
};

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const { currentTask, setCurrentTask, setCurrentTab, resetImageState } = useAppStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  const handleTaskChange = (task) => {
    if (task !== currentTask) {
      resetImageState();
      setCurrentTask(task);
    }
    setCurrentTab(TABS.INFORMATION);
    setMobileOpen(false);
  };

  const currentDrawerWidth = sidebarMinimized ? miniDrawerWidth : drawerWidth;

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', overflow: 'hidden' }}>
      <Toolbar sx={{ 
        bgcolor: 'transparent', 
        color: 'white',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'primary.main',
        justifyContent: 'space-between',
        px: sidebarMinimized ? 1 : 2,
        minWidth: 0,
        overflow: 'hidden',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
          {!sidebarMinimized && (
            <>
              <PixieLogo size={56} fontSize="2rem" />
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography variant="h5" fontWeight="bold" component="div" sx={{ lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                  pixie.ai
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, whiteSpace: 'nowrap' }}>
                  AI Image Processing
                </Typography>
              </Box>
            </>
          )}
          {sidebarMinimized && (
            <PixieLogo size={40} fontSize="1.5rem" />
          )}
        </Box>
        
        {/* Toggle Button in Header */}
        <IconButton 
          onClick={handleSidebarToggle}
          size="small"
          sx={{ 
            color: 'primary.main',
            flexShrink: 0,
            '&:hover': {
              bgcolor: 'rgba(102, 126, 234, 0.1)',
            }
          }}
        >
          {sidebarMinimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      
      <List sx={{ flex: 1, py: 2 }}>
        {Object.values(TASKS).map((task, index) => (
          <ListItem key={task} disablePadding sx={{ mb: 0.5, px: 1 }}>
            <ListItemButton
              selected={currentTask === task}
              onClick={() => handleTaskChange(task)}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s ease',
                justifyContent: sidebarMinimized ? 'center' : 'flex-start',
                px: sidebarMinimized ? 1 : 2,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                  borderLeft: sidebarMinimized ? 'none' : '3px solid #667eea',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  transform: sidebarMinimized ? 'none' : 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: currentTask === task ? '#667eea' : 'text.secondary',
                minWidth: sidebarMinimized ? 'auto' : 40,
              }}>
                {taskIcons[task]}
              </ListItemIcon>
              {!sidebarMinimized && (
                <ListItemText 
                  primary={taskLabels[task]}
                  primaryTypographyProps={{
                    fontWeight: currentTask === task ? 600 : 400,
                    fontSize: '0.9rem',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { sm: `${currentDrawerWidth}px` },
          display: { sm: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
                pixie.ai
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: currentDrawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: currentDrawerWidth,
              transition: 'width 0.3s ease',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          mt: { xs: 8, sm: 0 },
          bgcolor: 'background.default',
          minHeight: '100vh',
          transition: 'width 0.3s ease, margin 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

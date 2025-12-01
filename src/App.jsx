import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea', // Purple-blue gradient color
      light: '#818cf8',
      dark: '#4c51bf',
    },
    secondary: {
      main: '#764ba2', // Purple accent
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    background: {
      default: '#0f172a', // Slate 900
      paper: '#1e293b', // Slate 800
    },
    success: {
      main: '#10b981', // Softer green
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: '#3b82f6', // Softer blue
      light: '#60a5fa',
      dark: '#2563eb',
    },
    warning: {
      main: '#f59e0b', // Softer amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444', // Softer red
    },
    text: {
      primary: '#f1f5f9', // Slate 100
      secondary: '#94a3b8', // Slate 400
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.3px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.2px',
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e293b',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        },
        outlined: {
          border: '1px solid rgba(102, 126, 234, 0.2)',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0f172a',
          borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f172a',
          borderRight: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: '#34d399',
        },
        standardInfo: {
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          color: '#60a5fa',
        },
        standardWarning: {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          color: '#fbbf24',
        },
        standardError: {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          color: '#f87171',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(148, 163, 184, 0.2)',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#3b82f6',
          },
          '&.Mui-completed': {
            color: '#10b981',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(148, 163, 184, 0.08)',
          },
        },
      },
    },
  },
});

function App() {
  const basename = import.meta.env.MODE === 'production' ? '/pixie.ai' : '/';
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

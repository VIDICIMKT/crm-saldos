import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      light: '#e6f0ff',
    },
    secondary: {
      main: '#3f37c9',
    },
    background: {
      default: '#f8fafc',
    },
    success: {
      main: '#4cc9f0',
    },
    info: {
      main: '#4895ef',
    },
    warning: {
      main: '#f8961e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
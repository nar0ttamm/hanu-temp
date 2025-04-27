import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Yellow
    },
    secondary: {
      main: '#C0C0C0', // Silver/Grey
    },
    tertiary: {
      main: '#CD7F32', // Bronze/Brown
    },
    accent1: {
      main: '#FF8C00', // Dark Orange
    },
    accent2: {
      main: '#FF4500', // Red-Orange
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
  },
});

export default theme; 
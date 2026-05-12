import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAC898',
      light: '#FFE0C0',
      dark: '#E8A870',
    },
    secondary: {
      main: '#FFD4B0',
      light: '#FFE8CC',
      dark: '#E8B888',
    },
    background: {
      default: '#FFF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D2D44',
      secondary: '#6B6B8A',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 16px rgba(250, 200, 152, 0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'linear-gradient(135deg, #FFF8F0 0%, #FDE8D8 50%, #FFF0F0 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
})

export default theme

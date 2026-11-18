import { createTheme } from '@mui/material/styles'

// Bookies "Apple edition" tokens — white, gray bands, big SF type, one blue.
const ink = '#1d1d1f' // primary text (Apple's near-black)
const slate = '#6e6e73' // secondary text
const grayBand = '#f5f5f7' // alternate sections, image wells
const hairline = '#d2d2d7' // dividers
const blue = '#0071e3' // the accent
const blueHover = '#0077ed'
const disabled = '#86868b'

const systemStack =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue,
      dark: blueHover,
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: ink,
      secondary: slate,
      disabled: disabled,
    },
    divider: hairline,
    error: {
      main: '#E30000',
      dark: '#C00000',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: systemStack,
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.25,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.05rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              transitionDuration: '0.01ms !important',
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: 'none',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          backgroundImage: 'none',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '980px',
          textTransform: 'none',
          fontWeight: 500,
          paddingLeft: 20,
          paddingRight: 20,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          '&:hover': { backgroundColor: blueHover },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '980px',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#E8E8ED',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: grayBand,
          borderRadius: 9,
          overflow: 'hidden',
          border: 'none',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          border: 'none',
          '&.Mui-selected': {
            backgroundColor: '#FFFFFF',
            color: ink,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
})

export default theme

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { fontSize: '1.6rem' } },
    },
    MuiTab: { styleOverrides: { root: { fontSize: '1.6rem' } } },
    MuiSvgIcon: { styleOverrides: { root: { width: '2rem', height: '2rem' } } },
  },
  typography: {
    fontSize: 16,
    button: {
      textTransform: 'none',
    },
    fontFamily: [
      'Averta-Regular',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;

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

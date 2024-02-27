'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A3776',
      dark: '#111A46',
      light: '#27399F',
    },
    error: {
      main: '#EC4E4E',
    },
    warning: {
      main: '#F7B73A',
    },
    info: {
      main: '#286BD0',
    },
    success: {
      main: '#19B571',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;

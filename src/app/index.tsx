import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from 'app/layouts/rootLayout';
import theme from 'themes/muiTheme';

const queryClient = new QueryClient();

export function App() {
  const { i18n } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Helmet
          defaultTitle="Template App"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Template App" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <RootLayout />
          </StyledEngineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

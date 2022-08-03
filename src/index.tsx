import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import GolobalStyles from 'styles/GlobalStyles';
import ErrorBoundary from 'utils/ErrorBoundary';

// Import root app
import { App } from 'app';

// Initialize languages
import './locales/i18n';
import { store } from 'stores';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store} context={ReactReduxContext}>
    <React.StrictMode>
      <HelmetProvider>
        <GolobalStyles>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </GolobalStyles>
      </HelmetProvider>
    </React.StrictMode>
  </Provider>,
);

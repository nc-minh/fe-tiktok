import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import RootLayout from 'app/layouts/rootLayout';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter basename="/">
      <Helmet
        defaultTitle="Template App"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Template App" />
      </Helmet>
      <RootLayout />
    </BrowserRouter>
  );
}

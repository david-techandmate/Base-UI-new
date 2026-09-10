import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PrefsProvider } from './showcase/prefs';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/shell.css';
import './styles/components/accordion.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Missing #root element');
}

createRoot(container).render(
  <React.StrictMode>
    <PrefsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrefsProvider>
  </React.StrictMode>,
);

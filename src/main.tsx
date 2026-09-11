import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PrefsProvider } from './showcase/prefs';

// The design system: reset, tokens, primitives, and every component.
import './styles/index.css';
// Showroom chrome only — delete this when using the repo as a starting point.
import './showcase/showroom.css';

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

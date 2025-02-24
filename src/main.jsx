import './index.css';

import { StrictMode } from 'react';

import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from './App.jsx';
import { store } from './app/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
  <StrictMode>
  <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </StrictMode>
  </BrowserRouter>
  </Provider>
)

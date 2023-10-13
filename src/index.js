import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import ThemeProvider from "./Theme";
import { AuthProvider } from './providers/AuthProvider';
import { ContractProvider } from './providers/ContractProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider>
      <AuthProvider>
        <ContractProvider>
          <App />
        </ContractProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

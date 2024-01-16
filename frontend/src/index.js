import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

//* native theme imports 
import theme from './theme'

//* router dom imports 
import { BrowserRouter } from 'react-router-dom';

//* MUI components imports 
import { ThemeProvider } from "@emotion/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

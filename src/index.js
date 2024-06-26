import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

//* native theme imports 
import theme from './theme'

//* router dom imports 
import { BrowserRouter } from 'react-router-dom';

//* MUI components imports 
import { ThemeProvider } from "@emotion/react"

// * Auth context provider
import { AuthProvider } from "./hooks/useAuth"

// * query client 
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

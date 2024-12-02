import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
	<BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes/>
    </ThemeProvider>
	</BrowserRouter>
  </React.StrictMode>,
);

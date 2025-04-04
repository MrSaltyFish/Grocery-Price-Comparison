import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DealsPage from './pages/DealsPage';
import ComparePage from './pages/ComparePage';
import StoresPage from './pages/StoresPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green color
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFA000', // Amber color
      light: '#FFB74D',
      dark: '#FF8F00',
      contrastText: '#000',
    },
    background: {
      default: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

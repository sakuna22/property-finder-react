/**
 * App.jsx - Main Application Component
 * 
 * This is the root component of the Estate Agent Application.
 * It provides:
 * - Theme configuration using Material-UI ThemeProvider
 * - Client-side routing with React Router
 * - Global layout structure (Header, Main Content, Footer)
 * 
 * Routes:
 * - "/" : SearchPage - Property search and listing page
 * - "/property/:id" : PropertyPage - Individual property details
 * 
 * @component
 * @author Estate Agent App
 * @version 1.0.0
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';

/**
 * Main App component that wraps the entire application
 * with necessary providers and layout structure.
 * 
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides consistent baseline styles across browsers */}
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {/* Global Header with navigation */}
          <Header />
          
          {/* Main content area - grows to fill available space */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Home/Search page route */}
              <Route path="/" element={<SearchPage />} />
              {/* Individual property page route with dynamic ID */}
              <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
          </Box>
          
          {/* Global Footer */}
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

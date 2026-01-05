/**
 * Vite Configuration for Estate Agent Application
 * 
 * This configuration file sets up:
 * - React plugin for JSX/TSX support
 * - Development server configuration
 * - Build output configuration for deployment
 * 
 * @see https://vitejs.dev/config/
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // React plugin for Fast Refresh and JSX transform
  plugins: [react()],
  
  // Base public path for deployment
  base: '/',
  
  // Development server configuration
  server: {
    // Allow ngrok URLs for development testing
    allowedHosts: ['.ngrok-free.app'],
    // Default port for dev server
    port: 5173,
    // Open browser on server start
    open: true,
  },
  
  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Generate source maps for debugging
    sourcemap: true,
    // Rollup options for chunking
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React ecosystem
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI library chunk
          mui: ['@mui/material', '@mui/icons-material'],
          // State management chunk
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  
  // Preview server configuration (for testing production build locally)
  preview: {
    port: 4173,
    open: true,
  },
})

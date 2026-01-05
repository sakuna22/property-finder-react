/**
 * SearchPage.jsx - Main Search and Results Page Component
 * 
 * This page component provides:
 * - Property search functionality with filters
 * - Property listing display in a responsive grid
 * - Drag and drop functionality to add properties to favourites
 * - Favourites sidebar for quick access to saved properties
 * 
 * Features:
 * - Integrates @dnd-kit/core for drag and drop
 * - Uses Redux for state management
 * - Responsive layout (3-column on desktop, stacked on mobile)
 * 
 * @component
 * @requires react
 * @requires react-redux
 * @requires @dnd-kit/core
 * @author Estate Agent App
 * @version 1.0.0
 */
import React, { useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import { DndContext, pointerWithin, DragOverlay } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../components/SearchForm';
import PropertyList from '../components/PropertyList';
import PropertyCard from '../components/PropertyCard';
import FavouritesSidebar from '../components/FavouritesSidebar';
import { addToFavourites } from '../store/slices/favouritesSlice';

/**
 * SearchPage component - Renders the main search interface
 * 
 * @returns {JSX.Element} The search page with property listings and favourites
 */
const SearchPage = () => {
  const dispatch = useDispatch();
  
  // Track which property is currently being dragged
  const [activeId, setActiveId] = useState(null);
  
  // Get filtered properties and favourites from Redux store
  const filteredProperties = useSelector((state) => state.properties.filteredProperties);
  const favourites = useSelector((state) => state.favourites.items);

  /**
   * Handler for drag start event
   * Sets the active item ID for visual feedback
   * 
   * @param {Object} event - DnD kit drag start event
   */
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  /**
   * Handler for drag end event
   * Adds property to favourites if dropped on the favourites zone
   * 
   * @param {Object} event - DnD kit drag end event
   */
  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);

    // Check if dropped over the favourites drop zone
    if (over && over.id === 'favourites-drop-zone') {
      const property = active.data.current;
      
      // Prevent duplicate favourites
      const alreadyFavourite = favourites.some((fav) => fav.id === property.id);
      if (!alreadyFavourite) {
        dispatch(addToFavourites(property));
      }
    }
  };

  // Find the active property for the drag overlay
  const activeProperty = filteredProperties.find((p) => p.id === activeId);

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search Form Section - Filter properties */}
        <SearchForm />

        {/* Main Content Grid - Property results and favourites sidebar */}
        <Grid container spacing={3}>
          {/* Property Results Section - 9 columns on large screens */}
          <Grid size={{ xs: 12, lg: 9 }}>
            <PropertyList
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              activeId={activeId}
            />
          </Grid>

          {/* Favourites Sidebar - 3 columns on large screens */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <FavouritesSidebar />
          </Grid>
        </Grid>
      </Container>

      {/* Drag Overlay - Shows property card while dragging */}
      <DragOverlay>
        {activeId && activeProperty ? (
          <Box sx={{ width: 300, opacity: 0.85, transform: 'rotate(3deg)' }}>
            <PropertyCard property={activeProperty} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SearchPage;

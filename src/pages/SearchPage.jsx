import React, { useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import { DndContext, pointerWithin, DragOverlay } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../components/SearchForm';
import PropertyList from '../components/PropertyList';
import PropertyCard from '../components/PropertyCard';
import FavouritesSidebar from '../components/FavouritesSidebar';
import { addToFavourites } from '../store/slices/favouritesSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null);
  const filteredProperties = useSelector((state) => state.properties.filteredProperties);
  const favourites = useSelector((state) => state.favourites.items);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);

    if (over && over.id === 'favourites-drop-zone') {
      const property = active.data.current;
      // Check if already in favourites
      const alreadyFavourite = favourites.some((fav) => fav.id === property.id);
      if (!alreadyFavourite) {
        dispatch(addToFavourites(property));
      }
    }
  };

  const activeProperty = filteredProperties.find((p) => p.id === activeId);

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search Form */}
        <SearchForm />

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Property Results */}
          <Grid size={{ xs: 12, lg: 9 }}>
            <PropertyList
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              activeId={activeId}
            />
          </Grid>

          {/* Favourites Sidebar */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <FavouritesSidebar />
          </Grid>
        </Grid>
      </Container>

      {/* Drag Overlay */}
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

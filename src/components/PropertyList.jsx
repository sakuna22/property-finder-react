import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid, Paper, Alert } from '@mui/material';
import PropertyCard from './PropertyCard';
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { addToFavourites } from '../store/slices/favouritesSlice';

const PropertyList = ({ onDragStart, onDragEnd, activeId }) => {
  const filteredProperties = useSelector((state) => state.properties.filteredProperties);
  const activeProperty = filteredProperties.find((p) => p.id === activeId);

  if (filteredProperties.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          backgroundColor: '#f8f9fa',
        }}
      >
        <Alert severity="info" sx={{ justifyContent: 'center' }}>
          <Typography variant="h6">No properties found</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Try adjusting your search criteria to find more properties.
          </Typography>
        </Alert>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: 'secondary.main',
        }}
      >
        {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
      </Typography>

      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={property.id}>
            <PropertyCard property={property} isDragging={property.id === activeId} />
          </Grid>
        ))}
      </Grid>

      <DragOverlay>
        {activeId && activeProperty ? (
          <Box sx={{ width: 300, opacity: 0.9 }}>
            <PropertyCard property={activeProperty} />
          </Box>
        ) : null}
      </DragOverlay>
    </Box>
  );
};

export default PropertyList;

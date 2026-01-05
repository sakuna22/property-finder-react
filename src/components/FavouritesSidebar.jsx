import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { removeFromFavourites, clearFavourites } from '../store/slices/favouritesSlice';
import { useDroppable } from '@dnd-kit/core';

const FavouritesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.favourites.items);

  const { isOver, setNodeRef } = useDroppable({
    id: 'favourites-drop-zone',
  });

  const handleRemove = (propertyId) => {
    dispatch(removeFromFavourites(propertyId));
  };

  const handleClearAll = () => {
    dispatch(clearFavourites());
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const formatPrice = (price) => {
    return 'Rs. ' + new Intl.NumberFormat('en-LK', {
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: isOver ? '2px dashed #00DEB6' : '1px solid #e0e0e0',
        backgroundColor: isOver ? 'rgba(0, 222, 182, 0.05)' : '#ffffff',
        transition: 'all 0.2s ease-in-out',
        minHeight: 200,
        position: 'sticky',
        top: 20,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge badgeContent={favourites.length} color="primary">
            <FavoriteIcon color="error" />
          </Badge>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Favourites
          </Typography>
        </Box>
        {favourites.length > 0 && (
          <Tooltip title="Clear all favourites">
            <IconButton
              size="small"
              onClick={handleClearAll}
              color="error"
              aria-label="Clear all favourites"
            >
              <ClearAllIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {favourites.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: 'text.secondary',
          }}
        >
          <FavoriteIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
          <Typography variant="body2">
            Drag properties here or click the heart icon to add to favourites
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {favourites.map((property, index) => (
              <React.Fragment key={property.id}>
                {index > 0 && <Divider />}
                <ListItem
                  sx={{
                    px: 1,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                  secondaryAction={
                    <Tooltip title="Remove from favourites">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemove(property.id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={property.mainImage}
                      alt={property.description}
                      sx={{ width: 56, height: 56, mr: 1, cursor: 'pointer' }}
                      onClick={() => handleViewProperty(property.id)}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => handleViewProperty(property.id)}
                      >
                        {formatPrice(property.price)}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {property.location}
                      </Typography>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<ClearAllIcon />}
            onClick={handleClearAll}
            sx={{ mt: 2 }}
          >
            Clear All Favourites
          </Button>
        </>
      )}
    </Paper>
  );
};

export default FavouritesSidebar;

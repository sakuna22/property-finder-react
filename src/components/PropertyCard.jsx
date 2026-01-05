import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { addToFavourites, removeFromFavourites } from '../store/slices/favouritesSlice';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const PropertyCard = ({ property, isDragging = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);
  const isFavourite = favourites.some((fav) => fav.id === property.id);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id,
    data: property,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavourite) {
      dispatch(removeFromFavourites(property.id));
    } else {
      dispatch(addToFavourites(property));
    }
  };

  const handleViewProperty = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/property/${property.id}`);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const formatPrice = (price) => {
    return 'Rs. ' + new Intl.NumberFormat('en-LK', {
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Drag Handle */}
      <Box
        {...listeners}
        {...attributes}
        sx={{
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 1,
          padding: '2px 8px',
          cursor: 'grab',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          '&:active': {
            cursor: 'grabbing',
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DragIndicatorIcon fontSize="small" sx={{ color: '#7F8C8D' }} />
      </Box>

      {/* Favourite Button */}
      <Tooltip title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}>
        <IconButton
          onClick={handleFavouriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          {isFavourite ? (
            <FavoriteIcon sx={{ color: '#E74C3C' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#7F8C8D' }} />
          )}
        </IconButton>
      </Tooltip>

      {/* Property Type Badge */}
      <Chip
        label={property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        icon={<HomeIcon />}
        size="small"
        color={property.type === 'house' ? 'primary' : 'secondary'}
        sx={{
          position: 'absolute',
          top: 45,
          left: 8,
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Property Image */}
      <CardMedia
        component="img"
        height="200"
        image={property.mainImage}
        alt={property.description}
        sx={{
          objectFit: 'cover',
        }}
      />

      {/* Property Content */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 1,
          }}
        >
          {formatPrice(property.price)}
        </Typography>

        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 500,
            mb: 1,
            fontSize: '1rem',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {property.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, color: 'text.secondary' }}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">{property.location}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BedIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon fontSize="small" color="secondary" />
            <Typography variant="body2" color="text.secondary">
              {formatDate(property.dateAdded)}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleViewProperty}
          sx={{
            fontWeight: 600,
          }}
        >
          View Property
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;

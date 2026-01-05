import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  Tooltip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BedIcon from '@mui/icons-material/Bed';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { addToFavourites, removeFromFavourites } from '../store/slices/favouritesSlice';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-tabpanel-${index}`}
      aria-labelledby={`property-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.properties.allProperties);
  const favourites = useSelector((state) => state.favourites.items);

  const property = allProperties.find((p) => p.id === id);
  const isFavourite = favourites.some((fav) => fav.id === id);

  const [tabValue, setTabValue] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Property not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Search
        </Button>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavouriteClick = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(property.id));
    } else {
      dispatch(addToFavourites(property));
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleOpenLightbox = () => {
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
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
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          Search
        </Link>
        <Typography color="text.primary" variant="body2">
          {property.location}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Image Gallery Section */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Main Image */}
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              borderRadius: 3,
              overflow: 'hidden',
              mb: 2,
              cursor: 'pointer',
            }}
            onClick={handleOpenLightbox}
          >
            <Box
              component="img"
              src={property.images[selectedImageIndex]}
              alt={`${property.description} - Image ${selectedImageIndex + 1}`}
              sx={{
                width: '100%',
                height: { xs: 300, md: 450 },
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">
                {selectedImageIndex + 1} / {property.images.length}
              </Typography>
            </Box>
          </Paper>

          {/* Thumbnail Gallery */}
          <ImageList
            sx={{
              gridAutoFlow: 'column',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr)) !important',
              gridAutoColumns: 'minmax(100px, 1fr)',
              overflow: 'auto',
              pb: 1,
            }}
            rowHeight={80}
          >
            {property.images.map((image, index) => (
              <ImageListItem
                key={index}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: selectedImageIndex === index ? '3px solid #00DEB6' : '3px solid transparent',
                  transition: 'border-color 0.2s',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        {/* Property Info Section */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #e0e0e0',
              position: 'sticky',
              top: 100,
            }}
          >
            {/* Price and Favourite */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: 'primary.main' }}
              >
                {formatPrice(property.price)}
              </Typography>
              <Tooltip title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}>
                <IconButton
                  onClick={handleFavouriteClick}
                  sx={{
                    border: '2px solid',
                    borderColor: isFavourite ? 'error.main' : 'grey.300',
                  }}
                >
                  {isFavourite ? (
                    <FavoriteIcon sx={{ color: 'error.main' }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Description */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {property.description}
            </Typography>

            {/* Property Details */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="body1">{property.location}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon color="primary" />
                <Chip
                  label={property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  color="primary"
                  size="small"
                />
                <Chip label={property.tenure} variant="outlined" size="small" />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BedIcon color="primary" />
                <Typography variant="body1">
                  {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Added on {formatDate(property.dateAdded)}
                </Typography>
              </Box>
            </Box>

            {/* Favourite Button */}
            <Button
              variant={isFavourite ? 'outlined' : 'contained'}
              color={isFavourite ? 'error' : 'primary'}
              fullWidth
              startIcon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleFavouriteClick}
              sx={{ mb: 2 }}
            >
              {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
            >
              Back to Search
            </Button>
          </Paper>
        </Grid>

        {/* Tabs Section */}
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: '1px solid #e0e0e0',
                '& .MuiTab-root': {
                  py: 2,
                },
              }}
            >
              <Tab label="Description" id="property-tab-0" aria-controls="property-tabpanel-0" />
              <Tab label="Floor Plan" id="property-tab-1" aria-controls="property-tabpanel-1" />
              <Tab label="Location Map" id="property-tab-2" aria-controls="property-tabpanel-2" />
            </Tabs>

            {/* Description Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Property Description
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.8, color: 'text.secondary' }}
                >
                  {property.longDescription}
                </Typography>
              </Box>
            </TabPanel>

            {/* Floor Plan Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ px: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Floor Plan
                </Typography>
                <Box
                  component="img"
                  src={property.floorPlan}
                  alt="Floor Plan"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 500,
                    objectFit: 'contain',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </TabPanel>

            {/* Map Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Location
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.coordinates.lat},${property.coordinates.lng}&zoom=15`}
                  />
                </Box>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseLightbox}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh',
            }}
          >
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 16,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box
              component="img"
              src={property.images[selectedImageIndex]}
              alt={`Property image ${selectedImageIndex + 1}`}
              sx={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
              }}
            />

            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 16,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'white',
              py: 2,
            }}
          >
            {selectedImageIndex + 1} / {property.images.length}
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PropertyPage;

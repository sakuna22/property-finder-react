import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Slider,
  Chip,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import dayjs from 'dayjs';
import {
  setType,
  setMinPrice,
  setMaxPrice,
  setMinBedrooms,
  setMaxBedrooms,
  setDateFrom,
  setDateTo,
  setPostcode,
  resetSearchCriteria,
} from '../store/slices/searchSlice';
import { setFilteredProperties } from '../store/slices/propertiesSlice';

const priceMarks = [
  { value: 0, label: 'Rs.0' },
  { value: 50000000, label: 'Rs.50M' },
  { value: 100000000, label: 'Rs.100M' },
  { value: 150000000, label: 'Rs.150M' },
];

const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];

const postcodeOptions = ['CMB7', 'CMB3', 'NGD', 'CMB4', 'BTM', 'RJG', 'NGM'];

const SearchForm = () => {
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.search);
  const allProperties = useSelector((state) => state.properties.allProperties);

  const [priceRange, setPriceRange] = useState([
    searchCriteria.minPrice || 0,
    searchCriteria.maxPrice || 150000000,
  ]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    dispatch(setMinPrice(newValue[0]));
    dispatch(setMaxPrice(newValue[1]));
  };

  const handleSearch = () => {
    let filtered = [...allProperties];
    if (searchCriteria.type && searchCriteria.type !== 'any') {
      filtered = filtered.filter(
        (property) => property.type.toLowerCase() === searchCriteria.type.toLowerCase()
      );
    }

    if (searchCriteria.minPrice) {
      filtered = filtered.filter(
        (property) => property.price >= Number(searchCriteria.minPrice)
      );
    }
    if (searchCriteria.maxPrice) {
      filtered = filtered.filter(
        (property) => property.price <= Number(searchCriteria.maxPrice)
      );
    }

    if (searchCriteria.minBedrooms && searchCriteria.minBedrooms !== 'Any') {
      const minBeds = searchCriteria.minBedrooms === '5+' ? 5 : Number(searchCriteria.minBedrooms);
      filtered = filtered.filter((property) => property.bedrooms >= minBeds);
    }
    if (searchCriteria.maxBedrooms && searchCriteria.maxBedrooms !== 'Any') {
      const maxBeds = searchCriteria.maxBedrooms === '5+' ? 999 : Number(searchCriteria.maxBedrooms);
      filtered = filtered.filter((property) => property.bedrooms <= maxBeds);
    }

    if (searchCriteria.dateFrom) {
      const fromDate = dayjs(searchCriteria.dateFrom);
      filtered = filtered.filter((property) =>
        dayjs(property.dateAdded).isAfter(fromDate) || dayjs(property.dateAdded).isSame(fromDate, 'day')
      );
    }
    if (searchCriteria.dateTo) {
      const toDate = dayjs(searchCriteria.dateTo);
      filtered = filtered.filter((property) =>
        dayjs(property.dateAdded).isBefore(toDate) || dayjs(property.dateAdded).isSame(toDate, 'day')
      );
    }

    if (searchCriteria.postcode) {
      filtered = filtered.filter((property) =>
        property.postcode.toLowerCase().includes(searchCriteria.postcode.toLowerCase())
      );
    }

    dispatch(setFilteredProperties(filtered));
  };

  const handleReset = () => {
    dispatch(resetSearchCriteria());
    setPriceRange([0, 150000000]);
    dispatch(setFilteredProperties(allProperties));
  };

  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `Rs.${(value / 1000000).toFixed(0)}M`;
    }
    return `Rs.${(value / 1000).toFixed(0)}k`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <SearchIcon color="primary" />
          Find Your Perfect Property
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Property Type</InputLabel>
              <Select
                labelId="type-label"
                value={searchCriteria.type}
                label="Property Type"
                onChange={(e) => dispatch(setType(e.target.value))}
                startAdornment={
                  <InputAdornment position="start">
                    {searchCriteria.type === 'flat' ? (
                      <ApartmentIcon color="primary" />
                    ) : (
                      <HomeIcon color="primary" />
                    )}
                  </InputAdornment>
                }
              >
                <MenuItem value="any">
                  <Chip label="Any" size="small" sx={{ mr: 1 }} /> Any Type
                </MenuItem>
                <MenuItem value="house">
                  <Chip label="House" size="small" color="primary" sx={{ mr: 1 }} /> House
                </MenuItem>
                <MenuItem value="flat">
                  <Chip label="Flat" size="small" color="secondary" sx={{ mr: 1 }} /> Flat
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
              Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={150000000}
              step={5000000}
              marks={priceMarks}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: 'primary.main',
                },
                '& .MuiSlider-track': {
                  backgroundColor: 'primary.main',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="min-beds-label">Min Bedrooms</InputLabel>
              <Select
                labelId="min-beds-label"
                value={searchCriteria.minBedrooms}
                label="Min Bedrooms"
                onChange={(e) => dispatch(setMinBedrooms(e.target.value))}
              >
                {bedroomOptions.map((option) => (
                  <MenuItem key={`min-${option}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="max-beds-label">Max Bedrooms</InputLabel>
              <Select
                labelId="max-beds-label"
                value={searchCriteria.maxBedrooms}
                label="Max Bedrooms"
                onChange={(e) => dispatch(setMaxBedrooms(e.target.value))}
              >
                {bedroomOptions.map((option) => (
                  <MenuItem key={`max-${option}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <DatePicker
              label="Date Added From"
              value={searchCriteria.dateFrom ? dayjs(searchCriteria.dateFrom) : null}
              onChange={(newValue) =>
                dispatch(setDateFrom(newValue ? newValue.format('YYYY-MM-DD') : null))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <DatePicker
              label="Date Added To"
              value={searchCriteria.dateTo ? dayjs(searchCriteria.dateTo) : null}
              onChange={(newValue) =>
                dispatch(setDateTo(newValue ? newValue.format('YYYY-MM-DD') : null))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              freeSolo
              options={postcodeOptions}
              value={searchCriteria.postcode}
              onChange={(e, newValue) => dispatch(setPostcode(newValue || ''))}
              onInputChange={(e, newValue) => dispatch(setPostcode(newValue || ''))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Area Code"
                  placeholder="e.g. CMB7, NGD"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', height: '100%', alignItems: 'flex-end' }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ minWidth: 150 }}
              >
                Search Properties
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default SearchForm;

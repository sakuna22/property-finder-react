import { createSlice } from '@reduxjs/toolkit';
import propertiesData from '../../data/properties.json';

const initialState = {
  allProperties: propertiesData.properties,
  filteredProperties: propertiesData.properties,
  selectedProperty: null,
  loading: false,
  error: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilteredProperties: (state, action) => {
      state.filteredProperties = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    resetFilters: (state) => {
      state.filteredProperties = state.allProperties;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFilteredProperties,
  setSelectedProperty,
  resetFilters,
  setLoading,
  setError,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

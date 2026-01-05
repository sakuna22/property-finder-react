import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'any',
  minPrice: 0,
  maxPrice: 150000000,
  minBedrooms: 'Any',
  maxBedrooms: 'Any',
  dateFrom: null,
  dateTo: null,
  postcode: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchCriteria: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSearchCriteria: () => {
      return initialState;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinBedrooms: (state, action) => {
      state.minBedrooms = action.payload;
    },
    setMaxBedrooms: (state, action) => {
      state.maxBedrooms = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setPostcode: (state, action) => {
      state.postcode = action.payload;
    },
  },
});

export const {
  setSearchCriteria,
  resetSearchCriteria,
  setType,
  setMinPrice,
  setMaxPrice,
  setMinBedrooms,
  setMaxBedrooms,
  setDateFrom,
  setDateTo,
  setPostcode,
} = searchSlice.actions;

export default searchSlice.reducer;

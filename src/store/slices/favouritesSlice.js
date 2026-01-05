import { createSlice } from '@reduxjs/toolkit';

// Load favourites from localStorage
const loadFavouritesFromStorage = () => {
  try {
    const stored = localStorage.getItem('propertyFavourites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favourites from localStorage:', error);
    return [];
  }
};

// Save favourites to localStorage
const saveFavouritesToStorage = (favourites) => {
  try {
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  } catch (error) {
    console.error('Error saving favourites to localStorage:', error);
  }
};

const initialState = {
  items: loadFavouritesFromStorage(),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const property = action.payload;
      const exists = state.items.some((item) => item.id === property.id);
      if (!exists) {
        state.items.push(property);
        saveFavouritesToStorage(state.items);
      }
    },
    removeFromFavourites: (state, action) => {
      const propertyId = action.payload;
      state.items = state.items.filter((item) => item.id !== propertyId);
      saveFavouritesToStorage(state.items);
    },
    clearFavourites: (state) => {
      state.items = [];
      saveFavouritesToStorage(state.items);
    },
    reorderFavourites: (state, action) => {
      state.items = action.payload;
      saveFavouritesToStorage(state.items);
    },
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
  reorderFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;

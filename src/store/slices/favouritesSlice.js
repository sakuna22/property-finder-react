/**
 * favouritesSlice.js - Redux Slice for Managing Favourites
 * 
 * This slice handles all favourite properties functionality including:
 * - Adding properties to favourites
 * - Removing properties from favourites
 * - Clearing all favourites
 * - Reordering favourites list
 * - Persisting favourites to localStorage
 * - Loading favourites from localStorage on app initialization
 * 
 * Local Storage Key: 'propertyFavourites'
 * 
 * @module favouritesSlice
 * @requires @reduxjs/toolkit
 * @author Estate Agent App
 * @version 1.0.0
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Loads favourites from localStorage if available
 * Handles JSON parsing errors gracefully
 * 
 * @returns {Array} Array of favourite properties or empty array if none/error
 */
const loadFavouritesFromStorage = () => {
  try {
    const stored = localStorage.getItem('propertyFavourites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favourites from localStorage:', error);
    return [];
  }
};

/**
 * Saves favourites array to localStorage
 * Serializes the array to JSON string for storage
 * 
 * @param {Array} favourites - Array of favourite property objects
 */
const saveFavouritesToStorage = (favourites) => {
  try {
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  } catch (error) {
    console.error('Error saving favourites to localStorage:', error);
  }
};

/**
 * Initial state loaded from localStorage
 * @type {Object}
 * @property {Array} items - Array of favourite property objects
 */
const initialState = {
  items: loadFavouritesFromStorage(),
};

/**
 * Redux slice for favourites management
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    /**
     * Adds a property to favourites if not already present
     * Prevents duplicate entries and persists to localStorage
     * 
     * @param {Object} state - Current state
     * @param {Object} action - Action with property payload
     */
    addToFavourites: (state, action) => {
      const property = action.payload;
      // Prevent duplicates
      const exists = state.items.some((item) => item.id === property.id);
      if (!exists) {
        state.items.push(property);
        saveFavouritesToStorage(state.items);
      }
    },
    
    /**
     * Removes a property from favourites by ID
     * Updates localStorage after removal
     * 
     * @param {Object} state - Current state
     * @param {Object} action - Action with property ID payload
     */
    removeFromFavourites: (state, action) => {
      const propertyId = action.payload;
      state.items = state.items.filter((item) => item.id !== propertyId);
      saveFavouritesToStorage(state.items);
    },
    
    /**
     * Clears all properties from favourites
     * Resets localStorage to empty array
     * 
     * @param {Object} state - Current state
     */
    clearFavourites: (state) => {
      state.items = [];
      saveFavouritesToStorage(state.items);
    },
    
    /**
     * Reorders the favourites list (e.g., after drag and drop)
     * Useful for maintaining user's preferred order
     * 
     * @param {Object} state - Current state
     * @param {Object} action - Action with reordered items array
     */
    reorderFavourites: (state, action) => {
      state.items = action.payload;
      saveFavouritesToStorage(state.items);
    },
  },
});

// Export actions for use in components
export const {
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
  reorderFavourites,
} = favouritesSlice.actions;

// Export reducer as default for store configuration
export default favouritesSlice.reducer;

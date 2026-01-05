import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import favouritesReducer from './slices/favouritesSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    favourites: favouritesReducer,
    search: searchReducer,
  },
});

export default store;

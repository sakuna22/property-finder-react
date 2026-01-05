import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import favouritesReducer from './slices/favouritesSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    favourites: favouritesReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

export default store;

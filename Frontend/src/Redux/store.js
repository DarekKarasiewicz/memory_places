import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import addPlaceLocationReducer from './addPlaceLocationSlice';
import modalsReducer from './modalsSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    addPlaceLocation: addPlaceLocationReducer,
    modals: modalsReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import addPlaceLocationReducer from './addPlaceLocationSlice';
import modalsReducer from './modalsSlice';
import userPlacesReducer from './userPlacesSlice';
import addPlaceReducer from './addPlaceSlice';
import updatePlaceReducer from './updatePlaceSlice';
import allMapPlacesReducer from './allMapPlacesSlice';
import authReducer from './authSlice';
import formValidationReducer from './formValidationSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    addPlaceLocation: addPlaceLocationReducer,
    modals: modalsReducer,
    userPlaces: userPlacesReducer,
    addPlace: addPlaceReducer,
    updatePlace: updatePlaceReducer,
    allMapPlaces: allMapPlacesReducer,
    auth: authReducer,
    formValidation: formValidationReducer,
  },
});

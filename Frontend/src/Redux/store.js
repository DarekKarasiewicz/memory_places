import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import addPlaceLocationReducer from './addPlaceLocationSlice';
import modalsReducer from './modalsSlice';
import userPlacesReducer from './userPlacesSlice';
import addPlaceReducer from './addPlaceSlice';
import updatePlaceReducer from './updatePlaceSlice';
import allMapPlacesReducer from './allMapPlacesSlice';
import authReducer from './authSlice';
import formValidationReducer from './formValidationSlice';
import contentSectionReducer from './contentSectionSlice';
import addTrailReducer from './addTrailSlice';
import drawingToolsReducer from './drawingToolsSlice';
import drawingEventsReducer from './drawingEventsSlice';
import allMapTrailsReducer from './allMapTrailsSlice';
import updateTrailReducer from './updateTrailSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

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
    contentSection: contentSectionReducer,
    addTrail: addTrailReducer,
    drawingTools: drawingToolsReducer,
    drawingEvents: drawingEventsReducer,
    allMapTrails: allMapTrailsReducer,
    updateTrail: updateTrailReducer,
  },
  middleware: customizedMiddleware,
});

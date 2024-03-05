import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: null,
  lng: null,
  isSelecting: false,
};

export const addPlaceLocationSlice = createSlice({
  name: 'addPlaceLocation',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    changeIsSelecting: (state, action) => {
      state.isSelecting = action.payload.isSelecting;
    },
    clearLocation: (state) => {
      state.lat = null;
      state.lng = null;
    },
  },
});

export const selectAddPlaceLocation = (state) => state.addPlaceLocation;

export const addPlacelocationActions = addPlaceLocationSlice.actions;

export default addPlaceLocationSlice.reducer;

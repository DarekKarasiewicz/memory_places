import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: null,
  lng: null,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const selectLocation = (state) => state.location;

export const locationActions = locationSlice.actions;

export default locationSlice.reducer;

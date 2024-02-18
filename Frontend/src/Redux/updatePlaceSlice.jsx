import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: null,
  isDataLoaded: false,
};

export const updatePlaceSlice = createSlice({
  name: 'updatePlace',
  initialState,
  reducers: {
    changeUpdatePlace: (state, action) => {
      state.place = action.payload;
    },
    dataIsLoaded: (state) => {
      state.isDataLoaded = true;
    },
    reset: () => initialState,
  },
});

export const selectUpdatePlace = (state) => state.updatePlace;

export const updatePlaceActions = updatePlaceSlice.actions;

export default updatePlaceSlice.reducer;

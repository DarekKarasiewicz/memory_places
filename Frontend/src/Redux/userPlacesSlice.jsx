import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isTrailActive: false,
  shouldPlaceDataReload: false,
  shouldTrailDataReload: false,
};

export const userPlacesSlice = createSlice({
  name: 'userPlaces',
  initialState,
  reducers: {
    changeIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    changeIsTrailActive: (state) => {
      state.isTrailActive = !state.isTrailActive;
    },
    changeIsPlaceDataShouldReload: (state, action) => {
      state.shouldPlaceDataReload = action.payload;
    },
    changeIsTrailDataShouldReload: (state, action) => {
      state.shouldTrailDataReload = action.payload;
    },
  },
});

export const selectUserPlaces = (state) => state.userPlaces;

export const userPlacesActions = userPlacesSlice.actions;

export default userPlacesSlice.reducer;

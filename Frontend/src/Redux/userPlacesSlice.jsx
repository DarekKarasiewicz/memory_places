import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isTrailActive: false,
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
  },
});

export const selectUserPlaces = (state) => state.userPlaces;

export const userPlacesActions = userPlacesSlice.actions;

export default userPlacesSlice.reducer;

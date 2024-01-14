import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

export const userPlacesSlice = createSlice({
  name: 'userPlaces',
  initialState,
  reducers: {
    changeIsOpen: (state,) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const selectUserPlaces = (state) => state.userPlaces;

export const userPlacesActions = userPlacesSlice.actions;

export default userPlacesSlice.reducer;
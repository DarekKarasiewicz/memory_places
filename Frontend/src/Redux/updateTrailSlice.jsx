import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trail: null,
  isDataLoaded: false,
};

export const updateTrailSlice = createSlice({
  name: 'updateTrail',
  initialState,
  reducers: {
    changeUpdateTrail: (state, action) => {
      state.trail = action.payload;
    },
    dataIsLoaded: (state) => {
      state.isDataLoaded = true;
    },
    reset: () => initialState,
  },
});

export const selectUpdateTrail = (state) => state.updateTrail;

export const updateTrailActions = updateTrailSlice.actions;

export default updateTrailSlice.reducer;

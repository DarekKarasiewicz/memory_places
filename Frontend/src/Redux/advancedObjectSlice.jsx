import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: [],
  trail: [],
  kind: null,
  isAdvancedObjectOpen: false,
};

export const advancedObjectSlice = createSlice({
  name: 'advancedObject',
  initialState,
  reducers: {
    changePlace: (state, action) => {
      state.place = action.payload;
    },
    changeTrail: (state, action) => {
      state.trail = action.payload;
    },
    changeKind: (state, action) => {
      state.kind = action.payload;
    },
    changeIsAdvancedObjectOpen: (state) => {
      state.isAdvancedObjectOpen = !state.isAdvancedObjectOpen;
    },
    clearData: (state) => {
      state.place = [];
      state.trail = [];
      state.kind = null;
    },
  },
});

export const selectAdvancedObject = (state) => state.advancedObject;

export const advancedObjectActions = advancedObjectSlice.actions;

export default advancedObjectSlice.reducer;

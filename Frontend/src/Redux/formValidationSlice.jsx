import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isValidName: null,
  isValidDate: null,
  isValidLat: null,
  isValidLng: null,
  isValidType: null,
  isValidSortof: null,
  isValidPeriod: null,
  isValidDescription: null,
};

export const formValidationSlice = createSlice({
  name: 'formValidation',
  initialState,
  reducers: {
    changeIsValidName: (state, action) => {
      state.isValidName = action.payload;
    },
    changeIsValidDate: (state, action) => {
      state.isValidDate = action.payload;
    },
    changeIsValidLat: (state, action) => {
      state.isValidLat = action.payload;
    },
    changeIsValidLng: (state, action) => {
      state.isValidLng = action.payload;
    },
    changeIsValidType: (state, action) => {
      state.isValidType = action.payload;
    },
    changeIsValidSortof: (state, action) => {
      state.isValidSortof = action.payload;
    },
    changeIsValidPeriod: (state, action) => {
      state.isValidPeriod = action.payload;
    },
    changeIsValidDescription: (state, action) => {
      state.isValidDescription = action.payload;
    },
    reset: () => initialState,
  },
});

export const selectFormValidation = (state) => state.formValidation;

export const formValidationActions = formValidationSlice.actions;

export default formValidationSlice.reducer;

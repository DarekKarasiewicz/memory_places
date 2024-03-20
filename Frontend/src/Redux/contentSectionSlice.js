import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  section: 'StatisticsSection',
};

export const contentSectionSlice = createSlice({
  name: 'contentSection',
  initialState,
  reducers: {
    changeSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

export const { changeSection } = contentSectionSlice.actions;

export default contentSectionSlice.reducer;

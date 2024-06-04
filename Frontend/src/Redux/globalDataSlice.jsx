import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blockWrapperRef: false,
};

export const globalDataSlice = createSlice({
  name: 'globalData',
  initialState,
  reducers: {
    changeBlockWrapperRef: (state, action) => {
      state.blockWrapperRef = action.payload;
    },
  },
});

export const selectGlobalData = (state) => state.globalData;

export const globalDataActions = globalDataSlice.actions;

export default globalDataSlice.reducer;

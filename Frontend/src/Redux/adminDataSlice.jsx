import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUsersChanged: true,
  isPlacesChanged: true,
  isTrailsChanged: true,
  isVerificationsChanged: true,
  isStatisticsChanged: true,
  isHistoryChanged: true,
};

export const adminDataSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    updateIsUsersChanged: (state, action) => {
      state.isUsersChanged = action.payload;
    },
    updateIsPlacesChanged: (state, action) => {
      state.isPlacesChanged = action.payload;
    },
    updateIsTrailsChanged: (state, action) => {
      state.isTrailsChanged = action.payload;
    },
    updateIsVerificationsChanged: (state, action) => {
      state.isVerificationsChanged = action.payload;
    },
    updateIsStatisticsChanged: (state, action) => {
      state.isStatisticsChanged = action.payload;
    },
    updateIsHistoryChanged: (state, action) => {
      state.isHistoryChanged = action.payload;
    },
  },
});

export const selectAdminData = (state) => state.adminData;

export const adminDataActions = adminDataSlice.actions;

export default adminDataSlice.reducer;
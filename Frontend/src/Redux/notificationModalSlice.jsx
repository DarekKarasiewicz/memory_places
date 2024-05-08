import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  title: '',
  isNotificationModalOpen: false,
};

export const notificationModalSlice = createSlice({
  name: 'notificationModal',
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeIsNotificationModalOpen: (state) => {
      state.isNotificationModalOpen = !state.isNotificationModalOpen;
    },
  },
});

export const selectNotificationModal = (state) => state.notificationModal;

export const notificationModalActions = notificationModalSlice.actions;

export default notificationModalSlice.reducer;

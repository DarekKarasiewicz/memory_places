import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  isConfirmationModalOpen: false,
};

export const confirmationModalSlice = createSlice({
  name: 'confirmationModal',
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeIsConfirmationModalOpen: (state) => {
      state.isConfirmationModalOpen = !state.isConfirmationModalOpen;
    },
  },
});

export const selectConfirmationModal = (state) => state.confirmationModal;

export const confirmationModalActions = confirmationModalSlice.actions;

export default confirmationModalSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  content: '',
  isConfirmationModalOpen: false,
};

export const confirmationModalSlice = createSlice({
  name: 'confirmationModal',
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeContent: (state, action) => {
      state.content = action.payload;
    },
    changeIsConfirmationModalOpen: (state) => {
      state.isConfirmationModalOpen = !state.isConfirmationModalOpen;
    },
    clearData: (state) => {
      state.type = null;
      state.content = '';
    },
  },
});

export const selectConfirmationModal = (state) => state.confirmationModal;

export const confirmationModalActions = confirmationModalSlice.actions;

export default confirmationModalSlice.reducer;

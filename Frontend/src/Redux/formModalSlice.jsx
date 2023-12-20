import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

export const formModalSlice = createSlice({
  name: 'formModal',
  initialState,
  reducers: {
    changeIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const selectFormModal = (state) => state.formModal;

export const formModalActions = formModalSlice.actions;

export default formModalSlice.reducer;

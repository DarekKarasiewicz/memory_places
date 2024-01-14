import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormModalOpen: false,
  isLoginAndRegisterOpen: false,
  isUserSettingsOpen: false,
  isUpdateModalOpen: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeIsFormModalOpen: (state) => {
      state.isFormModalOpen = !state.isFormModalOpen;
    },
    changeIsLoginAndRegisterOpen: (state) => {
      state.isLoginAndRegisterOpen = !state.isLoginAndRegisterOpen;
    },
    changeIsUserSettingsOpen: (state) => {
      state.isUserSettingsOpen = !state.isUserSettingsOpen;
    },
    changeIsUpdateModalOpen: (state) => {
      state.isUpdateModalOpen = !state.isUpdateModalOpen;
    },
  },
});

export const selectModals = (state) => state.modals;

export const modalsActions = modalsSlice.actions;

export default modalsSlice.reducer;

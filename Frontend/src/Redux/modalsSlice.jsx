import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormModalOpen: false,
  isLoginAndRegisterOpen: false,
  isUserSettingsOpen: false,
  isUpdateModalOpen: false,
  isNotificationModalOpen: false,
  isCookiesInfoOpen: true,
  isAdvancedInfoOpen: false,
  isFAQOpen: false,
  isContactFormOpen: false,
  isTrailFormOpen: false,
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
    changeIsNotificationModalOpen: (state) => {
      state.isNotificationModalOpen = !state.isNotificationModalOpen;
    },
    changeIsCookiesInfoOpen: (state) => {
      state.isCookiesInfoOpen = !state.isCookiesInfoOpen;
    },
    changeIsAdvancedInfoOpen: (state) => {
      state.isAdvancedInfoOpen = !state.isAdvancedInfoOpen;
    },
    changeIsFAQOpen: (state) => {
      state.isFAQOpen = !state.isFAQOpen;
    },
    changeIsContactFormOpen: (state) => {
      state.isContactFormOpen = !state.isContactFormOpen;
    },
    changeIsTrailFormOpen: (state) => {
      state.isTrailFormOpen = !state.isTrailFormOpen;
    },
  },
});

export const selectModals = (state) => state.modals;

export const modalsActions = modalsSlice.actions;

export default modalsSlice.reducer;

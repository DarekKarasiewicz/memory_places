import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormModalOpen: false,
  isLoginAndRegisterOpen: false,
  isUserSettingsOpen: false,
  isUpdateModalOpen: false,
  isCookiesInfoOpen: true,
  isAdvancedInfoOpen: false,
  isFAQOpen: false,
  isContactFormOpen: false,
  isTrailFormOpen: false,
  isTrailUpdateFormOpen: false,
  isFoundationInfoOpen: false,
  isForumPostModalOpen: false,
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
    changeIsTrailUpdateFormOpen: (state) => {
      state.isTrailUpdateFormOpen = !state.isTrailUpdateFormOpen;
    },
    changeIsFoundationInfoOpen: (state) => {
      state.isFoundationInfoOpen = !state.isFoundationInfoOpen;
    },
    changeIsForumPostModalOpen: (state) => {
      state.isForumPostModalOpen = !state.isForumPostModalOpen;
    },
  },
});

export const selectModals = (state) => state.modals;

export const modalsActions = modalsSlice.actions;

export default modalsSlice.reducer;

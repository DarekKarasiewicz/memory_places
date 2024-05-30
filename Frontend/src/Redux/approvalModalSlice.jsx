import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  type: null,
  isApprovalModalOpen: false,
};

export const approvalModalSlice = createSlice({
  name: 'approvalModal',
  initialState,
  reducers: {
    changeId: (state, action) => {
      state.id = action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeIsApprovalModalOpen: (state) => {
      state.isApprovalModalOpen = !state.isApprovalModalOpen;
    },
    clearData: (state) => {
      state.id = null;
      state.type = null;
    },
  },
});

export const selectApprovalModal = (state) => state.approvalModal;

export const approvalModalActions = approvalModalSlice.actions;

export default approvalModalSlice.reducer;

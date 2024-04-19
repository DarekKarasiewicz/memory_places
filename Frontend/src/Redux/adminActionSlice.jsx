import { createSlice } from '@reduxjs/toolkit';
import { confirmationModalActions } from './confirmationModalSlice';
import axios from 'axios';

const initialState = {
  place_id: null,
  place_name: '',
  user_id: null,
  user_name: '',
  isAdminActionsModalOpen: false,
  current_action: '',
};

export const adminActionSlice = createSlice({
  name: 'adminActions',
  initialState,
  reducers: {
    changePlaceId: (state, action) => {
      state.place_id = action.payload;
    },
    changePlaceName: (state, action) => {
      state.place_name = action.payload;
    },
    changeUserId: (state, action) => {
      state.user_id = action.payload;
    },
    changeUserName: (state, action) => {
      state.user_name = action.payload;
    },
    changeAction: (state, action) => {
      state.current_action = action.payload;
    },
    changeIsAdminActionsModalOpen: (state) => {
      state.isAdminActionsModalOpen = !state.isAdminActionsModalOpen;
    },
  },
});

export const selectAdminAction = (state) => state.adminActions;

export const adminActions = adminActionSlice.actions;

export const deletePlaceItem = (place_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());

  try {
    await axios.delete(`http://localhost:8000/memo_places/places/${place_id}`);
  } catch (error) {
    console.log('Error deleting place:', error);
  }
};

export const changeUserRole = (user_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());

  // FOR TESTING PURPOUSES IT SHOULD CHANGE TYPE BASED ON THE AXIOS CALLBACK
  // dispatch(confirmationModalActions.changeType('error'));
  dispatch(confirmationModalActions.changeType('success'));

  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());

  // try {
  //   await axios
  //     .put(`http://localhost:8000/memo_places/users/pk=${user_id}`, {
  //       TO DO
  //       How to get to values of the admin state, master state ?
  //     }, {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  // } catch (error) {
  //   console.log(error);
  // }
};

export const resetUserPassword = (user_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());

  // try {
  //   await axios
  //     .put(`http://localhost:8000/memo_places/users/pk=${user_id}`, {
  //       TO DO
  //       how to call endpoint to reset pass
  //     }, {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  // } catch (error) {
  //   console.log(error);
  // }
};

export const blockUser = (user_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());

  // try {
  //   await axios
  //     .put(`http://localhost:8000/memo_places/users/pk=${user_id}`, {
  //       TO DO
  //       How to get to values of the blocked state ?
  //     }, {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  // } catch (error) {
  //   console.log(error);
  // }
};

export default adminActionSlice.reducer;

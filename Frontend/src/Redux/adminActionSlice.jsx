import { createSlice } from '@reduxjs/toolkit';
import { confirmationModalActions } from './confirmationModalSlice';
import axios from 'axios';
import { adminDataActions } from './adminDataSlice';

const initialState = {
  place_id: null,
  place_name: '',
  trail_id: null,
  trail_name: '',
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
    changeTrailId: (state, action) => {
      state.trail_id = action.payload;
    },
    changeTrailName: (state, action) => {
      state.trail_name = action.payload;
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

  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  try {
    await axios.delete(`http://localhost:8000/memo_places/places/${place_id}`);
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsPlacesChanged(true));
    dispatch(adminDataActions.updateIsStatisticsChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const deleteTrailItem = (trail_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());

  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  try {
    await axios.delete(`http://localhost:8000/memo_places/path/${trail_id}`);
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsTrailsChanged(true));
    dispatch(adminDataActions.updateIsStatisticsChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const changeUserRole = (user_id, role) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  var item;

  if (role === 'admin') {
    item = { admin: true, master: false };
  } else if (role === 'master') {
    item = { admin: false, master: true };
  } else {
    item = { admin: false, master: false };
  }

  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());

  try {
    await axios.put(`http://localhost:8000/admin_dashboard/users/pk=${user_id}/`, item, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const resetUserPassword = (user_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  try {
    await axios.post(`http://localhost:8000/admin_dashboard/reset_password/pk=${user_id}`, null, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const blockUser = (user_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());

  try {
    await axios.put(
      `http://localhost:8000/admin_dashboard/users/pk=${user_id}/`,
      {
        active: false,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const unlockUser = (user_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());

  try {
    await axios.put(
      `http://localhost:8000/admin_dashboard/users/pk=${user_id}/`,
      {
        active: true,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export default adminActionSlice.reducer;

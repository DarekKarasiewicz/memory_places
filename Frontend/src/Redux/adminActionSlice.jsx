import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { confirmationModalActions } from './confirmationModalSlice';
import { adminDataActions } from './adminDataSlice';

const initialState = {
  place_id: null,
  place_name: '',
  trail_id: null,
  trail_name: '',
  user_id: null,
  user_name: '',
  post_id: null,
  post_title: '',
  comment_id: null,
  isAdminActionsModalOpen: false,
  current_action: '',
  forum_kind_type: '',
  forum_modal_action: '',
  isAdminForumModalOpen: false,
  adminMapExtended: false,
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
    changePostId: (state, action) => {
      state.post_id = action.payload;
    },
    changePostTitle: (state, action) => {
      state.post_title = action.payload;
    },
    changeCommentId: (state, action) => {
      state.comment_id = action.payload;
    },
    changeAction: (state, action) => {
      state.current_action = action.payload;
    },
    changeForumKindType: (state, action) => {
      state.forum_kind_type = action.payload;
    },
    changeForumModalAction: (state, action) => {
      state.forum_modal_action = action.payload;
    },
    changeIsAdminForumModalOpen: (state) => {
      state.isAdminForumModalOpen = !state.isAdminForumModalOpen;
    },
    changeIsAdminActionsModalOpen: (state) => {
      state.isAdminActionsModalOpen = !state.isAdminActionsModalOpen;
    },
    changeAdminGoogleMapExtension: (state, action) => {
      state.adminMapExtended = action.payload;
    },
  },
});

export const selectAdminAction = (state) => state.adminActions;

export const adminActions = adminActionSlice.actions;

export const deletePlaceItem = (place_id, cookies) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  const accessToken = cookies.user.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.delete(`${appPath}/admin_dashboard/places/${place_id}`, {
      headers: {
        JWT: accessToken,
      },
    });
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsPlacesChanged(true));
    dispatch(adminDataActions.updateIsStatisticsChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const deleteTrailItem = (trail_id, cookies) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  const accessToken = cookies.user.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.delete(`${appPath}/admin_dashboard/path/${trail_id}`, {
      headers: {
        JWT: accessToken,
      },
    });
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsTrailsChanged(true));
    dispatch(adminDataActions.updateIsStatisticsChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const changeUserRole = (user_id, role, cookies) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  const accessToken = cookies.user.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;
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
    await axios.put(`${appPath}/admin_dashboard/users/pk=${user_id}/`, item, {
      headers: { 'Content-Type': 'application/json', JWT: accessToken },
    });
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const resetUserPassword = (user_id, cookies) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  const accessToken = cookies.user.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.get(`${appPath}/admin_dashboard/reset_password/pk=${user_id}`, {
      headers: {
        JWT: accessToken,
      },
    });
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const blockUser = (user_id, cookies) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  const accessToken = cookies.user.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.put(
      `${appPath}/admin_dashboard/users/pk=${user_id}/`,
      {
        active: false,
      },
      {
        headers: { 'Content-Type': 'application/json', JWT: accessToken },
      },
    );

    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const unlockUser = (user_id, cookies) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  const accessToken = cookies.user.accessToken;
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.put(
      `${appPath}/admin_dashboard/users/pk=${user_id}/`,
      {
        active: true,
      },
      {
        headers: { 'Content-Type': 'application/json', JWT: accessToken },
      },
    );
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsUsersChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const deletePostItem = (post_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.delete(`${appPath}/memo_places_forum/post/${post_id}`);
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsPostsChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export const deleteCommentItem = (comment_id) => async (dispatch) => {
  dispatch(adminActionSlice.actions.changeIsAdminActionsModalOpen());
  dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    await axios.delete(`${appPath}/memo_places_forum/comment/${comment_id}`);
    dispatch(confirmationModalActions.changeType('success'));
    dispatch(adminDataActions.updateIsCommentsChanged(true));
  } catch (error) {
    dispatch(confirmationModalActions.changeType('error'));
  }
};

export default adminActionSlice.reducer;

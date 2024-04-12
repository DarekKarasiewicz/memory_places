import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  place_id: null,
  place_name: '',
  isAdminDeleteModalOpen: false,
};

export const adminDeleteSlice = createSlice({
  name: 'adminDelete',
  initialState,
  reducers: {
    changePlaceId: (state, action) => {
      state.place_id = action.payload;
    },
    changePlaceName: (state, action) => {
      state.place_name = action.payload;
    },
    changeIsDeleteAdminModalOpen: (state) => {
      state.isAdminDeleteModalOpen = !state.isAdminDeleteModalOpen;
    },
  },
});

export const selectAdminDelete = (state) => state.adminDelete;

export const adminDeleteActions = adminDeleteSlice.actions;

export const deletePlaceItem = (place_id) => async (dispatch) => {
  dispatch(adminDeleteSlice.actions.changeIsDeleteAdminModalOpen());

  try {
    await axios.delete(`http://localhost:8000/memo_places/places/${place_id}`);
  } catch (error) {
    console.log('Error deleting place:', error);
  }
};

export default adminDeleteSlice.reducer;

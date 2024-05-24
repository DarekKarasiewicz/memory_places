import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place_id: null,
  trail_id: null,
  post_id: null,
  refresh_places: false,
};

export const forumDataSlice = createSlice({
  name: 'forumData',
  initialState,
  reducers: {
    changePlaceId: (state, action) => {
      state.place_id = action.payload;
    },
    changeTrailId: (state, action) => {
      state.trail_id = action.payload;
    },
    changePostId: (state, action) => {
      state.post_id = action.payload;
    },
    changeRefreshPlaces: (state, action) => {
      state.refresh_places = action.payload;
    },
    clearLocation: (state) => {
      state.place_id = null;
      state.trail_id = null;
      state.post_id = null;
    },
  },
});

export const selectForumData = (state) => state.forumData;

export const forumDataActions = forumDataSlice.actions;

export default forumDataSlice.reducer;

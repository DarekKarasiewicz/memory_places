import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place_id: null,
  trail_id: null,
  post_id: null,
  refresh_places: false,
  type_id: null,
  period_id: null,
  header_name: null,
  refresh_content_data: false,
  isDataContentMounted: false,
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
    changeTypeId: (state, action) => {
      state.type_id = action.payload;
    },
    changePeriodId: (state, action) => {
      state.period_id = action.payload;
    },
    changeHeaderName: (state, action) => {
      state.header_name = action.payload;
    },
    changeRefreshContentData: (state, action) => {
      state.refresh_content_data = action.payload;
    },
    changeisDataContentMounted: (state, action) => {
      state.isDataContentMounted = action.payload;
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

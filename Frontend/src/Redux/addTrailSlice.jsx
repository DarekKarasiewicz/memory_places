import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path_name: '',
  description: '',
  sortof: '',
  type: '',
  period: '',
  wiki_link: '',
  topic_link: '',
  images: [],
  isSelecting: false,
  coordinates: [],
};

export const addTrailSlice = createSlice({
  name: 'addTrail',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.path_name = action.payload;
    },
    changeDescription: (state, action) => {
      state.description = action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changePeriod: (state, action) => {
      state.period = action.payload;
    },
    changeWikiLink: (state, action) => {
      state.wiki_link = action.payload;
    },
    changeTopicLink: (state, action) => {
      state.topic_link = action.payload;
    },
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    changeIsSelecting: (state, action) => {
      state.isSelecting = action.payload;
    },
    setTrailCoords: (state, action) => {
      state.coordinates = action.payload;
    },
    reset: () => initialState,
  },
});

export const selectAddTrail = (state) => state.addTrail;

export const addTrailActions = addTrailSlice.actions;

export default addTrailSlice.reducer;

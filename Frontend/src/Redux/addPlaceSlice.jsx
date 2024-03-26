import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place_name: '',
  description: '',
  found_date: null,
  sortof: '',
  type: '',
  period: '',
  wiki_link: '',
  topic_link: '',
  images: [],
};

export const addPlaceSlice = createSlice({
  name: 'addPlace',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.place_name = action.payload;
    },
    changeDescription: (state, action) => {
      state.description = action.payload;
    },
    changeFoundDate: (state, action) => {
      state.found_date = action.payload;
    },
    changeSortOf: (state, action) => {
      state.sortof = action.payload;
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
    reset: () => initialState,
  },
});

export const selectAddPlace = (state) => state.addPlace;

export const addPlaceActions = addPlaceSlice.actions;

export default addPlaceSlice.reducer;

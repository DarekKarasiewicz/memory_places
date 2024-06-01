import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

export const addObjectImageSlice = createSlice({
  name: 'addObjectImage',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    reset: () => initialState,
  },
});

export const selectAddObjectImage = (state) => state.addObjectImage;

export const addObjectImageActions = addObjectImageSlice.actions;

export default addObjectImageSlice.reducer;

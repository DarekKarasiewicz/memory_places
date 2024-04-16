import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  numberOfDrawnPolylines: 0,
};

const drawingEventsSlice = createSlice({
  name: 'drawingEvents',
  initialState,
  reducers: {
    pushEvent: (state, action) => {
      state.events.push(action.payload);
    },
    increaseNumberOfDrawnPolylines: (state) => {
      state.numberOfDrawnPolylines += 1;
    },
    reset: () => initialState,
  },
});

export const selectDrawingEvents = (state) => state.drawingEvents;

export const drawingEventsActions = drawingEventsSlice.actions;

export default drawingEventsSlice.reducer;

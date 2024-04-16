import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  past: [],
  now: [],
  future: [],
};

const drawingToolsSlice = createSlice({
  name: 'drawingTools',
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      const { overlay } = action.payload;
      const snapshot = {};
      snapshot.path = overlay.getPath()?.getArray();
      state.past.push([...state.now]);
      state.now.push({
        type: action.payload.type,
        geometry: action.payload.overlay,
        snapshot,
      });
      state.future = [];
    },
    updateOverlays: (state) => {
      state.past.push([...state.now]);
      state.now = state.now.map((overlay) => {
        const snapshot = {};
        const { geometry } = overlay;
        snapshot.path = geometry.getPath()?.getArray();
        return {
          ...overlay,
          snapshot,
        };
      });
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length === 0) return;
      const last = state.past.pop();
      state.future.push([...state.now]);
      state.now = last;
    },
    redo: (state) => {
      if (state.future.length === 0) return;
      const next = state.future.pop();
      state.past.push([...state.now]);
      state.now = next;
    },
    reset: () => initialState,
  },
});

export const selectDrawingTools = (state) => state.drawingTools;

export const drawingToolsActions = drawingToolsSlice.actions;

export default drawingToolsSlice.reducer;

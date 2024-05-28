import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAdmin: false,
  isMaster: false,
  accesToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsMaster: (state, action) => {
      state.isMaster = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accesToken = action.payload;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const authActions = authSlice.actions;

export default authSlice.reducer;

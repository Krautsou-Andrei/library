import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: false,
  error: false,
};

export const authenticationUserSlice = createSlice({
  name: 'authenticationUser',
  initialState,
  reducers: {
    setAuthenticationUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAuthenticationUser } = authenticationUserSlice.actions;

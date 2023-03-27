import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
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

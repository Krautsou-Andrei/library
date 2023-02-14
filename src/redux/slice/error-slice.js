import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isErrorMain: false,
};

export const errorSlice = createSlice({
  name: 'errorMain',
  initialState,
  reducers: {
    setErrorMain(state, action) {
      const stateErrorMain = state;

      stateErrorMain.isErrorMain = action.payload;
      console.log(state.isErrorMain);
    },
  },
});

export const { setErrorMain } = errorSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectBookid: '',
};

export const selectBookSlice = createSlice({
  name: 'selectBook',
  initialState,
  reducers: {
    setSelectBookid(state, action) {
      const categories = state;
      categories.selectBookid = action.payload;
    },
  },
});

export const { setSelectBookid } = selectBookSlice.actions;

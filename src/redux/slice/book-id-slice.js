import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookId: {},
};

export const bookIdSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookId(state, action) {
      console.log(action.payload);
      const stateBookid = state;
      stateBookid.bookId = action.payload;
    },
  },
});

export const { setBookId } = bookIdSlice.actions;

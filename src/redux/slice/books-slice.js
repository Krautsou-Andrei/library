import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action) {
      const stateBooks = state;
      stateBooks.books = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;

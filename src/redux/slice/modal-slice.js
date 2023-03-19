import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBooking: false,
  refButtonBook: '',
  refButtonBookPage: '',
  refButtonComments: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setBooking(state, action) {
      const stateBooking = state;
      stateBooking.isBooking = action.payload;
    },
    setButtonBook(state, action) {
      const stateBooking = state;
      stateBooking.refButtonBook = action.payload;
    },
    setButtonBookPage(state, action) {
      const stateBooking = state;
      stateBooking.refButtonBookPage = action.payload;
    },
    setButtonComments(state, action) {
      const stateBooking = state;
      stateBooking.refButtonComments = action.payload;
    },
  },
});

export const { setBooking, setButtonBook, setButtonBookPage, setButtonComments } = modalSlice.actions;

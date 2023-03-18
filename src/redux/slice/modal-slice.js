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
      console.log(' stateBooking.refButtonBook = ', action.payload);
      const stateBooking = state;
      stateBooking.refButtonBook = action.payload;
    },
    setButtonBookPage(state, action) {
      console.log('stateBooking.refButtonBookPage = ,', action.payload);
      const stateBooking = state;
      stateBooking.refButtonBookPage = action.payload;
    },
    setButtonComments(state, action) {
      console.log('stateBooking.refButtonComments =', action.payload);
      const stateBooking = state;
      stateBooking.refButtonComments = action.payload;
    },
  },
});

export const { setBooking, setButtonBook, setButtonBookPage, setButtonComments } = modalSlice.actions;

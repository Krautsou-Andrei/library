import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBooking: false,
  isComments: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setBooking(state, action) {
      const stateBooking = state;
      stateBooking.isBooking = action.payload;
    },
    setComments(state, action) {
      const stateBooking = state;

      stateBooking.isComments = action.payload;
    },
  },
});

export const { setBooking, setComments } = modalSlice.actions;

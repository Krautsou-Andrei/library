import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingCurrentUser: false,
  bookingDate: '',
};

export const bookingCurrentUserSlice = createSlice({
  name: 'bookingCurrentUser',
  initialState,
  reducers: {
    setBookingCurrentUser(state, action) {
      const booking = state;
      booking.bookingCurrentUser = action.payload;
    },
    setBookingDate(state, action) {
      const booking = state;

      booking.bookingDate = action.payload;
    },
  },
});

export const { setBookingCurrentUser, setBookingDate } = bookingCurrentUserSlice.actions;

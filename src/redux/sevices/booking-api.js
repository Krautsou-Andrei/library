import { api } from './api';

export const bookingApi = api.injectEndpoints({
  endpoints: (build) => ({
    booking: build.mutation({
      query: (data) => ({
        url: `/api/bookings`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
      
        } catch (error) {
          console.error('error booking', error);
        }
      },
      providesTags: () => ['books'],
    }),

    updateBooking: build.mutation({
      query: ({ dataId, data }) => ({
        url: `/api/bookings/${dataId}`,
        method: 'PUT',
        body: { data },
      }),
      providesTags: () => ['books'],
    }),

    deleteBooking: build.mutation({
      query: ({ dataId }) => ({
        url: `/api/bookings/${dataId}`,
        method: 'DELETE',
      }),
      providesTags: () => ['books'],
    }),
  }),
});

export const { useBookingMutation, useUpdateBookingMutation, useDeleteBookingMutation } = bookingApi;

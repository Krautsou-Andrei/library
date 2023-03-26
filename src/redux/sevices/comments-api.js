import { api } from './api';

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendComments: build.mutation({
      query: (data) => ({
        url: '/api/comments',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.error('erro comments', error);
        }
      },
    }),

    editComments: build.mutation({
      query: ({ commentId, data }) => ({
        url: `/api/comments/${commentId}`,
        method: 'PUT',
        body: { data },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log('editComments', result);
        } catch (error) {
          console.error('error editComments', error);
        }
      },
    }),
  }),
});

export const { useSendCommentsMutation, useEditCommentsMutation } = commentsApi;

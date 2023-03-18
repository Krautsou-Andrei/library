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
          console.error('erro registration', error);
        }
      },
    }),
  }),
});

export const { useSendCommentsMutation } = commentsApi;

import { api } from './api';

export const forgotApi = api.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation({
      query: ({ email }) => ({
        url: `/api/auth/forgot-password`,
        method: 'POST',
        body: { email },
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

export const { useForgotPasswordMutation } = forgotApi;

import { api } from './api';

export const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({ email, username, password, firstName, lastName, phone }) => ({
        url: `/api/auth/local/register`,
        method: 'POST',
        body: {
          email,
          username,
          password,
          firstName,
          lastName,
          phone,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { jwt } = result.data;
        } catch (error) {
          console.error('erro registration', error);
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation } = registrationApi;

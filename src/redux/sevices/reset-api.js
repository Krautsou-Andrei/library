// import { setUser } from '../slice/user-slice';
import { api } from './api';

export const resetApi = api.injectEndpoints({
  endpoints: (build) => ({
    recoveryPassword: build.mutation({
      query: ({ password, passwordConfirmation, code }) => ({
        url: `/api/auth/reset-password`,
        method: 'POST',
        body: {
          password,
          passwordConfirmation,
          code,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // dispatch(setUser(result.data));
        } catch (error) {
          console.log('error reset password', error);
        }
      },
    }),
  }),
});

export const { useRecoveryPasswordMutation } = resetApi;

import { setUser } from '../slice/user-slice';
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticationUser: build.mutation({
      query: ({ identifier, password }) => ({
        url: `/api/auth/local`,
        method: 'POST',
        body: {
          identifier,
          password,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { jwt } = result.data;

          const user = result.data;

          localStorage.setItem('token', jwt);
          dispatch(setUser({ user }));
          localStorage.setItem('user', JSON.stringify(result.data.user));
          sessionStorage.setItem('user', JSON.stringify(result.data.user));
        } catch (error) {
          console.error('erro authentication', error);
        }
      },
    }),
  }),
});

export const { useAuthenticationUserMutation } = authApi;

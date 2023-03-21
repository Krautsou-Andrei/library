import { setAuthenticationUser } from '../slice/user-authentication-slice';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: `/api/users/me`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const user = result.data;
          dispatch(setAuthenticationUser({ user }));
          localStorage.setItem('userAuth', JSON.stringify(user));
          console.log('result user', result);
        } catch (error) {
          console.error('error getUser', error);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery } = userApi;

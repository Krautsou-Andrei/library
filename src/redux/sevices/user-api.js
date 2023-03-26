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

    editDataUser: build.mutation({
      query: ({ userId, editUser }) => ({
        url: `/api/users/${userId}`,
        method: 'PUT',
        body: editUser,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const user = result.data;
          dispatch(setAuthenticationUser({ user }));
          localStorage.setItem('userAuth', JSON.stringify(user));
          console.log('editDataUserr', result.data);
        } catch (error) {
          console.error('error editDataUser', error);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useEditDataUserMutation } = userApi;

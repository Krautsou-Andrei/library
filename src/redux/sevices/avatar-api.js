import { setAuthenticationUser } from '../slice/user-authentication-slice';
import { api } from './api';

export const avatarApi = api.injectEndpoints({
  endpoints: (build) => ({
    setAvatar: build.mutation({
      query: (files) => ({
        url: `/api/upload`,
        method: 'POST',
        body: files,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const avatar = result.data[0];

          localStorage.setItem('avatar', JSON.stringify(avatar));
        } catch (error) {
          console.error('error setAvatar', error);
        }
      },
    }),
    getAvatar: build.mutation({
      query: ({ id, avatar }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: { avatar },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const user = result.data;

          dispatch(setAuthenticationUser({ user }));
          localStorage.setItem('userAuth', JSON.stringify(user));
        } catch (error) {
          console.error('error getAvatar', error);
        }
      },
    }),
  }),
});

export const { useSetAvatarMutation, useGetAvatarMutation } = avatarApi;

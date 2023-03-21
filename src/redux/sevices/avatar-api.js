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
          // dispatch(setAuthenticationUser({ user }));
          // localStorage.setItem('userAuth', JSON.stringify(user));
          localStorage.setItem('avatar', JSON.stringify(avatar));
          console.log('result avatar', avatar);
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
          // const avatar = result.data;

          // localStorage.setItem('avatar', JSON.stringify(avatar));

          const user = result.data;
          console.log('result get avatar', user);
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

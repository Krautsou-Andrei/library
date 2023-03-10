import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = 'https://strapi.cleverland.by';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['books', 'categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (_) => ({}),
});

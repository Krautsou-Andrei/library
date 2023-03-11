import { setBookId } from '../slice/book-id-slice';
import { setBooks } from '../slice/books-slice';
import { setCategories } from '../slice/categoties-slice';
import { setErrorMain } from '../slice/error-slice';

import { api } from './api';

export const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => `api/books`,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data) dispatch(setBooks(result.data));
        } catch (error) {
          dispatch(setErrorMain(true));
          console.error('erro books', error);
        }
      },
      providesTags: () => ['books'],
    }),

    getCategoties: build.query({
      query: () => 'api/categories',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data) dispatch(setCategories(result.data));
        } catch (error) {
          dispatch(setErrorMain(true));
          console.error('error catesories', error);
        }
      },
      providesTags: () => ['categories'],
    }),
    getBookId: build.query({
      query: (id) => `api/books/${id}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.id) dispatch(setBookId(result.data.id));
        } catch (error) {
          console.log('erroe bookid', error);
        }
      },
    }),
  }),
});

export const { useGetBooksQuery, useGetCategotiesQuery, useGetBookIdQuery } = booksApi;

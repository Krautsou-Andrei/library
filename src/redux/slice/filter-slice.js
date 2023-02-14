import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategoty: 'Все книги',
  books: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      const stateFilter = state;
      const { category, allBooks, dataCategories } = action.payload;

      if (dataCategories) {
        dataCategories.forEach((item) => {
          if (item.path === category) {
            stateFilter.currentCategoty = item.name;
          }
        });
      }

      if (category && category === 'all' && allBooks) {
        stateFilter.currentCategoty = 'Все книги';
      }
      if (category && category !== 'all' && allBooks) {
        if (stateFilter.currentCategoty) {
          const filteredBooks = allBooks.filter((book) => book.categories.includes(stateFilter.currentCategoty));

          stateFilter.books = filteredBooks;
        }
      } else {
        stateFilter.books = allBooks;
      }
    },
  },
});

export const { changeFilter } = filterSlice.actions;

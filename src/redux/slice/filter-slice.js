import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategotyTitle: 'Все книги',
  currentCategoryPath: 'all',
  isOrder: 'true',
  books: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentCategotyPath: (state, action) => {
      const stateFilter = state;
      stateFilter.currentCategoryPath = action.payload;
    },
    setCurrentCategotyTitle: (state, action) => {
      const stateFilter = state;
      stateFilter.currentCategotyTitle = action.payload;
    },
    setBooksFilter: (state, action) => {
      const stateFilter = state;
      stateFilter.books = action.payload.books;
    },
    setChangeOrder: (state, acton) => {
      const stateFilter = state;
      stateFilter.isOrder = !stateFilter.isOrder;
    },
  },
});

export const { setCurrentCategotyPath, setCurrentCategotyTitle, setBooksFilter, setChangeOrder } = filterSlice.actions;

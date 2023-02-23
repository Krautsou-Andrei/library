import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  isMatchValues: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      const stateSearchQuery = state;
      stateSearchQuery.searchQuery = action.payload.searchQuery;
    },
    setMatchValues: (state, action) => {
      const stateMatchValues = state;
      stateMatchValues.isMatchValues = action.payload;
    },
  },
});

export const { setSearchQuery, setMatchValues } = searchSlice.actions;

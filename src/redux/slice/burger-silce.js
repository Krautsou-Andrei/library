import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenMenuBurger: false,
};

export const stateMenuBurger = createSlice({
  name: 'stateMenuBurger',
  initialState,
  reducers: {
    toggleMenuMode(state) {
      const menuBurger = state;
      menuBurger.isOpenMenuBurger = !menuBurger.isOpenMenuBurger;
    },
  },
});

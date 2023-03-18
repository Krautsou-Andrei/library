import { configureStore } from '@reduxjs/toolkit';
import { api } from './sevices/api';
import { stateMenuBurger } from './slice/burger-silce';
import { booksSlice } from './slice/books-slice';
import { categoriesSlice } from './slice/categoties-slice';
import { bookIdSlice } from './slice/book-id-slice';
import { errorSlice } from './slice/error-slice';
import { filterSlice } from './slice/filter-slice';
import { searchSlice } from './slice/search-slice';
import { userRegistrationSlice } from './slice/user-registration-slice';
import { authenticationUserSlice } from './slice/user-authentication-slice';
import { modalSlice } from './slice/modal-slice';
import { userSlice } from './slice/user-slice';
import { selectBookSlice } from './slice/select-book-slice';
import { bookingCurrentUserSlice } from './slice/booking-current-user-slice';

export const store = configureStore({
  reducer: {
    book: bookIdSlice.reducer,
    books: booksSlice.reducer,
    categories: categoriesSlice.reducer,
    burgerMenu: stateMenuBurger.reducer,
    errorMain: errorSlice.reducer,
    filter: filterSlice.reducer,
    search: searchSlice.reducer,
    userRegistration: userRegistrationSlice.reducer,
    authenticationUser: authenticationUserSlice.reducer,
    user: userSlice.reducer,
    booking: modalSlice.reducer,
    selectBook: selectBookSlice.reducer,
    bookingCurrentUser: bookingCurrentUserSlice.reducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(api.middleware),
});

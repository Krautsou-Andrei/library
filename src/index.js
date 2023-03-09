import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from './store/store';
import { store } from './redux';

import { Layout } from './layout/layout';
import { LayoutAuthentication } from './layout/layout-authentication';
import { MainPage } from './pages/main';
import { BookPage } from './pages/components/book-page';
import { Contented } from './pages/components/contented';
import { Offer } from './pages/components/offer';
import { LoginPage } from './pages/components/login-page';
import { RegisterPage } from './pages/components/register-page';
import { ForgotPage } from './pages/components/forgot-page';

import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<MainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='books/:category' element={<Contented />} />
              <Route path='regulations' element={<Offer title='Правила пользования' />} />
              <Route path='offer' element={<Offer title='Договор оферты' />} />
            </Route>
            <Route path='books/:category/:bookId' element={<BookPage />} />
          </Route>
          <Route element={<LayoutAuthentication />}>
            <Route path='/' element={<Navigate to='/auth' />} />
            <Route path='/auth' element={<LoginPage />} />
            <Route path='/registration' element={<RegisterPage />} />
            <Route path='/forgot-pass' element={<ForgotPage />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
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
import { ProfilUser } from './pages/components/profil/profil-user';

import './style/style.scss';
import { routs } from './data/routs';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path={routs.profile} element={<ProfilUser />} />
            <Route element={<MainPage />}>
              <Route path='/' element={<Navigate to={routs.booksAllRedirect} />} />
              <Route path={routs.booksCategory} element={<Contented />} />
              <Route path={routs.regulations} element={<Offer title='Правила пользования' />} />
              <Route path={routs.offer} element={<Offer title='Договор оферты' />} />
            </Route>
            <Route path={routs.booksCategoryId} element={<BookPage />} />
          </Route>
          <Route element={<LayoutAuthentication />}>
            <Route path='/' element={<Navigate to={routs.auth} />} />
            <Route path={routs.auth} element={<LoginPage />} />
            <Route path={routs.registrations} element={<RegisterPage />} />
            <Route path={routs.forgotPass} element={<ForgotPage />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

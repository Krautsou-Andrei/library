import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import style from './layout-authentication.module.scss';

export const LayoutAuthentication = () => {
  const navigation = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    // if (document?.cookie.match(/token=(.+?)(;|$)/)) {
    if (token) {
      navigation('books/all');
    }
  }, [navigation, token]);
  return (
    <div className={style['login-page']} data-test-id='auth'>
      <div className={style['login-page__logo']}>
        <span className={style.logo}>Cleverland</span>
      </div>
      <Outlet />
    </div>
  );
};

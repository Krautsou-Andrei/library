import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import style from './layout-authentication.module.scss';

export const LayoutAuthentication = () => {
  const navigation = useNavigate();

  const user = useSelector((state) => state.user.user);
  const token = user.jwt;

  // if (!Object.keys(user).length) {
  //   token = localStorage.getItem('token');
  // }

  useEffect(() => {
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

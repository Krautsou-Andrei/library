import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const LayoutMainPage = () => {
  const navigation = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    // if (!document?.cookie.match(/token=(.+?)(;|$)/) || !isInitialUser) {
    if (!token) {
      navigation('/auth');
    }
  }, [navigation, token]);

  return (
    <main className='main'>
      <Outlet />
    </main>
  );
};

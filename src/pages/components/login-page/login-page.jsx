import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

import {
  useAuthenticationUserMutation,
  useLazyGetBooksQuery,
  useLazyGetCategotiesQuery,
  useLazyGetUserQuery,
  userApi,
} from '../../../redux';

import { authenticationSchema } from '../../../helpers/validation';
import { FormEnter } from '../form-enter';
import { Loading } from '../loading';
import { ModalWindow } from '../modals-windows';

import { modalErrorAuthentication } from '../modals-windows/type-modal';

import style from '../form-enter/form-enter.module.scss';

export const LoginPage = () => {
  const [initialUserError400, setInitialUserError400] = useState(false);
  const [initialUserError, setInitialUserError] = useState(false);
  const [initialUser, setInitialUser] = useState({});

  const navigation = useNavigate();

  const typeLoginPage = {
    title: 'Bход в личный кабинет',
    inputOneName: 'identifier',
    inputOneType: 'text',
    inputOnePlaseholder: 'Логин',
    inputTwoName: 'password',
    inputTwoType: 'password',
    inputTwoPlaseholder: 'Пароль',
    buttonText: 'Вход',
    linkHeader: 'Нет учётной записи?',
    linkTitle: 'Регистрация',
    linkPath: '/registration',
  };
  const [authenticationUser, { isLoading }] = useAuthenticationUserMutation();
  const [triggerUser] = useLazyGetUserQuery();
  const [triggerBooks] = useLazyGetBooksQuery();
  const [triggerCategories] = useLazyGetCategotiesQuery();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    watch,
    trigger,
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(authenticationSchema),
  });

  const user = useSelector((state) => state.user.user);

  let token = user?.jwt;

  if (!Object.keys(user).length) {
    token = localStorage.getItem('token');
  }

  useEffect(() => {
    if (token) {
      navigation('books/all');
    }
  }, [navigation, token]);

  const goToPage = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      goToPage();
    } else {
      triggerBooks();
      triggerCategories();
      triggerUser();
      navigation('/books/all');
    }
  };

  const setAuthentication = (result) => {
    if (result?.error?.status === 400) {
      setInitialUserError400(true);
    } else if (result?.error?.status && result?.error?.status !== 400) {
      setInitialUserError(true);
      setInitialUserError400(false);
    } else {
      setInitialUserError(false);
      // triggerUser();
      goToPage();
    }
  };

  const onSubmit = (data) => {
    setInitialUser(data);
    authenticationUser(data).then((result) => setAuthentication(result));
  };

  const repeatSubmit = () => {
    authenticationUser(initialUser).then((result) => setAuthentication(result));
  };

  return (
    <>
      {isLoading && <Loading />}
      {!initialUserError && (
        <form
          className={`${style['login-page__form']} ${style.form} `}
          action=''
          onSubmit={handleSubmit(onSubmit)}
          data-test-id='auth-form'
        >
          <FormEnter
            type={typeLoginPage}
            initialUserError400={initialUserError400}
            handleSubmit={handleSubmit}
            register={register}
            clearErrors={clearErrors}
            errors={errors}
            watchInputOne={watch('identifier')}
            watchInputTwo={watch('password')}
            isValid={isValid}
            trigger={trigger}
          />
        </form>
      )}
      {initialUserError && <ModalWindow typeModal={modalErrorAuthentication} onSubmit={repeatSubmit} />}
    </>
  );
};

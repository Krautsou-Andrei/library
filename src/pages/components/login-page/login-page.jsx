import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthenticationUserMutation } from '../../../redux';

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

  const {
    register,
    formState: { errors },
    handleSubmit,

    clearErrors,
    watch,
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(authenticationSchema),
  });

  const setAuthentication = (result) => {
    if (result?.error?.status === 400) {
      setInitialUserError400(true);
    } else if (result?.error?.status && result?.error?.status !== 400) {
      setInitialUserError(true);
      setInitialUserError400(false);
    } else {
      setInitialUserError(false);
      setTimeout(() => navigation('/books/all'), 1000);
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
          />
        </form>
      )}
      {initialUserError && <ModalWindow typeModal={modalErrorAuthentication} onSubmit={repeatSubmit} />}
    </>
  );
};

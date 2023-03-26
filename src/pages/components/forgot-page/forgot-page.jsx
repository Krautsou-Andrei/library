import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { forgotPasswordSchema, recovetyPasswordSchema } from '../../../helpers/validation';
import { useForgotPasswordMutation, useRecoveryPasswordMutation } from '../../../redux';
import { FormEnter } from '../form-enter';
import { Loading } from '../loading';
import { RecoveryPasswordPage } from '../recovery-password-page';
import { ModalWindow } from '../modals-windows';
import { modalSuccessForgot, modalSuccessRecovery, modalErrorRecovery } from '../modals-windows/type-modal';

import style from '../form-enter/form-enter.module.scss';

export const ForgotPage = () => {
  const [code, setCode] = useState();
  const [isError, setError] = useState(false);
  const { search } = useLocation();
  const typeForgotPage = {
    title: 'Восстановление пароля',
    inputTwoName: 'email',
    inputTwoType: 'email',
    inputTwoPlaseholder: 'Email',
    buttonText: 'Восстановить',
    linkHeader: 'Нет учётной записи?',
    linkTitle: 'Регистрация',
    linkPath: '/registration',
  };

  const [forgotPassword, { isSuccess: isSuccessForgot, isLoading: isLoadingForgot, error }] =
    useForgotPasswordMutation();
  const [recoveryPassword, { isSuccess: isSuccessRecovery, isLoading: isLoadingRecovery, isError: isErrorRecovery }] =
    useRecoveryPasswordMutation();

  useEffect(() => {
    if (search.split('=')[1]) {
      setCode(search.split('=')[1]);
    }
  }, [setCode, search]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    clearErrors,
    trigger,
  } = useForm({
    mode: 'all',

    criteriaMode: 'all',
    shouldFocusError: 'true',
    resolver: yupResolver(code && !isError && !isSuccessRecovery ? recovetyPasswordSchema : forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    forgotPassword(data);
  };

  const setErrorRecovery = (result) => {
    if (result?.error) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onSubmitRecoveryPassword = (data) => {
    recoveryPassword({ ...data, code }).then((result) => setErrorRecovery(result));
  };

  return (
    <>
      {(isLoadingForgot || isLoadingRecovery) && <Loading />}
      {!isSuccessForgot && !code && !isErrorRecovery && (
        <form
          className={`${style['login-page__form']} ${style.form} `}
          action=''
          onSubmit={handleSubmit(onSubmit)}
          data-test-id='send-email-form'
        >
          <FormEnter
            type={typeForgotPage}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            watchInputTwo={watch('email')}
            error={error}
            trigger={trigger}
            isValid={isValid}
          />
        </form>
      )}
      {code && !isError && !isSuccessRecovery && (
        <RecoveryPasswordPage
          onSubmit={onSubmitRecoveryPassword}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          watch={watch}
          clearErrors={clearErrors}
          trigger={trigger}
          isValid={isValid}
        />
      )}
      {isSuccessForgot && <ModalWindow typeModal={modalSuccessForgot} />}
      {isSuccessRecovery && <ModalWindow typeModal={modalSuccessRecovery} />}
      {isErrorRecovery && isError && !isSuccessRecovery && (
        <ModalWindow typeModal={modalErrorRecovery} onSubmit={setErrorRecovery} />
      )}
    </>
  );
};

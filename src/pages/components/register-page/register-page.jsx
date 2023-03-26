import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegisterUserMutation } from '../../../redux';

import { RegisterStepOne } from './register-step-one';
import { RegisterStepTwo } from './register-step-two';
import { RegisterStepThree } from './register-step-three';
import { Loading } from '../loading';
import { ModalWindow } from '../modals-windows';
import { registerStepOneSchema, registerStepTwoSchema, registerStepThreeSchema } from '../../../helpers/validation';
import { useErrorVaidate } from '../../../hooks/error-validate';

import {
  modalSeccessRegistration,
  modalErrorRegistration,
  modalErrorRegistration400,
} from '../modals-windows/type-modal';

import style from '../form-enter/form-enter.module.scss';

export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [initialUserError400, setInitialUserError400] = useState(false);
  const [initialUserError, setInitialUserError] = useState(false);
  const [initialUser, setInitialUser] = useState({});

  const selectSchema = () => {
    if (step === 1) {
      return registerStepOneSchema;
    }
    if (step === 2) {
      return registerStepTwoSchema;
    }
    if (step === 3) {
      return registerStepThreeSchema;
    }
    return registerStepOneSchema;
  };

  const {
    register,
    handleSubmit,

    watch,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',

    criteriaMode: 'all',
    shouldFocusError: 'true',
    // mode: 'onBlur',
    // reValidateMode: 'onBlur',
    // shouldFocusError: false,
    resolver: yupResolver(selectSchema(step)),
  });

  const [registerUser, { isLoading, isSuccess, isError }] = useRegisterUserMutation();

  const setRegistration = (result) => {
    if (result?.error?.status === 400) {
      setInitialUserError400(!initialUserError400);
    }
    if (result?.error?.status && result?.error?.status !== 400) {
      setInitialUserError(!initialUserError);
    }
  };

  const repeatSubmit = () => {
    registerUser(initialUser).then((result) => setRegistration(result));
    setStep(1);
  };

  const onSubmitStep = () => {
    if (step > 3) {
      setStep(1);
    }

    if (initialUserError400) {
      setInitialUserError400(false);
    }
  };

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(step + 1);
    }

    if (step === 2) {
      setStep(step + 1);
    }
    if (step === 3) {
      setStep(step + 1);

      setInitialUser({ data });
      registerUser(data).then((result) => setRegistration(result));
    }
  };

  const { errorsArray: errorsUsername } = useErrorVaidate(registerStepOneSchema, watch('username'), 'username');
  const { errorsArray: errorsPassword } = useErrorVaidate(registerStepOneSchema, watch('password'), 'password');

  return (
    <div>
      {isLoading && <Loading />}
      {!isSuccess && !initialUserError && !initialUserError400 && (
        <form
          className={`${style['login-page__form']} ${style.form} `}
          action=''
          onSubmit={handleSubmit(onSubmit)}
          data-test-id='register-form'
        >
          {step === 1 && (
            <RegisterStepOne
              step={step}
              register={register}
              clearErrors={clearErrors}
              errors={errors}
              errorsInputOne={errorsUsername}
              errorsInputTwo={errorsPassword}
              watch={watch}
              trigger={trigger}
              isValid={isValid}
            />
          )}
          {step === 2 && (
            <RegisterStepTwo
              step={step}
              register={register}
              trigger={trigger}
              clearErrors={clearErrors}
              errors={errors}
              watch={watch}
              isValid={isValid}
            />
          )}
          {step === 3 && (
            <RegisterStepThree
              step={step}
              register={register}
              clearErrors={clearErrors}
              errors={errors}
              watch={watch}
              trigger={trigger}
              isValid={isValid}
            />
          )}
        </form>
      )}
      {isSuccess && !initialUserError && !initialUserError400 && <ModalWindow typeModal={modalSeccessRegistration} />}
      {isError && initialUserError && <ModalWindow typeModal={modalErrorRegistration} onSubmit={repeatSubmit} />}
      {initialUserError400 && <ModalWindow typeModal={modalErrorRegistration400} onSubmit={onSubmitStep} />}
    </div>
  );
};

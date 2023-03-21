import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegisterUserMutation } from '../../../../../redux';

import {
  modalErrorRegistration,
  modalErrorRegistration400,
  modalSeccessRegistration,
} from '../../../modals-windows/type-modal';
import { useErrorVaidate } from '../../../../../hooks/error-validate';
import {
  registerStepOneSchema,
  registerStepThreeSchema,
  registerStepTwoSchema,
} from '../../../../../helpers/validation';
import { ModalWindow } from '../../../modals-windows';
import { Loading } from '../../../loading';
import { RegisterStepTwo } from '../../../register-page/register-step-two';
import { RegisterStepThree } from '../../../register-page/register-step-three';
import { RegisterStepOne } from '../../../register-page/register-step-one';

import style from '../../../form-enter/form-enter.module.scss';
import { registerStepOne } from '../../../form-enter/type-form';
import { FormEnter } from '../../../form-enter';
import { CustomInput } from '../../../custom-input';
// import style from '../../../form-enter'

export const ChangeInfoUser = () => {
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
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: false,
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
    // setStep(1);
  };

  // const onSubmitStep = () => {
  //   if (step > 3) {
  //     setStep(1);
  //   }

  //   if (initialUserError400) {
  //     setInitialUserError400(false);
  //   }
  // };

  const onSubmit = (data) => {
    // if (step === 1) {
    //   setStep(step + 1);
    // }

    // if (step === 2) {
    //   setStep(step + 1);
    // }
    // if (step === 3) {
    //   setStep(step + 1);

    setInitialUser({ data });
    registerUser(data).then((result) => setRegistration(result));
    // }
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
          <CustomInput
            type={registerStepOne}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            errorsInputOne={errorsUsername}
            errorsInputTwo={errorsPassword}
            watchInputOne={watch('username')}
            watchInputTwo={watch('password')}
          />
          {/* {step === 1 && ( */}

          {/* {step === 2 && ( */}
          <RegisterStepTwo step={step} register={register} clearErrors={clearErrors} errors={errors} watch={watch} />
          {/* )} */}
          {/* {step === 3 && ( */}
          <RegisterStepThree step={step} register={register} clearErrors={clearErrors} errors={errors} watch={watch} />
          {/* )} */}
        </form>
      )}
      {isSuccess && !initialUserError && !initialUserError400 && <ModalWindow typeModal={modalSeccessRegistration} />}
      {/* {isError && initialUserError && <ModalWindow typeModal={modalErrorRegistration} onSubmit={repeatSubmit} />} */}
      {/* {initialUserError400 && <ModalWindow typeModal={modalErrorRegistration400} onSubmit={onSubmitStep} />} */}
    </div>
  );
};

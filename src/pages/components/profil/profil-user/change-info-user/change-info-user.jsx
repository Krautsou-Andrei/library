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
  userSchema,
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

export const ChangeInfoUser = ({
  register,
  style,
  errors,
  clearErrors,
  watch,
  trigger,
  inputDisabled,
  setInputDisabled,
  isDirty,
  isValid,
  getFieldState,
  isTouched,
  // resetField,
}) => {
  const [initialUserError400, setInitialUserError400] = useState(false);
  const [initialUserError, setInitialUserError] = useState(false);
  const [initialUser, setInitialUser] = useState({});

  // const selectSchema = () => {
  //   if (step === 1) {
  //     return registerStepOneSchema;
  //   }
  //   if (step === 2) {
  //     return registerStepTwoSchema;
  //   }
  //   if (step === 3) {
  //     return registerStepThreeSchema;
  //   }
  //   return registerStepOneSchema;
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   clearErrors,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'onBlur',
  //   reValidateMode: 'onBlur',
  //   shouldFocusError: false,
  //   resolver: yupResolver(selectSchema(step)),
  // });

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

  // const { errorsArray: errorsUsername } = useErrorVaidate(registerStepOneSchema, watch('username'), 'username');
  // const { errorsArray: errorsPassword } = useErrorVaidate(registerStepOneSchema, watch('password'), 'password');
  const typeRowOne = {
    step: '1',
    inputOneName: 'login',
    inputOneType: 'text',
    inputOnePlaseholder: 'Логин',
    inputTwoName: 'password',
    inputTwoType: 'password',
    inputTwoPlaseholder: 'Пароль',
  };
  const typeRowTwo = {
    step: `2`,
    inputOneName: 'firstName',
    inputOneType: 'text',
    inputOnePlaseholder: 'Имя',
    inputTwoName: 'lastName',
    inputTwoType: 'text',
    inputTwoPlaseholder: 'Фамилия',
  };
  const typeRowThree = {
    step: `3`,
    inputOneName: 'phone',
    inputOneType: 'text',
    inputOnePlaseholder: 'Номер телефона',
    inputTwoName: 'email',
    inputTwoType: 'email',
    inputTwoPlaseholder: 'E-mail',
  };

  const { errorsArray: errorsUsername } = useErrorVaidate(userSchema, watch('login'), 'login');
  const { errorsArray: errorsPassword } = useErrorVaidate(userSchema, watch('password'), 'password');

  return (
    <>
      <CustomInput
        type={typeRowOne}
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        watch={watch}
        trigger={trigger}
        errorsInputOne={errorsUsername}
        errorsInputTwo={errorsPassword}
        style={style}
        inputDisabled={inputDisabled}
        setInputDisabled={setInputDisabled}
        // resetField={resetField}
        isDirty={isDirty}
        isValid={isValid}
        getFieldState={getFieldState}
        isTouched={isTouched}
      />
      <CustomInput
        type={typeRowTwo}
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        watch={watch}
        trigger={trigger}
        style={style}
        inputDisabled={inputDisabled}
        setInputDisabled={setInputDisabled}
        // resetField={resetField}
        isDirty={isDirty}
        isValid={isValid}
        getFieldState={getFieldState}
        isTouched={isTouched}
      />
      <CustomInput
        type={typeRowThree}
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        watch={watch}
        trigger={trigger}
        style={style}
        inputDisabled={inputDisabled}
        setInputDisabled={setInputDisabled}
        // resetField={resetField}
        isDirty={isDirty}
        isValid={isValid}
        getFieldState={getFieldState}
        isTouched={isTouched}
      />
    </>
  );
};

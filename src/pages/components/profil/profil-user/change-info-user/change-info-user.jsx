import { useErrorVaidate } from '../../../../../hooks/error-validate';
import { userSchema } from '../../../../../helpers/validation';

import { CustomInput } from '../../../custom-input';

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
}) => {
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
        isDirty={isDirty}
        isValid={isValid}
        getFieldState={getFieldState}
        isTouched={isTouched}
      />
    </>
  );
};

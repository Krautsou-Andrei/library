import { FormEnter } from '../../form-enter';

export const RegisterStepOne = ({
  step,
  register,
  clearErrors,
  errors,
  trigger,
  isValid,
  errorsInputOne,
  errorsInputTwo,
  watch,
}) => {
  const typeRegistrationStepOne = {
    step: `${step}`,
    title: 'Регистрация',
    inputOneName: 'username',
    inputOneType: 'text',
    inputOnePlaseholder: 'Придумайте логин для входа',
    inputTwoName: 'password',
    inputTwoType: 'password',
    inputTwoPlaseholder: 'Пароль',
    buttonText: 'следующий шаг',
    linkHeader: 'Есть учётная запись?',
    linkTitle: 'Войти',
    linkPath: '/auth',
  };

  return (
    <FormEnter
      type={typeRegistrationStepOne}
      register={register}
      errors={errors}
      clearErrors={clearErrors}
      errorsInputOne={errorsInputOne}
      errorsInputTwo={errorsInputTwo}
      watchInputOne={watch('username')}
      watchInputTwo={watch('password')}
      isValid={isValid}
      trigger={trigger}
    />
  );
};

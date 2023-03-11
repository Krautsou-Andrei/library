import { FormEnter } from '../../form-enter';

export const RegisterStepThree = ({ step, register, clearErrors, errors, watch }) => {
  const typeRegistrationStepOne = {
    step: `${step}`,
    title: 'Регистрация',
    inputOneName: 'phone',
    inputOneType: 'text',
    inputOnePlaseholder: 'Номер телефона',
    inputTwoName: 'email',
    inputTwoType: 'email',
    inputTwoPlaseholder: 'E-mail',
    buttonText: 'зарегистрироваться',
    linkHeader: 'Есть учётная запись?',
    linkTitle: 'Войти',
    linkPath: '/auth',
  };

  return (
    <FormEnter
      type={typeRegistrationStepOne}
      register={register}
      clearErrors={clearErrors}
      errors={errors}
      watchInputOne={watch('phone')}
      watchInputTwo={watch('email')}
    />
  );
};

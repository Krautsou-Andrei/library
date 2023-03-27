import { FormEnter } from '../../form-enter';

export const RegisterStepTwo = ({ step, register, clearErrors, errors, watch, trigger, isValid }) => {
  const typeRegistrationStepTwo = {
    step: `${step}`,
    title: 'Регистрация',
    inputOneName: 'firstName',
    inputOneType: 'text',
    inputOnePlaseholder: 'Имя',
    inputTwoName: 'lastName',
    inputTwoType: 'text',
    inputTwoPlaseholder: 'Фамилия',
    buttonText: 'последний шаг',
    linkHeader: 'Есть учётная запись?',
    linkTitle: 'Войти',
    linkPath: '/auth',
  };

  return (
    <FormEnter
      type={typeRegistrationStepTwo}
      register={register}
      clearErrors={clearErrors}
      errors={errors}
      watchInputOne={watch('firstName')}
      watchInputTwo={watch('lastName')}
      isValid={isValid}
      trigger={trigger}
    />
  );
};

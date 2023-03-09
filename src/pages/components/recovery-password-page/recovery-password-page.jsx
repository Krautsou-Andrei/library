import { useErrorVaidate } from '../../../hooks/error-validate';
import { recovetyPasswordSchema } from '../../../helpers/validation';
import { FormEnter } from '../form-enter';

import style from '../form-enter/form-enter.module.scss';

export const RecoveryPasswordPage = ({ onSubmit, handleSubmit, register, clearErrors, errors, watch }) => {
  const typeRecoveryPage = {
    title: 'Восстановление пароля',
    inputOneName: 'password',
    inputOneType: 'password',
    inputOnePlaseholder: 'Новый пароль',
    inputTwoName: 'passwordConfirmation',
    inputTwoType: 'password',
    inputTwoPlaseholder: 'Повторите пароль',
    buttonText: 'сохранить изменения',
    linkHeader: 'После сохранения войдите в библиотеку, используя новый пароль',
  };

  const { errorsArray: errorPassword } = useErrorVaidate(recovetyPasswordSchema, watch('password'), 'password');

  return (
    <form
      className={`${style['login-page__form']} ${style.form} `}
      action=''
      onSubmit={handleSubmit(onSubmit)}
      data-test-id='reset-password-form'
    >
      <FormEnter
        type={typeRecoveryPage}
        register={register}
        clearErrors={clearErrors}
        errors={errors}
        errorsInputOne={errorPassword}
        watchInputOne={watch('password')}
        watchInputTwo={watch('passwordConfirmation')}
      />
    </form>
  );
};

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { ButtonSubmit } from '../buttons/button-submit/button-submit';
import { ErrorHelperForInput } from '../../../helpers/error-helper-for-input';

export const CustomInput = ({
  type,
  register,
  errors,
  errorsInputOne,
  errorsInputTwo,
  clearErrors,
  error,
  watch,
  trigger,
  inputDisabled,
  isValid,
  style,
}) => {
  const [isViewPassword, setViewPassword] = useState(false);
  const [isViewPasswordOne, setViewPasswordOne] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [viewMask, setViewMask] = useState(false);

  const {
    step,
    title,
    inputOneName,
    inputOneType,
    inputOnePlaseholder,
    inputTwoName,
    inputTwoType,
    inputTwoPlaseholder,
  } = type;

  const watchInputOne = watch(`${inputOneName}`);
  const watchInputTwo = watch(`${inputTwoName}`);

  const changeViewPassword = () => {
    setViewPassword(!isViewPassword);
  };

  const changeViewPasswordOne = () => {
    setViewPasswordOne(!isViewPasswordOne);
  };

  const clearErrorFocus = (event) => {
    setErrorValid(false);

    const trueWatchInputOne = !watchInputOne;
    const trueWatchInputTwo = !watchInputTwo;

    if (!trueWatchInputOne) {
      clearErrors(inputOneName);
    }
    if (!trueWatchInputTwo) {
      clearErrors(inputTwoName);
    }
    if (event.target.name === 'phone') {
      setViewMask(true);
    }
  };

  const viewErrorOnBlure = () => {
    if (!isValid) {
      setErrorValid(true);
    }
    if (trigger) {
      trigger();
    }
  };

  return (
    <div className={style['field-wrapper']}>
      {inputOneType && (
        <div className={style['text-field']}>
          <div className={style['input-wrapper']}>
            {step !== '2' ? (
              step !== '3' ? (
                <div className={style['password-wrapper']}>
                  <input
                    className={style['form-input']}
                    id={`${inputOneName}`}
                    type={`${!isViewPasswordOne ? inputOneType : 'text'}`}
                    name={`${inputOneName}`}
                    placeholder=' '
                    {...register(`${inputOneName}`)}
                    onFocus={clearErrorFocus}
                    onBlur={viewErrorOnBlure}
                    disabled={inputDisabled}
                  />
                  {inputOneType === 'password' && !!watchInputOne && (
                    <div className={style['view-password-wrapper']}>
                      {title === 'Восстановление пароля' && !errorsInputOne?.length && (
                        <span className={style['check-password']} data-test-id='checkmark' />
                      )}

                      <input
                        className={`${style['view-password']} ${isViewPasswordOne && style['view-active']}`}
                        type='button'
                        onClick={changeViewPasswordOne}
                        data-test-id={isViewPasswordOne ? 'eye-opened' : 'eye-closed'}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <InputMask
                  className={style['form-input']}
                  id={`${inputOneName}`}
                  type={`${inputOneType}`}
                  name={`${inputOneName}`}
                  placeholder=' '
                  {...register(`${inputOneName}`)}
                  onFocus={clearErrorFocus}
                  onBlur={viewErrorOnBlure}
                  mask='+375 (99) 999-99-99'
                  maskChar='x'
                  alwaysShowMask={viewMask}
                  disabled={inputDisabled}
                />
              )
            ) : (
              <input
                className={`${style['form__input-login']} ${style['form-input']}`}
                id={`${inputOneName}`}
                type={`${inputOneType}`}
                name={`${inputOneName}`}
                placeholder=' '
                {...register(`${inputOneName}`)}
                onFocus={clearErrorFocus}
                onBlur={viewErrorOnBlure}
                disabled={inputDisabled}
              />
            )}
            <label className={style['form-label']} htmlFor='input-login'>
              {inputOnePlaseholder}
            </label>
          </div>
          <div className={style['input-border']} />

          <div className={style['input-login-error']}>
            {errors?.[inputOneName] &&
              (errors?.[inputOneName]?.type === 'required' || errors?.[inputOneName]?.type === 'optionality') &&
              !watchInputOne && (
                <div className={style['error-input-empty']} data-test-id='hint'>
                  <div>Поле не может быть пустым</div>
                </div>
              )}

            {inputOneName === 'login' &&
              errors &&
              errors?.[inputOneName]?.type !== 'required' &&
              errors?.[inputOneName]?.type !== 'optionality' &&
              ((errors?.[inputTwoName]?.type !== 'required' && errors?.[inputTwoName]?.type !== 'optionality') ||
                !!watchInputOne) && (
                <span
                  className={classNames({
                    [style['error-input-empty']]: errors?.[inputOneName]?.type === 'matches',
                  })}
                  data-test-id='hint'
                >
                  Используйте для логина{' '}
                  <span
                    className={classNames({
                      [style['error-input']]: errorsInputOne?.includes('латинский алфавит'),
                    })}
                  >
                    латинский алфавит{' '}
                  </span>
                  и{' '}
                  <span
                    className={classNames({
                      [style['error-input']]: errorsInputOne?.includes('цифры'),
                    })}
                  >
                    цифры
                  </span>
                </span>
              )}
            {inputTwoName === 'passwordConfirmation' &&
              inputOneName === 'password' &&
              errors &&
              errors?.[inputOneName]?.type !== 'required' &&
              errors?.[inputOneName]?.type !== 'optionality' && (
                <ErrorHelperForInput
                  errors={errors}
                  inputName={inputOneName}
                  errorsInput={errorsInputOne}
                  watchInputTwo={watchInputTwo}
                  style={style}
                  errorValid={errorValid}
                />
              )}
            {inputOneName === 'phone' && errors && errors?.[inputOneName]?.type !== 'required' && (
              <span
                className={classNames({
                  [style['error-input-empty']]: errors?.[inputOneName]?.type === 'matches',
                })}
                data-test-id='hint'
              >
                <span>В формате +375 (xx) xxx-xx-xx</span>
              </span>
            )}
          </div>
        </div>
      )}
      {inputTwoType && (
        <div className={style['text-field']}>
          <div className={style['input-wrapper']}>
            {step !== '2' ? (
              <div className={style['password-wrapper']}>
                <input
                  className={style['form-input']}
                  id={`${inputTwoName}`}
                  type={`${!isViewPassword ? inputTwoType : 'text'}`}
                  name={`${inputTwoName}`}
                  placeholder=' '
                  {...register(`${inputTwoName}`)}
                  onFocus={clearErrorFocus}
                  onBlur={viewErrorOnBlure}
                  disabled={inputDisabled}
                />
                {(inputTwoType === 'password' || inputTwoType === 'passwordConfirmation') &&
                  !!watchInputTwo &&
                  !inputDisabled && (
                    <div className={style['view-password-wrapper']}>
                      {(title === 'Регистрация' || step === '1') && errorsInputTwo?.length <= 1 && (
                        <span className={style['check-password']} data-test-id='checkmark' />
                      )}

                      <input
                        className={`${style['view-password']} ${isViewPassword && style['view-active']}`}
                        type='button'
                        onClick={changeViewPassword}
                        data-test-id={isViewPassword ? 'eye-opened' : 'eye-closed'}
                      />
                    </div>
                  )}
              </div>
            ) : (
              <input
                className={style['form-input']}
                id={`${inputTwoName}`}
                type={`${inputTwoType}`}
                name={`${inputTwoName}`}
                placeholder=' '
                {...register(`${inputTwoName}`)}
                onFocus={clearErrorFocus}
                onBlur={viewErrorOnBlure}
                disabled={inputDisabled}
              />
            )}
            <label className={style['form-label']} htmlFor='input-password'>
              {inputTwoPlaseholder}
            </label>
          </div>
          <div className={style['input-border']} />

          <div className={style['input-login-error']}>
            {errors?.[inputTwoName] &&
              (errors?.[inputTwoName]?.type === 'required' || errors?.[inputTwoName]?.type === 'optionality') &&
              !watchInputTwo && (
                <div className={style['error-input-empty']} data-test-id='hint'>
                  <div>Поле не может быть пустым</div>
                </div>
              )}

            {error && (
              <p className={style['error-input-empty']} data-test-id='hint'>
                <span>error</span>
              </p>
            )}

            {errors?.[inputTwoName] && errors?.[inputTwoName]?.type === 'oneOf' && (
              <span className={style['error-input-empty']} data-test-id='hint'>
                {errors?.[inputTwoName]?.message}
              </span>
            )}

            {step &&
              inputTwoName === 'password' &&
              errors &&
              errors?.[inputTwoName]?.type !== 'required' &&
              errors?.[inputTwoName]?.type !== 'optionality' && (
                <ErrorHelperForInput
                  errors={errors}
                  inputName={inputTwoName}
                  errorsInput={errorsInputTwo}
                  inputDisabled={inputDisabled}
                  watchInputTwo={watchInputTwo}
                  style={style}
                  errorValid={errorValid}
                />
              )}
            {errors?.[inputTwoName] === 'email' &&
              (errors?.[inputTwoName]?.type === 'required' || errors?.[inputTwoName]?.type === 'optionality') && (
                <div className={style['error-input-empty']} data-test-id='hint'>
                  <div>Поле не может быть пустым</div>
                </div>
              )}
            {inputTwoName === 'email' && errors?.[inputTwoName]?.type === 'matches' && (
              <p className={style['error-input-empty']} data-test-id='hint'>
                {errors?.[inputTwoName]?.message}
              </p>
            )}
            {!inputOneType && <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>}
          </div>
        </div>
      )}
    </div>
  );
};

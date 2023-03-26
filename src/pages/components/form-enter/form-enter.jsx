import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { ButtonSubmit } from '../buttons/button-submit/button-submit';
import { ErrorHelperForInput } from '../../../helpers/error-helper-for-input';

import style from './form-enter.module.scss';

export const FormEnter = ({
  type,
  initialUserError400,
  register,
  errors,
  errorsInputOne,
  errorsInputTwo,
  clearErrors,
  error,
  watchInputOne,
  watchInputTwo,
  trigger,
  isValid,
}) => {
  const [isViewPassword, setViewPassword] = useState(false);
  const [isViewPasswordOne, setViewPasswordOne] = useState(false);
  const [isError400, setError400] = useState(false);
  const [errorValid, setErrorValid] = useState(false);

  const {
    step,
    title,
    inputOneName,
    inputOneType,
    inputOnePlaseholder,
    inputTwoName,
    inputTwoType,
    inputTwoPlaseholder,
    buttonText,
    linkHeader,
    linkTitle,
    linkPath,
  } = type;

  const changeViewPassword = () => {
    setViewPassword(!isViewPassword);
  };

  const changeViewPasswordOne = () => {
    setViewPasswordOne(!isViewPasswordOne);
  };

  useEffect(() => {
    if (initialUserError400 && (!errors[inputOneName] || !!errors[inputTwoName])) {
      setError400(true);
    }
  }, [initialUserError400, errors, inputOneName, inputTwoName]);

  // const clearErrorFocus = () => {
  //   if (clearErrors && inputOneName !== 'identifier') {
  //     clearErrors();
  //   }
  //   setError400(false);
  // };

  const clearErrorFocus = (event) => {
    setErrorValid(false);

    const trueWatchInputOne = !watchInputOne;
    const trueWatchInputTwo = !watchInputTwo;
    if (clearErrors && inputOneName !== 'identifier') {
      clearErrors();
    }
    // if (!trueWatchInputOne) {
    //   if (clearErrors && inputOneName !== 'identifier') {
    //     //     clearErrors();
    //     //   }
    //     clearErrors(inputOneName);
    //   }
    // }
    // if (!trueWatchInputTwo) {
    //   clearErrors(inputTwoName);
    // }

    setError400(false);
  };

  const viewErrorOnBlure = () => {
    if (!isValid) {
      setErrorValid(true);
    }
    if (trigger) {
      trigger();
    }
  };

  console.log('errors', errors);

  return (
    <>
      {!inputOneType && (
        <div className={style['return-auth-page']}>
          <NavLink to='/auth'>Вход в личный кабинет</NavLink>
        </div>
      )}

      <legend className={style.form__legend} id='form-legend'>
        <h2 className={`${style.form__title} ${style['title--xl']}`}>{title}</h2>
        {step && <div className={style.form__step}>шаг {step} из 3</div>}
      </legend>

      <fieldset className={`${style.form__fieldset} ${isError400 && style.error}`} aria-labelledby='form-legend'>
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
                    autoComplete='off'
                    type={`${inputOneType}`}
                    name={`${inputOneName}`}
                    placeholder=' '
                    {...register(`${inputOneName}`)}
                    onFocus={clearErrorFocus}
                    onBlur={viewErrorOnBlure}
                    mask='+375 (99) 999-99-99'
                    maskChar='x'
                    alwaysShowMask={!errors?.message && inputOneName !== 'phone'}
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
                (inputOneName !== 'username' || errorValid) &&
                (inputOneName !== 'password' || errorValid) &&
                !watchInputOne && (
                  <div className={style['error-input-empty']} data-test-id='hint'>
                    <div>Поле не может быть пустым</div>
                  </div>
                )}

              {inputOneName === 'username' &&
                errors &&
                ((errors?.[inputOneName]?.type !== 'required' && errors?.[inputOneName]?.type !== 'optionality') ||
                  (errors?.[inputOneName]?.type === 'required' && !errorValid)) && (
                  // ((errors?.[inputTwoName]?.type !== 'required' && errors?.[inputTwoName]?.type !== 'optionality') ||
                  //   !!watchInputOne)
                  //   &&
                  <span
                    className={classNames({
                      [style['error-input-empty']]: errors?.[inputOneName]?.type === 'matches' && errorValid,
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
                ((errors &&
                  errors?.[inputOneName]?.type !== 'required' &&
                  errors?.[inputOneName]?.type !== 'optionality') ||
                  (errors?.[inputOneName]?.type === 'required' && !errorValid)) && (
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
                  />
                  {(inputTwoType === 'password' || inputTwoType === 'passwordConfirmation') && !!watchInputTwo && (
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
                />
              )}
              <label className={style['form-label']} htmlFor='input-password'>
                {inputTwoPlaseholder}
              </label>
            </div>
            <div className={style['input-border']} />

            <div className={style['input-login-error']}>
              {
                // (errors?.[inputOneName] &&
                // (errors?.[inputOneName]?.type === 'required' || errors?.[inputOneName]?.type === 'optionality')) ||

                errors?.[inputTwoName] &&
                  (errors?.[inputTwoName]?.type === 'required' || errors?.[inputTwoName]?.type === 'optionality') &&
                  !watchInputTwo && (
                    <div className={style['error-input-empty']} data-test-id='hint'>
                      <div>Поле не может быть пустым</div>
                    </div>
                  )
              }

              {error && (
                <p className={style['error-input-empty']} data-test-id='hint'>
                  <span>error</span>
                </p>
              )}

              {errors?.[inputTwoName] && errors?.[inputTwoName]?.type === 'oneOf' && errorValid && (
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
              {!inputOneType && (
                <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
              )}
            </div>
          </div>
        )}
        {/* {inputOneType && (
          <div className={style['text-field']}>
            <div className={style['input-wrapper']}>
              {step !== '2' ? (
                step !== '3' ? (
                  <div className={style['password-wrapper']}>
                    <input
                      className={style['form-input']}
                      autoComplete='off'
                      type={`${!isViewPasswordOne ? inputOneType : 'text'}`}
                      name={`${inputOneName}`}
                      placeholder=' '
                      {...register(`${inputOneName}`)}
                      onFocus={clearErrorFocus}
                      onBlur={viewErrorOnBlure}
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
                    autoComplete='off'
                    type={`${inputOneType}`}
                    name={`${inputOneName}`}
                    placeholder=' '
                    {...register(`${inputOneName}`)}
                    onFocus={clearErrorFocus}
                    onBlur={viewErrorOnBlure}
                    mask='+375 (99) 999-99-99'
                    maskChar='x'
                    alwaysShowMask={!errors?.message && inputOneName !== 'phone'}
                  />
                )
              ) : (
                <input
                  className={`${style['form__input-login']} ${style['form-input']}`}
                  autoComplete='off'
                  type={`${inputOneType}`}
                  name={`${inputOneName}`}
                  placeholder=' '
                  {...register(`${inputOneName}`)}
                  onFocus={clearErrorFocus}
                  onBlur={viewErrorOnBlure}
                />
              )}
              <label className={style['form-label']} htmlFor='input-login'>
                {inputOnePlaseholder}
              </label>
            </div>
            <div className={style['input-border']} />

            <div className={style['input-login-error']}>
              {((errors?.[inputOneName] && errors[inputOneName]?.type === 'required') ||
                (errors?.[inputTwoName] && errors[inputTwoName]?.type === 'required')) &&
                !watchInputOne && (
                  <p className={style['error-input-empty']} data-test-id='hint'>
                    <span>Поле не может быть пустым</span>
                  </p>
                )}

              {inputOneName === 'username' && errors && errors[inputOneName]?.type !== 'required' && (
                <span
                  className={classNames({
                    [style['error-input-empty']]: errors[inputOneName]?.type === 'matches',
                  })}
                  data-test-id='hint'
                >
                  Используйте для логина{' '}
                  <span
                    className={classNames({
                      [style['error-input']]: errorsInputOne.includes('латинский алфавит'),
                    })}
                  >
                    латинский алфавит{' '}
                  </span>
                  и{' '}
                  <span
                    className={classNames({
                      [style['error-input']]: errorsInputOne.includes('цифры'),
                    })}
                  >
                    цифры
                  </span>
                </span>
              )}
              {inputTwoName === 'passwordConfirmation' &&
                inputOneName === 'password' &&
                errors &&
                errors[inputOneName]?.type !== 'required' && (
                  <ErrorHelperForInput
                    errors={errors}
                    inputName={inputOneName}
                    errorsInput={errorsInputOne}
                    watchInputTwo={watchInputTwo}
                    style={style}
                    errorValid={errorValid}
                  />
                )}
              {inputOneName === 'phone' && errors && errors[inputOneName]?.type !== 'required' && (
                <span
                  className={classNames({
                    [style['error-input-empty']]: errors[inputOneName]?.type === 'matches',
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
                    autoComplete='off'
                    type={`${!isViewPassword ? inputTwoType : 'text'}`}
                    name={`${inputTwoName}`}
                    placeholder=' '
                    {...register(`${inputTwoName}`)}
                    onFocus={clearErrorFocus}
                    onBlur={viewErrorOnBlure}
                  />
                  {(inputTwoType === 'password' || inputTwoType === 'passwordConfirmation') && !!watchInputTwo && (
                    <div className={style['view-password-wrapper']}>
                      {title === 'Регистрация' && errorsInputTwo?.length <= 1 && (
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
                  autoComplete='off'
                  type={`${inputTwoType}`}
                  name={`${inputTwoName}`}
                  placeholder=' '
                  {...register(`${inputTwoName}`)}
                  onFocus={clearErrorFocus}
                  onBlur={viewErrorOnBlure}
                />
              )}
              <label className={style['form-label']} htmlFor='input-password'>
                {inputTwoPlaseholder}
              </label>
            </div>
            <div className={style['input-border']} />

            <div className={style['input-login-error']}>
              {((errors?.[inputOneName] && errors[inputOneName]?.type === 'required') ||
                (errors?.[inputTwoName] && errors[inputTwoName]?.type === 'required')) &&
                !watchInputTwo && (
                  <p className={style['error-input-empty']} data-test-id='hint'>
                    <span>Поле не может быть пустым</span>
                  </p>
                )}

              {error && (
                <p className={style['error-input-empty']} data-test-id='hint'>
                  <span>error</span>
                </p>
              )}

              {errors?.[inputTwoName] && errors[inputTwoName]?.type === 'oneOf' && (
                <span className={style['error-input-empty']} data-test-id='hint'>
                  {errors?.[inputTwoName]?.message}
                </span>
              )}

              {step && inputTwoName === 'password' && errors && errors.password?.type !== 'required' && (
                <ErrorHelperForInput
                  errors={errors}
                  inputName={inputTwoName}
                  errorsInput={errorsInputTwo}
                  watchInputTwo={watchInputTwo}
                  style={style}
                  errorValid={errorValid}
                />
              )}
              {errors?.[inputTwoName] === 'email' && errors[inputTwoName]?.type === 'required' && (
                <p className={style['error-input-empty']} data-test-id='hint'>
                  <span>Поле не может быть пустым</span>
                </p>
              )}
              {inputTwoName === 'email' && errors[inputTwoName]?.type === 'matches' && (
                <p className={style['error-input-empty']} data-test-id='hint'>
                  {errors?.[inputTwoName]?.message}
                </p>
              )}
              {!inputOneType && (
                <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
              )}
            </div>
          </div>
        )} */}

        {inputOneType && inputOneType !== 'password' && (
          <>
            {isError400 && (
              <span className={style['error-authentication']} data-test-id='hint'>
                <span>Неверный логин или пароль!</span>
              </span>
            )}
            <NavLink className={style['forget-password']} to='/forgot-pass'>
              {isError400 ? (
                <span className={style['forget-password__error']}>Востановить?</span>
              ) : (
                <span>Забыли логин или пароль?</span>
              )}
            </NavLink>
          </>
        )}
      </fieldset>
      <div className={style.form__button}>
        <ButtonSubmit
          className={`${style['button-form']} ${style.button}`}
          title={buttonText}
          isDisabled={
            inputTwoName === 'passwordConfirmation' ? errorValid : !!errors[inputOneName] || !!errors[inputTwoName]
          }
        />
      </div>
      <div className={style['link-wrapper']}>
        <span className={style['form__title-registration']}>{linkHeader}</span>
        {linkPath && (
          <NavLink className={style['registration-link']} to={`${linkPath}`}>
            {linkTitle}
          </NavLink>
        )}
      </div>
    </>
  );
};

import classNames from 'classnames';

import style from '../pages/components/form-enter/form-enter.module.scss';

export const ErrorHelperForInput = ({ errors, inputName, errorsInput }) => (
  <span
    className={classNames({
      [style['error-input-empty']]: errors[inputName]?.type === 'matches',
    })}
    data-test-id='hint'
  >
    Пароль{' '}
    <span
      className={classNames({
        [style['error-input']]: errorsInput.includes('не менее 8 символов'),
      })}
    >
      не менее 8 символов
    </span>
    , с{' '}
    <span
      className={classNames({
        [style['error-input']]: errorsInput.includes('с заглавной буквой'),
      })}
    >
      заглавной буквой
    </span>{' '}
    и{' '}
    <span
      className={classNames({
        [style['error-input']]: errorsInput.includes('цифрой'),
      })}
    >
      цифрой
    </span>
  </span>
);

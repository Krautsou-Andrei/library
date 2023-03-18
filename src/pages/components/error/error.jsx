import classNames from 'classnames';
import style from './error.module.scss';

export const Error = ({ closeMessage, message, isSuccess }) => (
  <div className={classNames(style.error, { [style.success]: isSuccess })} data-test-id='error'>
    <div className={classNames(style['error-icon'], { [style['success-icon']]: isSuccess })} />
    {/* <div className={`${isSuccess ? style['success-icon'] : style['error-icon']}`} /> */}
    <span className={style['error-message']}>{message}</span>
    <button className={style['button-error']} type='button' onClick={closeMessage} data-test-id='alert-close'>
      <span className={style['button-error__icon']} />
    </button>
  </div>
);

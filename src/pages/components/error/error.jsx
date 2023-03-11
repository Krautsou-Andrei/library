import style from './error.module.scss';

export const Error = ({ closeMessage }) => (
  <div className={style.error} data-test-id='error'>
    <div className={style['error-icon']} />
    <span className={style['error-message']}>Что-то пошло не так. Обновите страницу через некоторое время.</span>
    <button className={style['button-error']} type='button' onClick={closeMessage}>
      <span className={style['button-error__icon']} />
    </button>
  </div>
);

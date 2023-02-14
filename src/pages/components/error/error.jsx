export const Error = ({ closeMessage }) => (
  <div className='error' data-test-id='error'>
    <div className='error-icon' />
    <span className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</span>
    <button className='button-error' type='button' onClick={closeMessage}>
      <span className='button-error__icon' />
    </button>
  </div>
);

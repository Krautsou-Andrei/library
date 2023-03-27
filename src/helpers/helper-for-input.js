export const textUsername = ({ errors, inputOneName, errorsInputOne }) => (
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
);

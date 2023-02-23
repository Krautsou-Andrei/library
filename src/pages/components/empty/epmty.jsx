import style from './empty.module.scss';

export const Empty = ({ title, dataTestId }) => (
  <div className={style['empty-category']} data-test-id={dataTestId}>
    {title}
  </div>
);

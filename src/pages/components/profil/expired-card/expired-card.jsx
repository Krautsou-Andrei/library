export const ExpiredCard = ({ title, subTitle, style }) => (
  <div className={style['info-booking__description-error']} data-test-id='expired'>
    <span className={style['description-label']}>
      {title}
      <span className={style['description-label__subtitle']}>{subTitle}</span>
    </span>
  </div>
);

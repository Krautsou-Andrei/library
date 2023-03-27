export const ExpiredCard = ({ stringOne, stringTwo, subTitle, style }) => (
  <div className={style['info-booking__description-error']} data-test-id='expired'>
    <span className={style['description-label']}>
      {stringOne}
      <br />
      {stringTwo}
      <br />
      <span className={style['description-label__subtitle']}>{subTitle}</span>
    </span>
  </div>
);

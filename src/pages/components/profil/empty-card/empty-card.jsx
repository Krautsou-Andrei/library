export const EmptyCard = ({ stringOne, stringTwo, style }) => (
  <div className={style['info-booking__description']} data-test-id='empty-blue-card'>
    <span className={style['description-label']}>
      {stringOne}
      <br />
      {stringTwo}
    </span>
  </div>
);

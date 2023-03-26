export const EmptyCard = ({ title, style }) => (
  <div className={style['info-booking__description']} data-test-id='empty-blue-card'>
    <span className={style['description-label']}>
      {title}
      {/* Забронируйте книгу <br />и она отобразится */}
    </span>
  </div>
);

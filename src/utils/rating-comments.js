import { IconStar } from '../pages/components/image/icon/icon-star';

export const RatingComments = ({ style, onClickRating, dataRating, dataTestStar, dataTestStarActive }) => {
  const arrayStars = [];

  for (let index = 0; index < 5; index++) {
    if (index + 1 <= dataRating) {
      arrayStars.push(
        <div className={style['input-wrapper']} key={`${index + 1}`}>
          <input
            className={style['rating__star-input']}
            id={`satar-${index + 1}`}
            type='radio'
            name='stars'
            value={`${index + 1}`}
            onClick={onClickRating}
          />

          <label className={style['rating__star-label']} htmlFor={`satar-${index + 1}`}>
            <IconStar
              className={style['ico-star']}
              classActive={style.active}
              dataTestStar={dataTestStar}
              dataTestStarActive={dataTestStarActive}
            />
          </label>
        </div>
      );
    } else {
      arrayStars.push(
        <div className={style['input-wrapper']} key={`${index + 1}`}>
          <input
            className={style['rating__star-input']}
            id={`satar-${index + 1}`}
            type='radio'
            name='stars'
            value={`${index + 1}`}
            onClick={onClickRating}
          />

          <label className={style['rating__star-label']} htmlFor={`satar-${index + 1}`}>
            <IconStar className={style['ico-star']} dataTestStar={dataTestStar} />
          </label>
        </div>
      );
    }
  }

  return arrayStars.map((star) => star);
};

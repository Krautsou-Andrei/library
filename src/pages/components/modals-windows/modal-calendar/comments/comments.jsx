import { RatingComments } from '../../../../../utils/rating-comments';

import style from './comments.module.scss';

export const Comments = ({ titleRating, onClickRating, dataRating }) => (
  <div className={style.comments}>
    <div className={style['title-rating']}>{titleRating}</div>
    <div className={style.rating} data-test-id='rating'>
      <RatingComments
        style={style}
        onClickRating={onClickRating}
        dataRating={dataRating}
        dataTestStar='star'
        dataTestStarActive='star-active'
      />
    </div>
  </div>
);

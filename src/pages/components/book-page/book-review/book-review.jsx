import { Rating } from '../../rating';
import { ReviewUser } from './review-user';
import { dateTranslator } from '../../../../utils/date-translator';

export const BookReview = ({ props }) => {
  const { id, rating, text, createdAt, user } = props;

  return (
    <div className='review__content'>
      <ReviewUser user={user} createdAt={dateTranslator(createdAt)} />
      <div className='review__stars'>
        <div className='book__star'>
          <Rating rating={rating} />
        </div>
      </div>
      <div className='review__description'>
        <p>{text}</p>
      </div>
    </div>
  );
};

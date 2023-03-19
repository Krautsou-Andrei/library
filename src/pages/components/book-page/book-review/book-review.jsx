import { Rating } from '../../rating';
import { ReviewUser } from './review-user';
import { dateTranslator } from '../../../../utils/date-translator';

export const BookReview = ({ comment }) => {
  const { id, rating, text, createdAt, user } = comment;

  return (
    <div className='review__content' data-test-id='comment-wrapper'>
      <ReviewUser user={user} createdAt={dateTranslator(createdAt)} />
      <div className='review__stars'>
        <div className='book__star' data-test-id='rating'>
          <Rating rating={rating} />
        </div>
      </div>
      <div className='review__description'>
        <span data-test-id='comment-text'>{text}</span>
      </div>
    </div>
  );
};

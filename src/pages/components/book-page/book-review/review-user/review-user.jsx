import { BASE_URL } from '../../../../../redux';
import { ImageUser } from './image-user';

export const ReviewUser = ({ user, createdAt }) => {
  const { firstName, lastName, avatarUrl } = user;
  return (
    <div className='review__account'>
      <div className='review__image'>
        <ImageUser src={avatarUrl ? `${BASE_URL}${avatarUrl}` : ''} width='32' height='32' alt='' />
      </div>
      <div className='wrap__user'>
        <span className='review__name'>
          {firstName} {lastName}
        </span>
        <span className='review__date'>{createdAt}</span>
      </div>
    </div>
  );
};

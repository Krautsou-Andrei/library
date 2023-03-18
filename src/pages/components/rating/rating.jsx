import { IconStar } from '../image/icon/icon-star';

export const Rating = ({ rating }) => {
  const arrayStars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      arrayStars.push(<IconStar key={i + 1} className='ico-star' classActive='active' />);
    } else {
      arrayStars.push(<IconStar key={i + 1} className='ico-star' />);
    }
  }

  return arrayStars.map((star) => star);
};

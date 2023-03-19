import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import {
  BASE_URL,
  setBooking,
  setBookingCurrentUser,
  setBookingDate,
  setButtonBook,
  setSelectBookid,
} from '../../../redux';
import { setSearchQuery } from '../../../redux/slice/search-slice';

import { Heighlight } from '../../../helpers/heigh-light';

import { ImageBook } from '../image/image-book';
import { Rating } from '../rating';
import { Button } from '../buttons/button';
import { useBookingBook } from '../../../utils/booking-book';
import { dateTranslatorShort } from '../../../utils/date-translator';

export const Book = ({ product }) => {
  const { id, image, title, rating, authors, issueYear, booking, delivery } = product;

  const dispatch = useDispatch();
  const searchParams = useSelector((state) => state.search.searchQuery);
  const currentBookingBook = useBookingBook(booking);

  const [currentTitle, setCurrentTittle] = useState();
  useEffect(() => {
    setCurrentTittle(Heighlight(searchParams, title));
  }, [title, searchParams]);

  const handlerClick = () => {
    dispatch(setSearchQuery({ searchQuery: '' }));
  };

  const buttonHundler = (event) => {
    event.preventDefault();

    dispatch(setBookingCurrentUser(!!currentBookingBook));
    dispatch(setBookingDate(booking?.dateOrder));
    dispatch(setSelectBookid(event.target.name));
    dispatch(setBooking(true));
  };

  return (
    <Link id={`${id}`} to={`${id}`} className='book' onClick={handlerClick} data-test-id='card'>
      <div className='book__container'>
        <div className='book__image'>
          <ImageBook
            src={image ? `${BASE_URL}${image.url}` : ''}
            alt={title}
            width='174'
            height='242'
            className='image image-book'
          />
        </div>
        <div className='book__star rating'>
          {rating > 1 ? <Rating rating={rating} /> : <span className='rating__no'>Ещё нет оценок</span>}
        </div>
        <div className='book__title'>
          <h2 className='title-book title--lg'>{currentTitle}</h2>
        </div>
        <div className='book__autor'>
          <div className='book-autor-text'>
            <span>{`${authors} `}</span>, <span>{issueYear}</span>
          </div>
        </div>
        <div className='book__button'>
          <Button
            className={classNames('button', 'button--book', {
              'button-booking-current-user': currentBookingBook === 'current',
            })}
            onClick={buttonHundler}
            name={id}
            title={`${
              currentBookingBook
                ? 'забронирована'
                : delivery
                ? `занята до ${dateTranslatorShort(delivery.dateHandedTo)}`
                : 'забронировать'
            }`}
            disabled={(!!currentBookingBook && currentBookingBook !== 'current') || delivery}
            data-test-id='booking-button'
          />
        </div>
      </div>
    </Link>
  );
};

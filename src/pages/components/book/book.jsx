import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Heighlight } from '../../../helpers/heigh-light';
import { useUserComments } from '../../../hooks/use-user-comments';
import {
  setBooking,
  setBookingCurrentUser,
  setBookingDate,
  setComments,
  setErrorDeleteBooking,
  setSelectBookid,
  setSuccessDeleteBooking,
  useDeleteBookingMutation,
  useLazyGetBookIdQuery,
} from '../../../redux';
import { setSearchQuery } from '../../../redux/slice/search-slice';
import { useBookingBook } from '../../../utils/booking-book';
import { dateTranslatorShort } from '../../../utils/date-translator';
import { profileLocation } from '../../../utils/profile-location';
import { Button } from '../buttons/button';
import { ImageBook } from '../image/image-book';
import { Rating } from '../rating';

export const Book = ({ product, type, profilDelivery, buttonCancelBooking, bookingDelivety }) => {
  const { id, image, title, rating, authors, issueYear, booking, delivery } = product;

  const dispatch = useDispatch();
  const searchParams = useSelector((state) => state.search.searchQuery);
  const profilBooking = useSelector((state) => state.authenticationUser.user.booking);
  const currentBookingBook = useBookingBook(type ? profilBooking : booking);
  const [triggetBookId] = useLazyGetBookIdQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  let userAuth = useSelector((state) => state.authenticationUser.user);

  if (!Object.keys(userAuth).length || userAuth === null) {
    userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  const location = useLocation();

  const prefixLink = profileLocation(location);

  const comment = useUserComments(id);
  const isCurrentBookComment = !!comment;

  const [currentTitle, setCurrentTittle] = useState();

  useEffect(() => {
    setCurrentTittle(Heighlight(searchParams, title));
  }, [title, searchParams]);

  const handlerClick = () => {
    dispatch(setSearchQuery({ searchQuery: '' }));
  };

  const hundlerDeleteBooking = (result) => {
    if (result?.error?.status) {
      dispatch(setErrorDeleteBooking(true));
    } else {
      dispatch(setSuccessDeleteBooking(true));
    }
  };

  const buttonHundler = (event) => {
    event.preventDefault();
    if (buttonCancelBooking) {
      const dataId = userAuth.booking.id;

      deleteBooking({ dataId }).then((result) => hundlerDeleteBooking(result));
    } else {
      dispatch(setBookingCurrentUser(!!currentBookingBook));
      dispatch(setBookingDate(booking?.dateOrder));
      dispatch(setSelectBookid(event.target.name));
      dispatch(setBooking(true));
    }
  };

  const getTitleButton = () => {
    if (type === 'profil' && !buttonCancelBooking) {
      return currentBookingBook && profilDelivery
        ? `возврат ${dateTranslatorShort(profilDelivery.dateHandedTo)}`
        : 'отменить бронь';
    }

    if (type === 'profil' && buttonCancelBooking) {
      return profilDelivery ? `возврат ${dateTranslatorShort(profilDelivery.dateHandedTo)}` : 'отменить бронь';
    }

    return currentBookingBook
      ? 'забронирована'
      : delivery
      ? `занята до ${dateTranslatorShort(delivery.dateHandedTo)}`
      : 'забронировать';
  };

  const disabledButtonBooking = () => {
    if (type) {
      if (profilDelivery?.handed) {
        return true;
      }

      return false;
    }

    return (!!currentBookingBook && currentBookingBook !== 'current') || delivery;
  };

  const isCom = useSelector((state) => state.booking.isComments);

  const onClickComments = (event) => {
    event.preventDefault();
    dispatch(setComments(!isCom));
    triggetBookId(id);
    dispatch(setSelectBookid(event.target.name));
  };

  return (
    <Link
      id={`${id}`}
      to={`${prefixLink ? `/books/all/${id}` : id}`}
      className='book'
      onClick={handlerClick}
      data-test-id='card'
    >
      <div className='book__container'>
        <div className={classNames('book__image', { 'image-history': type === 'history' })}>
          <ImageBook
            src={image ? `${image.url ? image.url : image}` : ''}
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
        <div className={classNames('book__button', { 'button-history': type === 'history' })}>
          {type === 'history' ? (
            <Button
              className={classNames(
                'button',
                'button--book',
                {
                  'button-booking-current-user': isCurrentBookComment,
                },
                { 'button-delivery': profilDelivery && type === 'profil' }
              )}
              onClick={onClickComments}
              name={id}
              title={`${isCurrentBookComment ? 'Изменить оценку' : 'Оставить отзыв'}`}
              data-test-id='history-review-button'
            />
          ) : bookingDelivety ? (
            <div
              className={classNames(
                'button',
                'button--book',
                {
                  'button-booking-current-user': currentBookingBook === 'current',
                },
                { 'button-delivery': profilDelivery && type === 'profil' }
              )}
            >
              {getTitleButton()}
            </div>
          ) : (
            <Button
              className={classNames(
                'button',
                'button--book',
                {
                  'button-booking-current-user': currentBookingBook === 'current',
                },
                { 'button-delivery': profilDelivery && type === 'profil' }
              )}
              onClick={buttonHundler}
              name={id}
              title={getTitleButton()}
              disabled={disabledButtonBooking()}
              data-test-id={`${buttonCancelBooking ? 'cancel-booking-button' : 'booking-button'}`}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

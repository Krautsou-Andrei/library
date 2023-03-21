import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooking, useLazyGetUserQuery } from '../../../../redux';
import { ButtonSubmit } from '../../buttons/button-submit';
import { Calendar } from './calendar';
import { Comments } from './comments/comments';
import { IconButtonClose } from '../../image/icon/icon-button-close';
import { useGetBook } from '../../../../hooks/use-get-book';

import style from './modal-booking.module.scss';

export const ModalBooking = ({
  typeModal,
  onClickCommentsClose,
  booking,
  updateBooking,
  deleteBooking,
  sendComments,
  clickButtonComments,
}) => {
  const dispatch = useDispatch();
  const currentDateBooking = useSelector((state) => state.bookingCurrentUser.bookingDate);
  const isBooking = useSelector((state) => state.booking.isBooking);

  const [dateBooking, setDateBooking] = useState();
  const [dataTextarea, setDataTextarea] = useState();
  const [clickButtonDelete, setClickButtonDelete] = useState(false);
  const [isCurrentDateBooking, setIsCurrentDateBooking] = useState(false);
  const [dataRating, setDataRating] = useState(0);
  const [isBookingDisabled, setBookingDisabled] = useState(true);
  const [date, setSelectedDay] = useState(currentDateBooking ? new Date(currentDateBooking) : new Date());

  const currentBook = useSelector((state) => state.book.bookId);
  const bookId = useSelector((state) => state.selectBook.selectBookid);

  const bookingCurrentUser = useSelector((state) => state.bookingCurrentUser.bookingCurrentUser);

  const book = useGetBook(bookId);

  const [triggerUser] = useLazyGetUserQuery();

  useEffect(() => {
    setIsCurrentDateBooking(bookingCurrentUser);
  }, [setIsCurrentDateBooking, bookingCurrentUser]);
  let { user } = useSelector((state) => state.user.user);

  if (user === undefined) {
    user = JSON.parse(localStorage.getItem('user'));
  }

  const {
    isCalendar,
    isComments,
    titleRating,
    modalButtonCommentsText,
    titleTextArea,
    modalTitle,
    modalTitleChangeBooking,
    modalButtonBookingText,
    modalButtonDeleteBookingText,
  } = typeModal;

  const onClick = () => {
    if (isCalendar) {
      dispatch(setBooking(false));
    }
    if (isComments) {
      onClickCommentsClose();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const dateFormat = new Date(!!dateBooking && dateBooking);
    dateFormat?.setHours(dateFormat.getHours() + 3);
    const isoDate = dateFormat?.toISOString();

    const data = {
      order: true,
      dateOrder: isoDate,
      book: bookId,
      customer: user.id.toString(),
    };

    if (isCalendar && isCurrentDateBooking && !clickButtonDelete) {
      const dataId = book.booking.id;
      updateBooking({ dataId, data });
    }

    if (isCalendar && !isCurrentDateBooking && !clickButtonDelete) {
      booking({ data });
    }

    if (isCalendar && clickButtonDelete) {
      const dataId = book.booking.id;

      deleteBooking({ dataId });
      setClickButtonDelete(false);
    }

    if (isComments) {
      const dataComments = {
        rating: +dataRating,
        text: dataTextarea,
        book: currentBook.id,
        user: user.id.toString(),
      };

      sendComments({ data: dataComments });
    }

    triggerUser();
  };

  const onClickButtonDelete = () => {
    setClickButtonDelete(true);
  };

  const onChange = (event) => {
    setDataTextarea(event.target.value);
  };

  const onClickRating = (event) => {
    setDataRating(event.target.value);
  };

  const modalBooking = useRef(null);

  const outClick = onClick;

  useEffect(() => {
    const handleClick = (event) => {
      if (!modalBooking.current.contains(event.target) && event.target.tagName !== 'BUTTON') {
        outClick();
      }
    };

    if (isBooking || clickButtonComments) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [modalBooking, isBooking, clickButtonComments, outClick]);

  return (
    <div className={style['modal-calendar__wrapper']} data-test-id='modal-outer'>
      <div data-test-id={`${isCalendar ? 'booking-modal' : 'modal-rate-book'}`}>
        <form className={style['modal-calendar']} action='' onSubmit={onSubmit} ref={modalBooking}>
          <div className={style['modal-calendar__title']}>
            <span className={style.title} data-test-id='modal-title'>
              {isCalendar && (bookingCurrentUser ? modalTitleChangeBooking : modalTitle)}
              {isComments && modalTitle}
            </span>
            <button
              className={`${style.button} ${style['button-close']}`}
              type='button'
              onClick={onClick}
              data-test-id='modal-close-button'
            >
              <IconButtonClose fill='currentColor' />
            </button>
          </div>
          <div className={style['modal-calendar__calendar']}>
            {isCalendar && (
              <Calendar
                date={date}
                selectDate={(date) => setSelectedDay(date)}
                setDateBooking={setDateBooking}
                setBookingDisabled={setBookingDisabled}
                isBookingDisabled={isBookingDisabled}
                currentDateBooking={currentDateBooking}
              />
            )}
            {isComments && (
              <Comments
                titleRating={titleRating}
                titleTextArea={titleTextArea}
                onClickRating={onClickRating}
                dataRating={dataRating}
              />
            )}
          </div>
          {isComments && (
            <textarea
              className={style['comments-textarea']}
              placeholder='Комментарий'
              onChange={onChange}
              data-test-id='comment'
            />
          )}
          <div className={style['modal-calendar__button']}>
            {isComments && (
              <ButtonSubmit
                className={`${style.button} ${style['button-booking']}`}
                title={modalButtonCommentsText}
                data-test-id='button-comment'
              />
            )}
            {isCalendar && (
              <ButtonSubmit
                className={`${style.button} ${style['button-booking']}`}
                title={modalButtonBookingText}
                isDisabled={isBookingDisabled}
                data-test-id='booking-button'
              />
            )}
          </div>
          {isCurrentDateBooking && (
            <div className={style['modal-calendar__button']}>
              <ButtonSubmit
                className={`${style.button} ${style['button-delete-booking']}`}
                title={modalButtonDeleteBookingText}
                name='delete'
                onClick={onClickButtonDelete}
                data-test-id='booking-cancel-button'
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

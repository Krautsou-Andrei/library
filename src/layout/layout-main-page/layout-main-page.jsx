import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Error } from '../../pages/components/error';
import { typeMessage } from '../../pages/components/error/type-message';
import { Loading } from '../../pages/components/loading';

import { ModalBooking } from '../../pages/components/modals-windows/modal-calendar';
import { modalBooking } from '../../pages/components/modals-windows/type-modal';
import {
  booksApi,
  setBooking,
  useBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from '../../redux';
import { bookingIsPage } from '../../utils/booking-book';

export const LayoutMainPage = () => {
  const [isOpenError, setOpenError] = useState(false);
  const [isOpenSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const bookId = useSelector((state) => state.selectBook.selectBookid);
  const isBooking = useSelector((state) => state.booking.isBooking);
  const [booking, { isLoading: isLoadingBooking, isSuccess: isSuccessBooking, isError: isErrorBooking }] =
    useBookingMutation();
  const [
    updateBooking,
    { isLoading: isLoadingUpdateBooking, isSuccess: isSuccessUpdateBooking, isError: isErrorUpdateBooking },
  ] = useUpdateBookingMutation();
  const [
    deleteBooking,
    { isLoading: isLoadingDeleteBooking, isSuccess: isSuccessDeleteBooking, isError: isErrorDeleteBooking },
  ] = useDeleteBookingMutation();
  const [triggerBooks, { isLoading: isLoadingUpdateBooks }] = booksApi.useLazyGetBooksQuery();
  const [triggerBookId, { isLoading: isLoadingUpdateBookId }] = booksApi.useLazyGetBookIdQuery();

  const token = localStorage.getItem('token');
  const location = useLocation();

  const isUpadateBookPage = bookingIsPage(location);

  // console.log('bookId', bookId);

  useEffect(() => {
    if (!token) {
      navigation('/auth');
    }
  }, [navigation, token]);

  useEffect(() => {
    if (isErrorBooking || isErrorUpdateBooking || isErrorDeleteBooking) {
      setOpenError(true);
      setTimeout(() => setOpenError(false), 4000);
      dispatch(setBooking(false));
    }

    if (isUpadateBookPage) {
      triggerBookId(bookId);
      triggerBooks();
    } else {
      setOpenError(false);
    }

    if (isSuccessBooking || isSuccessUpdateBooking || isSuccessDeleteBooking) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 4000);
      dispatch(setBooking(false));

      triggerBookId(bookId);
      triggerBooks();
    }
  }, [
    isErrorBooking,
    isSuccessBooking,
    triggerBooks,
    triggerBookId,
    dispatch,
    isUpadateBookPage,
    bookId,
    isErrorUpdateBooking,
    isSuccessUpdateBooking,
    isSuccessDeleteBooking,
    isErrorDeleteBooking,
  ]);

  const closeErrorMessage = () => {
    setOpenError(false);
  };

  const closeSuccessMessage = () => {
    setOpenSuccess(false);
  };

  return (
    <>
      {(isLoadingBooking ||
        isLoadingUpdateBooks ||
        isLoadingUpdateBookId ||
        isLoadingUpdateBooking ||
        isLoadingDeleteBooking) && <Loading />}
      {isOpenError && !isLoadingBooking && (
        <Error
          closeMessage={closeErrorMessage}
          message={
            isErrorBooking
              ? typeMessage.errorLoadingBooking
              : isErrorUpdateBooking
              ? typeMessage.errorLoadingUpdateBooking
              : isErrorDeleteBooking && typeMessage.errorLoadingDeleteBooking
          }
        />
      )}
      {isOpenSuccess && !isOpenError && !isLoadingBooking && (
        <Error
          closeMessage={closeSuccessMessage}
          message={
            isSuccessBooking
              ? typeMessage.successLoadingBooking
              : isSuccessUpdateBooking
              ? typeMessage.successLoadingUpdateBooking
              : isSuccessDeleteBooking && typeMessage.successLoadingDeleteBooking
          }
          isSuccess={true}
        />
      )}
      <main className='main'>
        <Outlet />
      </main>
      {isBooking ? (
        <ModalBooking
          typeModal={modalBooking}
          booking={booking}
          updateBooking={updateBooking}
          deleteBooking={deleteBooking}
          triggerBooks={triggerBooks}
          triggerBookId={triggerBookId}
          // isLoading={isLoadingBooking}
          // isSuccess={isSuccessBooking}
          // isError={isErrorBooking}
        />
      ) : null}
    </>
  );
};

import { useEffect, useMemo, useState } from 'react';
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
  useLazyGetUserQuery,
  useUpdateBookingMutation,
} from '../../redux';
import { bookingIsPage } from '../../utils/booking-book';

export const LayoutMainPage = () => {
  const [successBooking, setSuccessBooking] = useState(false);
  const [successUpdateBooking, setSuccessUpdateBooking] = useState(false);
  const [successDeleteBooking, setSuccessDeleteBooking] = useState(false);
  const [errorBooking, setErrorBooking] = useState(false);
  const [errorUpdateBooking, setErrorUpdateBooking] = useState(false);
  const [errorDeleteBooking, setErrorDeleteBooking] = useState(false);
  const [isOpenError, setOpenError] = useState(false);
  const [isOpenSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const bookId = useSelector((state) => state.selectBook.selectBookid);
  const isBooking = useSelector((state) => state.booking.isBooking);
  const [booking, { isLoading: isLoadingBooking, isSuccess: isSuccessBooking, isError: isErrorBooking, success }] =
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
 

  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  let token = user.jwt;

  if (!Object.keys(user).length) {
    token = localStorage.getItem('token');
  }

  const isUpadateBookPage = bookingIsPage(location);

  useEffect(() => {
    if (!token) {
      navigation('/auth');
    }
  }, [navigation, token]);

  const closeErrorMessage = () => {
    setOpenError(false);
    setErrorBooking(false);
    setErrorUpdateBooking(false);
    setErrorDeleteBooking(false);
  };

  const closeSuccessMessage = () => {
    setOpenSuccess(false);
    setSuccessBooking(false);
    setSuccessUpdateBooking(false);
    setSuccessDeleteBooking(false);
  };

  const closeSuccess = closeSuccessMessage;
  const closeError = closeErrorMessage;

  useEffect(() => {
    if (errorBooking || errorUpdateBooking || errorDeleteBooking) {
      setOpenError(true);
      setTimeout(() => closeError(), 4000);

      dispatch(setBooking(false));
    }

    if (successBooking || successUpdateBooking || successDeleteBooking) {
      setOpenSuccess(true);

      setTimeout(() => closeSuccess(), 4000);
      if (isUpadateBookPage) {
        triggerBookId(bookId);
      } else {
        triggerBooks();
      }
      dispatch(setBooking(false));
    }
  }, [
    triggerBooks,
    triggerBookId,
    dispatch,
    isUpadateBookPage,
    bookId,
    closeSuccess,
    closeError,
    successBooking,
    successUpdateBooking,
    successDeleteBooking,
    errorBooking,
    errorUpdateBooking,
    errorDeleteBooking,
  ]);

  useMemo(() => setSuccessBooking(isSuccessBooking), [isSuccessBooking]);

  useMemo(() => setSuccessUpdateBooking(isSuccessUpdateBooking), [isSuccessUpdateBooking]);

  useMemo(() => setSuccessDeleteBooking(isSuccessDeleteBooking), [isSuccessDeleteBooking]);

  useMemo(() => setErrorBooking(isErrorBooking), [isErrorBooking]);

  useMemo(() => setErrorUpdateBooking(isErrorUpdateBooking), [isErrorUpdateBooking]);

  useMemo(() => setErrorDeleteBooking(isErrorDeleteBooking), [isErrorDeleteBooking]);

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
            errorBooking
              ? typeMessage.errorLoadingBooking
              : errorUpdateBooking
              ? typeMessage.errorLoadingUpdateBooking
              : typeMessage.errorLoadingDeleteBooking
          }
        />
      )}
      {isOpenSuccess && !isOpenError && !isLoadingBooking && (
        <Error
          closeMessage={closeSuccessMessage}
          message={
            successBooking
              ? typeMessage.successLoadingBooking
              : successUpdateBooking
              ? typeMessage.successLoadingUpdateBooking
              : typeMessage.successLoadingDeleteBooking
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
        />
      ) : null}
    </>
  );
};

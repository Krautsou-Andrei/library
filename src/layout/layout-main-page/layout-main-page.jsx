import { useEffect, useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { routs } from '../../data/routs';
import { Error } from '../../pages/components/error';
import { typeMessage } from '../../pages/components/error/type-message';
import { Loading } from '../../pages/components/loading';
import { ModalBooking } from '../../pages/components/modals-windows/modal-calendar';
import { modalBooking, modalComments } from '../../pages/components/modals-windows/type-modal';
import {
  booksApi,
  setBooking,
  setComments,
  setErrorBooking,
  setErrorComments,
  setErrorDeleteBooking,
  setErrorEditComments,
  setErrorUpdateBooking,
  setSuccessBooking,
  setSuccessComments,
  setSuccessDeleteBooking,
  setSuccessEditComments,
  setSuccessUpdateBooking,
  useBookingMutation,
  useDeleteBookingMutation,
  useEditCommentsMutation,
  useSendCommentsMutation,
  useUpdateBookingMutation,
} from '../../redux';
import { bookingIsPage } from '../../utils/booking-book';

export const LayoutMainPage = () => {
  const successBooking = useSelector((state) => state.errorMain.successBooking);
  const successEditComments = useSelector((state) => state.errorMain.successEditComments);
  const successComments = useSelector((state) => state.errorMain.successComments);
  const successDeleteBooking = useSelector((state) => state.errorMain.successDeleteBooking);
  const successUpdateBooking = useSelector((state) => state.errorMain.successUpdateBooking);
  const errorBooking = useSelector((state) => state.errorMain.errorBooking);
  const errorUpdateBooking = useSelector((state) => state.errorMain.errorUpdateBooking);
  const errorComments = useSelector((state) => state.errorMain.errorComments);
  const errorDeleteBooking = useSelector((state) => state.errorMain.errorDeleteBooking);
  const errorEditComments = useSelector((state) => state.errorMain.errorEditComments);

  const [isOpenError, setOpenError] = useState(false);
  const [isOpenSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const bookId = useSelector((state) => state.selectBook.selectBookid);
  const isBooking = useSelector((state) => state.booking.isBooking);
  const isComments = useSelector((state) => state.booking.isComments);
  const [booking, { isLoading: isLoadingBooking, isSuccess: isSuccessBooking, isError: isErrorBooking }] =
    useBookingMutation();
  const [
    updateBooking,
    { isLoading: isLoadingUpdateBooking, isSuccess: isSuccessUpdateBooking, isError: isErrorUpdateBooking },
  ] = useUpdateBookingMutation();
  const [
    deleteBooking,
    { isLoading: isLoadingDeleteBooking, isSuccess: isSuccessDeleteBooking, isError: isErrorDeleteBooking, error },
  ] = useDeleteBookingMutation();
  const [sendComments, { isLoading: isLoadingComments, isSuccess: isSuccessComments, isError: isErrorComments }] =
    useSendCommentsMutation();
  const [
    editComments,
    { isLoading: isLoadingEditComments, isSuccess: isSuccessEditComments, isError: isErrorEditComments },
  ] = useEditCommentsMutation();
  const [triggerBooks, { isLoading: isLoadingUpdateBooks }] = booksApi.useLazyGetBooksQuery();
  const [triggerBookId, { isLoading: isLoadingUpdateBookId }] = booksApi.useLazyGetBookIdQuery();

  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  let token = user?.jwt;

  if (!Object.keys(user).length) {
    token = localStorage.getItem('token');
  }

  const isUpadateBookPage = bookingIsPage(location);

  useEffect(() => {
    if (!token) {
      navigation(`${routs.auth}`);
    }
  }, [navigation, token]);

  const closeErrorMessage = () => {
    setOpenError(false);

    dispatch(setErrorBooking(false));
    dispatch(setErrorUpdateBooking(false));
    dispatch(setErrorDeleteBooking(false));
    dispatch(setErrorComments(false));
    dispatch(setErrorEditComments(false));
  };

  const closeSuccessMessage = () => {
    setOpenSuccess(false);

    dispatch(setSuccessBooking(false));
    dispatch(setSuccessUpdateBooking(false));
    dispatch(setSuccessDeleteBooking(false));
    dispatch(setSuccessComments(false));
    dispatch(setSuccessEditComments(false));
  };

  const closeSuccess = closeSuccessMessage;
  const closeError = closeErrorMessage;

  useEffect(() => {
    if (errorBooking || errorEditComments || errorUpdateBooking || errorDeleteBooking || errorComments) {
      setOpenError(true);
      setTimeout(() => closeError(), 4000);

      dispatch(setBooking(false));
      dispatch(setComments(false));
    }

    if (successBooking || successEditComments || successUpdateBooking || successDeleteBooking || successComments) {
      setOpenSuccess(true);

      setTimeout(() => closeSuccess(), 4000);
      if (isUpadateBookPage) {
        triggerBookId(bookId);
      } else {
        triggerBooks();
      }
      dispatch(setBooking(false));
      dispatch(setComments(false));
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
    successComments,
    successEditComments,
    errorEditComments,
    errorComments,
    errorBooking,
    errorUpdateBooking,
    errorDeleteBooking,
  ]);

  return (
    <>
      {(isLoadingBooking ||
        isLoadingUpdateBooks ||
        isLoadingUpdateBookId ||
        isLoadingUpdateBooking ||
        isLoadingDeleteBooking ||
        isLoadingComments ||
        isLoadingEditComments) && <Loading />}
      {isOpenError && !isLoadingBooking && (
        <Error
          closeMessage={closeErrorMessage}
          message={
            errorBooking
              ? typeMessage.errorLoadingBooking
              : errorDeleteBooking
              ? typeMessage.errorLoadingDeleteBooking
              : errorComments
              ? typeMessage.errorLoadingComments
              : errorEditComments
              ? typeMessage.errorLoadingEditComments
              : errorUpdateBooking
              ? typeMessage.errorLoadingUpdateBooking
              : ''
          }
        />
      )}
      {isOpenSuccess && !isOpenError && !isLoadingBooking && (
        <Error
          closeMessage={closeSuccessMessage}
          message={
            successBooking
              ? typeMessage.successLoadingBooking
              : successDeleteBooking
              ? typeMessage.successLoadingDeleteBooking
              : successComments
              ? typeMessage.successLoadingComments
              : successEditComments
              ? typeMessage.successLoadingEditComments
              : successUpdateBooking
              ? typeMessage.successLoadingUpdateBooking
              : ''
          }
          isSuccess={true}
        />
      )}
      <main className='main' data-test-id='main-page'>
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
      {isComments ? (
        <ModalBooking
          typeModal={modalComments}
          sendComments={sendComments}
          editComments={editComments}
          clickButtonComments={isComments}
        />
      ) : null}
    </>
  );
};

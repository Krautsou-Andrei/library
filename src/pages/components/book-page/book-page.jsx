import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useCurrentCategory } from '../../../hooks/current-category';

import {
  setCurrentCategotyPath,
  setCurrentCategotyTitle,
  useGetBookIdQuery,
  booksApi,
  useSendCommentsMutation,
  useLazyGetUserQuery,
  userSlice,
  setComments,
  useLazyGetCategotiesQuery,
} from '../../../redux';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

import { BookInfo } from './book-info';
import { Loading } from '../loading';
import { Error } from '../error';
import { ModalBooking } from '../modals-windows/modal-calendar';
import { modalComments } from '../modals-windows/type-modal';
import { typeMessage } from '../error/type-message';
import { useGetBook } from '../../../hooks/use-get-book';

export const BookPage = () => {
  const [isOpenError, setOpenError] = useState(false);
  const [isOpenSuccess, setOpenSuccess] = useState(false);

  const [errorTriggerBookId, setErrorTriggerBookId] = useState(false);
  const [errorBookId, setErrorBookId] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorCategories, setErrorCategories] = useState(false);

  const isComments = useSelector((state) => state.booking.isComments);
  const { category, bookId } = useParams();
  const dispatch = useDispatch();

  const { data: dataBookId, isLoading: isLoadingBookId, isError: isErrorBookId } = useGetBookIdQuery(bookId);
  const [triggerBookId, { isLoading: isLoadingUpdate, isErrorTriggerBookId }] = booksApi.useLazyGetBookIdQuery();

  const [currentCategotyTitle, currentCategoryPath] = useCurrentCategory(category);
  const [triggerUser, { isError: isErrorUser }] = useLazyGetUserQuery();
  const [triggerCategories, { iseError: isErrorCategories }] = useLazyGetCategotiesQuery();

  const book = useGetBook(bookId);

  useEffect(() => {
    triggerCategories();
    triggerUser();
  }, [triggerUser, triggerCategories]);

  useEffect(() => {
    dispatch(setCurrentCategotyTitle(currentCategotyTitle));
    dispatch(setCurrentCategotyPath(currentCategoryPath));
  }, [dispatch, currentCategotyTitle, currentCategoryPath]);

  const closeErrorMessage = () => {
    setOpenError(false);
    setErrorBookId(false);
    setErrorCategories(false);
    setErrorUser(false);
    setErrorTriggerBookId(false);
  };

  const closeError = closeErrorMessage;

  useEffect(() => {
    if (errorBookId || errorCategories || errorUser || errorTriggerBookId) {
      setOpenError(true);
      setTimeout(() => closeError(), 4000);
    } else {
      setOpenError(false);
    }
  }, [
    errorBookId,
    errorCategories,
    errorUser,
    errorTriggerBookId,
    triggerBookId,
    bookId,
    triggerUser,
    triggerCategories,
    dispatch,
    closeError,
  ]);

  useMemo(() => setErrorBookId(isErrorBookId), [isErrorBookId]);
  useMemo(() => setErrorCategories(isErrorCategories), [isErrorCategories]);
  useMemo(() => setErrorUser(isErrorUser), [isErrorUser]);
  useMemo(() => setErrorTriggerBookId(isErrorTriggerBookId), [isErrorTriggerBookId]);

  return (
    <div>
      {isLoadingBookId && <Loading />}

      {isOpenError && !isLoadingBookId && (
        <Error closeMessage={() => setOpenError(false)} message={isErrorBookId && typeMessage.errorLoadingBook} />
      )}

      <Breadcrumbs
        category={category}
        categoryTitle={currentCategotyTitle}
        label={dataBookId?.title ? dataBookId?.title : book?.title}
      />
      {dataBookId && <BookInfo book={dataBookId?.title ? dataBookId : book} />}
    </div>
  );
};

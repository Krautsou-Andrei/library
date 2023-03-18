import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCurrentCategory } from '../../../hooks/current-category';

import {
  setCurrentCategotyPath,
  setCurrentCategotyTitle,
  useGetBookIdQuery,
  booksApi,
  useSendCommentsMutation,
} from '../../../redux';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

import { BookInfo } from './book-info';
import { Loading } from '../loading';
import { Error } from '../error';
import { ModalBooking } from '../modals-windows/modal-calendar';
import { modalComments } from '../modals-windows/type-modal';
import { typeMessage } from '../error/type-message';

export const BookPage = () => {
  const [isOpenError, setOpenError] = useState(false);
  const [isOpenSuccess, setOpenSuccess] = useState(false);
  const [isComments, setComments] = useState(false);
  const { category, bookId } = useParams();
  const dispatch = useDispatch();

  const { data: dataBookId, isLoading: isLoadingBookId, isError: isErrorBookId } = useGetBookIdQuery(bookId);
  const [triggerBookId, { isLoading: isLoadingUpdate }] = booksApi.useLazyGetBookIdQuery();
  const [sendComments, { isLoading: isLoadingComments, isSuccess: isSuccessComments, isError: isErrorComments }] =
    useSendCommentsMutation();

  const [currentCategotyTitle, currentCategoryPath] = useCurrentCategory(category);

  const onClickComments = () => {
    setComments(!isComments);
  };

  useEffect(() => {
    dispatch(setCurrentCategotyTitle(currentCategotyTitle));
    dispatch(setCurrentCategotyPath(currentCategoryPath));
  }, [dispatch, currentCategotyTitle, currentCategoryPath]);

  useEffect(() => {
    if (isErrorBookId || isErrorComments) {
      setOpenError(true);
      setTimeout(() => setOpenError(false), 4000);
      setComments(false);
      triggerBookId(bookId);
    } else {
      setOpenError(false);
    }
  }, [isErrorBookId, isErrorComments, triggerBookId, bookId]);

  useEffect(() => {
    if (isSuccessComments) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 4000);
      setComments(false);
      triggerBookId(bookId);
    } else {
      setOpenSuccess(false);
    }
  }, [isSuccessComments, triggerBookId, bookId]);

  return (
    <div>
      {isOpenSuccess && (
        <Error
          closeMessage={() => setOpenSuccess(false)}
          message={typeMessage.successLoadingComments}
          isSuccess={true}
        />
      )}
      {(isLoadingBookId || isLoadingComments || isLoadingUpdate) && <Loading />}
      {isOpenError && (
        <Error
          closeMessage={() => setOpenError(false)}
          message={
            (isErrorBookId && typeMessage.errorLoadingBook) || (isErrorComments && typeMessage.errorLoadingComments)
          }
        />
      )}

      <Breadcrumbs category={category} categoryTitle={currentCategotyTitle} label={dataBookId?.title} />
      {dataBookId && <BookInfo book={dataBookId} onClickComments={onClickComments} />}
      {isComments && (
        <ModalBooking
          typeModal={modalComments}
          onClickCommentsClose={onClickComments}
          sendComments={sendComments}
          clickButtonComments={isComments}
        />
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCurrentCategory } from '../../../hooks/current-category';

import { setCurrentCategotyPath, setCurrentCategotyTitle, useGetBookIdQuery } from '../../../redux';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

import { BookInfo } from './book-info';
import { Loading } from '../loading';
import { Error } from '../error';

export const BookPage = () => {
  const { category, bookId } = useParams();
  const dispatch = useDispatch();

  const { data: dataBookId, isLoading, isError } = useGetBookIdQuery(bookId);

  const [isOpenError, setOpenError] = useState(false);

  const [currentCategotyTitle, currentCategoryPath] = useCurrentCategory(category);

  useEffect(() => {
    dispatch(setCurrentCategotyTitle(currentCategotyTitle));
    dispatch(setCurrentCategotyPath(currentCategoryPath));
  }, [dispatch, currentCategotyTitle, currentCategoryPath]);

  useEffect(() => {
    if (isError) {
      setOpenError(true);
    } else {
      setOpenError(false);
    }
  }, [isError]);

  return (
    <div>
      {isLoading && <Loading />}
      {isOpenError && <Error closeMessage={() => setOpenError(false)} />}

      <Breadcrumbs category={category} categoryTitle={currentCategotyTitle} label={dataBookId?.title} />
      {dataBookId && <BookInfo book={dataBookId} />}
    </div>
  );
};

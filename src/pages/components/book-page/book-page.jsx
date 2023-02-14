import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetBookIdQuery } from '../../../redux';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { BookInfo } from './book-info';
import { Loading } from '../loading';
import { Error } from '../error';

export const BookPage = (props) => {
  const { category, bookId } = useParams();

  const { data: dataBookId, isLoading, isError } = useGetBookIdQuery(bookId);

  const [isOpenError, setOpenError] = useState(false);

  const categoryTitle = useSelector((state) => state.filter.currentCategoty);

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

      <Breadcrumbs category={category} categoryTitle={categoryTitle} label={dataBookId?.title} />
      {dataBookId && <BookInfo book={dataBookId} />}
    </div>
  );
};

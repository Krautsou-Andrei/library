import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { useFilterBooks } from '../../../hooks/filter-books';
import { useCurrentCategory } from '../../../hooks/current-category';

import { Book } from '../book';
import { Loading } from '../loading';
import { Error } from '../error';
import { Navigation } from '../navigation';
import { Empty } from '../empty';

import { setCurrentCategotyPath, setCurrentCategotyTitle, booksApi, useLazyGetUserQuery } from '../../../redux';

import { typeMessage } from '../error/type-message';

export const Contented = () => {
  const dispatch = useDispatch();
  const [triggerBook, { isLoading: isloadingBooks, isError: iserrorBooks, isSuccess: successBooks }] =
    booksApi.useLazyGetBooksQuery();
  const [
    triggerCategoties,
    { isLoading: isloadingCategories, isError: iserrorCategories, isSuccess: successCategories },
  ] = booksApi.useLazyGetCategotiesQuery();
  const [triggerUser] = useLazyGetUserQuery();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      triggerBook();
      triggerCategoties();
      triggerUser();
      console.log('yes');
    }
  }, [token, triggerBook, triggerCategoties, triggerUser]);

  const [isOpenError, setOpenError] = useState(false);
  const [isToggleButtonView, setToggleButtonView] = useState(true);
  const [currentView, setCurrentView] = useState('title');
  const [searchQuery, setSearchQuery] = useState();

  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const allBooks = useSelector((state) => state.books.books);

  const query = useSelector((state) => state.search.searchQuery);

  const myFilterBooks = useFilterBooks(allBooks);

  const isMatchValue = useSelector((state) => state.search.searchQuery);

  useEffect(() => {
    setSearchQuery(query);
    setSearchParams({ book: query });

    if (!query) {
      setSearchParams();
    }
  }, [setSearchQuery, setSearchParams, query]);

  const [currentCategotyTitle, currentCategoryPath] = useCurrentCategory(category);

  useEffect(() => {
    dispatch(setCurrentCategotyTitle(currentCategotyTitle));
    dispatch(setCurrentCategotyPath(currentCategoryPath));
  }, [dispatch, currentCategotyTitle, currentCategoryPath]);

  const toggleButtonView = (event) => {
    if (currentView === event.currentTarget.dataset.buttonView) {
      return;
    }
    setCurrentView(event.currentTarget.dataset.buttonView);
    setToggleButtonView(!isToggleButtonView);
  };

  useEffect(() => {
    if (iserrorBooks || iserrorCategories) {
      setOpenError(true);
    } else {
      setOpenError(false);
    }
  }, [iserrorBooks, iserrorCategories]);

  const books = myFilterBooks.filter((product) => product.title?.toLowerCase().includes(searchQuery?.toLowerCase()));

  return (
    <>
      {successCategories && successBooks && (
        <Navigation isToggleButtonView={isToggleButtonView} toggleButtonView={toggleButtonView} />
      )}
      <section className={classNames('main__contented', { 'book-list': !isToggleButtonView })}>
        <div className='contented' data-test-id='content'>
          {(isloadingBooks || isloadingCategories) && <Loading />}
          {isOpenError && !isloadingBooks && !isloadingCategories && (
            <Error closeMessage={() => setOpenError(false)} message={typeMessage.errorLoadingBook} />
          )}
          {successCategories &&
            successBooks &&
            (books.length > 0 ? (
              <div className='layout-4-column'>
                {books.map((product) => (
                  <Book product={product} key={product.id} />
                ))}
              </div>
            ) : isMatchValue ? (
              <Empty title='По запросу ничего не найдено' dataTestId='search-result-not-found' />
            ) : (
              <Empty title='В этой категории книг ещё нет' dataTestId='empty-category' />
            ))}
        </div>
      </section>
    </>
  );
};

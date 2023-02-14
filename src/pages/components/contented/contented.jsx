import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetBooksQuery, useGetCategotiesQuery } from '../../../redux';
import { changeFilter } from '../../../redux/slice/filter-slice';
import { Book } from '../book';
import { Loading } from '../loading';
import { Error } from '../error';
import { Navigation } from '../navigation';

export const Contented = () => {
  const dispatch = useDispatch();
  const { isLoading: loadingBooks, isError: errorBooks, isSuccess: successBooks } = useGetBooksQuery();
  const {
    data: dataCategories,
    isLoading: loadingCategories,
    isError: errorCategories,
    isSuccess: successCategories,
  } = useGetCategotiesQuery();

  const [isOpenError, setOpenError] = useState(false);
  const [isToggleButtonView, setToggleButtonView] = useState(true);
  const [currentView, setCurrentView] = useState('title');

  const { category } = useParams();

  const allBooks = useSelector((state) => state.books.books);
  const filterBooks = useSelector((state) => state.filter.books);

  useEffect(() => {
    dispatch(changeFilter({ category, allBooks, dataCategories }));
  }, [dispatch, category, allBooks, dataCategories]);

  const toggleButtonView = (event) => {
    if (currentView === event.currentTarget.dataset.buttonView) {
      return;
    }
    setCurrentView(event.currentTarget.dataset.buttonView);
    setToggleButtonView(!isToggleButtonView);
  };

  useEffect(() => {
    if (errorBooks || errorCategories) {
      setOpenError(true);
    } else {
      setOpenError(false);
    }
  }, [errorBooks, errorCategories]);

  return (
    <>
      {successCategories && successBooks && (
        <Navigation isToggleButtonView={isToggleButtonView} toggleButtonView={toggleButtonView} />
      )}
      <section className={classNames('main__contented', { 'book-list': !isToggleButtonView })}>
        <div className='contented'>
          {(loadingBooks || loadingCategories) && <Loading />}
          {isOpenError && !loadingBooks && !loadingCategories && <Error closeMessage={() => setOpenError(false)} />}
          {successCategories && successBooks && (
            <div className='layout-4-column'>
              {filterBooks.map((product) => (
                <Book product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

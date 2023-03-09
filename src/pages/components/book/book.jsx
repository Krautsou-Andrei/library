import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../redux';
import { setSearchQuery } from '../../../redux/slice/search-slice';

import { Heighlight } from '../../../helpers/heigh-light';

import { ImageBook } from '../image/image-book';
import { Rating } from '../rating';
import { Button } from '../buttons/button';

export const Book = ({ product }) => {
  const { id, image, title, rating, authors, issueYear } = product;

  const dispatch = useDispatch();
  const searchParams = useSelector((state) => state.search.searchQuery);

  const [currentTitle, setCurrentTittle] = useState();
  useEffect(() => {
    setCurrentTittle(Heighlight(searchParams, title));
  }, [title, searchParams]);

  const handlerClick = () => {
    dispatch(setSearchQuery({ searchQuery: '' }));
  };

  const buttonHundler = (event) => {
    event.preventDefault();
  };

  return (
    <Link id={`${id}`} to={`${id}`} className='book' data-test-id='card' onClick={handlerClick}>
      <div className='book__container'>
        <div className='book__image'>
          <ImageBook
            src={image ? `${BASE_URL}${image.url}` : ''}
            alt={title}
            width='174'
            height='242'
            className='image image-book'
          />
        </div>
        <div className='book__star rating'>
          {rating > 1 ? <Rating rating={rating} /> : <span className='rating__no'>Ещё нет оценок</span>}
        </div>
        <div className='book__title'>
          <h2 className='title-book title--lg'>{currentTitle}</h2>
        </div>
        <div className='book__autor'>
          <div className='book-autor-text'>
            <span>{`${authors} `}</span>, <span>{issueYear}</span>
          </div>
        </div>
        <div className='book__button'>
          <Button className='button button--book' onClick={buttonHundler} title='Забронировать' />
        </div>
      </div>
    </Link>
  );
};

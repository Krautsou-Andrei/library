// import React from 'react';
import { Link } from 'react-router-dom';

import { ImageBook } from '../image-book';
import { BASE_URL } from '../../../redux';
import { Rating } from '../rating';

export const Book = ({ product }) => {
  const { id, image, title, rating, authors, issueYear } = product;

  function buttonHundler(event) {
    event.preventDefault();
  }

  return (
    <Link id={`${id}`} to={`${id}`} className='book' data-test-id='card'>
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
        <div className='book__star'>
          <Rating rating={rating} />
        </div>
        <div className='book__title'>
          <h2 className='title-book title--lg'>{title}</h2>
        </div>
        <div className='book__autor'>
          <span>{`${authors} `}</span>, <span>{issueYear}</span>
        </div>
        <div className='book__button'>
          <button className='button button--book' type='button' onClick={buttonHundler}>
            Забронировать
          </button>
        </div>
      </div>
    </Link>
  );
};

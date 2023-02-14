import { useState } from 'react';
import classNames from 'classnames';

import { Slider } from '../slider';
import { BookReview } from './book-review';
import { Rating } from '../rating';

export const BookInfo = ({ book }) => {
  const [isReviewCollapsible, setReviewCollapsible] = useState(false);
  const toggleReview = () => {
    setReviewCollapsible(!isReviewCollapsible);
  };
  const {
    images,
    title,
    authors,
    issueYear,
    description,
    publish,
    pages,
    cover,
    weight,
    format,
    ISBN,
    producer,
    categories,
    comments,
    rating,
  } = book;

  return (
    <div className='book-page-wrapper wrapper'>
      <section className='book-page'>
        <div className='book-page-wrapper-content'>
          <div className='book-page-image-wrapper'>
            <Slider images={images} />
          </div>
          <div className='book-page__content'>
            <h2 className='book-page__title title--xxl'>{title}</h2>
            <div className='book-page__autor'>
              {authors && authors.map((author) => `${author}, `)} {issueYear}
            </div>

            <div className='book-page__button'>
              <button className='button button--book-page' type='button'>
                Забронировать
              </button>
            </div>
          </div>
          <div className='book-page-descripton__wrap'>
            <h3 className='book-page__title-description title--xl'>О книге</h3>
            <div className='book-page__description'>{description}</div>
          </div>
        </div>
        <div className='book-page__rating'>
          <h3 className='rating__title title--xl'>Рейтинг</h3>
          <div className='book__star'>
            <Rating rating={rating} />
            <span className='rating__value'>{rating}</span>
          </div>
        </div>
        <div className='book-page__info'>
          <h3 className='info__title title--xl'>Подробная информация</h3>
          <div className='info-wrap'>
            <div className='info__publishing'>
              <span>Издательство</span>
              <span>{publish}</span>
              <span>Год издания</span>
              <span>{book.issueYear}</span>
              <span>Страниц</span>
              <span>{pages}</span>
              <span>Переплёт</span>
              <span>{cover}</span>
              <span>Формат</span>
              <span>{format}</span>
            </div>
            <div className='info__book'>
              <span>Жанр</span>
              <span>
                {categories.map((category, index) => (
                  <p key={`${index + 1}`}>{category}</p>
                ))}
              </span>
              <span>Вес</span>
              <span>{weight}</span>
              <span>ISBN</span>
              <span>{ISBN}</span>
              <span>Изготовитель</span>
              <span>{producer}</span>
            </div>
          </div>
        </div>

        <div className='book-page__reviews review'>
          <div className='reviews-title-wrapper'>
            <span className='reviews__title title--xl'>Отзывы</span> <span className='review__quantity'>2</span>
            <button
              className='button-review-collapsible'
              type='button'
              aria-expanded={isReviewCollapsible}
              onClick={toggleReview}
              data-test-id='button-hide-reviews'
            >
              <span className='button-review-collapsible__scg' />
            </button>
          </div>
          <div className='review-title-border' />
          <div className={classNames({ 'review-content-wrapper': isReviewCollapsible })}>
            {comments && comments.map((item) => <BookReview key={item.id} props={item} />)}
          </div>
        </div>
        <div className=' review__button'>
          <button className='button button-review' type='button'>
            Оценить книгу
          </button>
        </div>
      </section>
    </div>
  );
};

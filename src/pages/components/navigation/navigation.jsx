import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setBooksFilter, setChangeOrder } from '../../../redux';
import { setSearchQuery } from '../../../redux/slice/search-slice';

import { IconSearch } from '../image/icon/icon-search';
import { IconSearchButtonClose } from '../image/icon/icon-search-button-close';
import { IconFilter } from '../image/icon/icon-filter';
import { IconViewTitles } from '../image/icon/icon-view-titles';
import { IconViewList } from '../image/icon/icon-view-list';

export const Navigation = ({ isToggleButtonView, toggleButtonView }) => {
  const [isSearchAction, setSearchAction] = useState(false);
  const [isFocusInput, setFocusInput] = useState(false);

  const searchParams = useSelector((state) => state.search.searchQuery);
  const books = useSelector((state) => state.filter.books);

  const dispatch = useDispatch();

  const handlerSubmit = (event) => {
    const searchQuery = event.target.value;

    dispatch(setSearchQuery({ searchQuery }));
  };
  const textInput = useRef(null);

  const isOrder = useSelector((state) => state.filter.isOrder);

  const handlerChangeOrder = () => {
    dispatch(setChangeOrder());
    dispatch(setBooksFilter({ books: [...books].reverse() }));
  };

  const searchActive = () => {
    setSearchAction(!isSearchAction);

    if (isFocusInput) {
      setFocusInput(!isFocusInput);
      textInput.current.blur();
    } else {
      setFocusInput(!isFocusInput);
      textInput.current.focus();
    }
  };

  return (
    <section className={classNames('main__navigation navigation', { 'search-action': isSearchAction })}>
      <div className='layout-2-column navigation-container'>
        <div className='layout-2-column navigation-search-container'>
          <div className='navigation__input-search' onSubmit={handlerSubmit}>
            <button
              className='button-input-search'
              type='submit'
              onClick={searchActive}
              data-test-id='button-search-open'
            >
              <IconSearch className='icon-button-search' fill='#A7A7A7' />
            </button>

            <input
              className='input'
              type='text'
              onChange={handlerSubmit}
              value={searchParams}
              ref={textInput}
              placeholder='Поиск книги или автора…'
              data-test-id='input-search'
            />

            <button
              className='button-search-close'
              type='button'
              onClick={searchActive}
              data-test-id='button-search-close'
            >
              <IconSearchButtonClose />
            </button>
          </div>
          <div className='navigation__button'>
            <button
              className='button button-filter'
              type='button'
              aria-expanded={isOrder}
              data-test-id='sort-rating-button'
              onClick={handlerChangeOrder}
            >
              <IconFilter className='icon-button-filter' fill='#A7A7A7' />
              <span>По рейтингу</span>
            </button>
          </div>
        </div>
        <div className='layout-2-column navigation-view'>
          <div className='navigation-view__button '>
            <button
              className={classNames('button-view botton-tiles', { 'button-view-active': isToggleButtonView })}
              type='button'
              onClick={(event) => toggleButtonView(event)}
              data-test-id='button-menu-view-window'
              data-button-view='title'
            >
              <IconViewTitles fill='currentColor' />
            </button>
          </div>
          <div className='navigation-view__button'>
            <button
              className={classNames('button-view botton-list', { 'button-view-active': !isToggleButtonView })}
              type='button'
              onClick={(event) => toggleButtonView(event)}
              data-test-id='button-menu-view-list'
              data-button-view='list'
            >
              <IconViewList fill='currentColor' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

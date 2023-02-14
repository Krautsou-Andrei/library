import classNames from 'classnames';
import { useRef, useState } from 'react';
import { IconSearch } from '../image/icon/icon-search';
import { IconSearchButtonClose } from '../image/icon/icon-search-button-close';

export const Navigation = ({ isToggleButtonView, toggleButtonView }) => {
  const [isSearchAction, setSearchAction] = useState(false);
  const [isFocusInput, setFocusInput] = useState(false);
  const textInput = useRef(null);

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
          <div className='navigation__input-search'>
            <button
              className='button-input-search'
              type='button'
              onClick={searchActive}
              data-test-id='button-search-open'
            >
              <IconSearch className='icon-button-search' fill='#A7A7A7' />
            </button>

            <input
              className='input'
              type='search'
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
            <button className='button button-filter' type='button'>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g opacity='0.9'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.5 4C2.5 3.72386 2.72386 3.5 3 3.5H11.4999C11.7761 3.5 11.9999 3.72386 11.9999 4C11.9999 4.27614 11.7761 4.5 11.4999 4.5H3C2.72386 4.5 2.5 4.27614 2.5 4ZM11.5 6.5C11.7761 6.5 12 6.72386 12 7V11.793L13.6464 10.1468C13.8417 9.95155 14.1583 9.95157 14.3535 10.1468C14.5488 10.3421 14.5487 10.6587 14.3535 10.854L11.8536 13.3535L11.8535 13.3536C11.7631 13.444 11.6381 13.5 11.5 13.5L11.497 13.5C11.4303 13.4996 11.3667 13.4861 11.3086 13.4621C11.2496 13.4377 11.1944 13.4015 11.1464 13.3536L8.64645 10.8536C8.45118 10.6583 8.45118 10.3417 8.64645 10.1464C8.84171 9.95118 9.15829 9.95118 9.35355 10.1464L11 11.7929V7C11 6.72386 11.2239 6.5 11.5 6.5ZM3 7.5C2.72386 7.5 2.5 7.72386 2.5 8C2.5 8.27614 2.72386 8.5 3 8.5H7.49994C7.77608 8.5 7.99994 8.27614 7.99994 8C7.99994 7.72386 7.77608 7.5 7.49994 7.5H3ZM3 11.5C2.72386 11.5 2.5 11.7239 2.5 12C2.5 12.2761 2.72386 12.5 3 12.5H6.5C6.77614 12.5 7 12.2761 7 12C7 11.7239 6.77614 11.5 6.5 11.5H3Z'
                    fill='#A7A7A7'
                  />
                </g>
              </svg>
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
              <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.14773 0.5C0.789997 0.5 0.5 0.789997 0.5 1.14773V6.32955C0.5 6.68728 0.789997 6.97727 1.14773 6.97727H6.32955C6.68728 6.97727 6.97727 6.68728 6.97727 6.32955V1.14773C6.97727 0.789997 6.68728 0.5 6.32955 0.5H1.14773ZM1.79545 5.68182V1.79545H5.68182V5.68182H1.79545ZM8.92045 0.5C8.56273 0.5 8.27273 0.789997 8.27273 1.14773V6.32955C8.27273 6.68728 8.56273 6.97727 8.92045 6.97727H14.1023C14.46 6.97727 14.75 6.68728 14.75 6.32955V1.14773C14.75 0.789997 14.46 0.5 14.1023 0.5H8.92045ZM9.56818 5.68182V1.79545H13.4545V5.68182H9.56818ZM0.5 8.92045C0.5 8.56273 0.789997 8.27273 1.14773 8.27273H6.32955C6.68728 8.27273 6.97727 8.56273 6.97727 8.92045V14.1023C6.97727 14.46 6.68728 14.75 6.32955 14.75H1.14773C0.789997 14.75 0.5 14.46 0.5 14.1023V8.92045ZM1.79545 9.56818V13.4545H5.68182V9.56818H1.79545ZM8.92045 8.27273C8.56273 8.27273 8.27273 8.56273 8.27273 8.92045V14.1023C8.27273 14.46 8.56273 14.75 8.92045 14.75H14.1023C14.46 14.75 14.75 14.46 14.75 14.1023V8.92045C14.75 8.56273 14.46 8.27273 14.1023 8.27273H8.92045ZM9.56818 13.4545V9.56818H13.4545V13.4545H9.56818Z'
                  fill='currentColor'
                />
              </svg>
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
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z'
                  fill='currentColor'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z'
                  fill='currentColor'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z'
                  fill='currentColor'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

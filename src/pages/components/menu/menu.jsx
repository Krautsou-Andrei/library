import { useState } from 'react';
import classNames from 'classnames';
import { useGetBooksQuery, useGetCategotiesQuery } from '../../../redux';

import { LinkMenu } from '../link-menu';
import { IconArrowMenuBurger } from '../image/icon/icon-arrow-menu-butger/icon-arrow-menu-burger';

export const Menu = ({ onClick, dataTestNav, dataTestLink, dataTestTerms, dataTestContract }) => {
  const { data: categories, isSuccess: successCategories } = useGetCategotiesQuery();
  const { isSuccess: successBooks } = useGetBooksQuery();

  const [isCollapsibleMenu, setCollapsibleMenu] = useState(false);

  const collapsibleMenu = () => {
    setCollapsibleMenu(!isCollapsibleMenu);
  };

  const activeClass = ({ isActive }) => (isActive ? 'tab-menu__link-title-active' : 'tab-menu__link');
  const activeClassMenu = ({ isActive }) => (isActive ? 'tab-menu__link-active' : 'tab-menu__link');

  return (
    <nav className='menu'>
      <ul className='menu__tab tab'>
        <li className='tab__item tab-menu'>
          <button
            className='tab-menu__title title--xl'
            type='button'
            aria-expanded={!isCollapsibleMenu}
            onClick={collapsibleMenu}
            data-test-id={dataTestNav}
          >
            <LinkMenu title='Витрина книг' link='books' activeClass={activeClass} />
            {successCategories && successBooks && (
              <span className='tab__arrow'>
                <IconArrowMenuBurger className='arrow__svg' />
              </span>
            )}
          </button>

          <div className='link-title-border' />
          <ul className={classNames('tab-menu__list', { 'tab-menu-collapsible': isCollapsibleMenu })} id='menu-list'>
            {categories && successCategories && successBooks && (
              <li className='tab-menu__item'>
                <LinkMenu
                  title='Все книги'
                  classTitle='tab-link'
                  activeClass={activeClassMenu}
                  link='/books/all'
                  onClick={onClick}
                  dataTestLink={dataTestLink}
                  dataTest='true'
                />
              </li>
            )}

            {categories &&
              successCategories &&
              successBooks &&
              categories.map((link) => (
                <li className='tab-menu__item' key={link.id}>
                  <LinkMenu
                    title={link.name}
                    classTitle='tab-link'
                    activeClass={activeClassMenu}
                    link={`/books/${link.path}`}
                    quantity={link.quantity}
                    onClick={onClick}
                    dataTestLink={dataTestLink}
                    dataTest={link.dataTest}
                  />
                </li>
              ))}
          </ul>
        </li>
        <li className='tab__item tab-menu'>
          <div className='tab-menu__title title--xl'>
            <LinkMenu
              title='Правила пользования'
              link='regulations'
              activeClass={activeClass}
              onClick={() => setCollapsibleMenu(true)}
              state={{ from: 'Правила пользования' }}
              dataTestLink={dataTestTerms}
              dataTest='true'
            />
          </div>
          <div className='link-title-border' />
        </li>
        <li className='tab__item tab-menu'>
          <div className='tab-menu__title title--xl'>
            <LinkMenu
              title='Договор оферты'
              link='offer'
              activeClass={activeClass}
              onClick={() => setCollapsibleMenu(true)}
              dataTestLink={dataTestContract}
              dataTest='true'
            />
          </div>
          <div className='link-title-border' />
        </li>
      </ul>
    </nav>
  );
};

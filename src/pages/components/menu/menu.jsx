import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { booksApi } from '../../../redux';

import { LinkMenu } from '../link-menu';
import { IconArrowMenuBurger } from '../image/icon/icon-arrow-menu-butger/icon-arrow-menu-burger';

import style from './menu.module.scss';

export const Menu = ({
  onClick,
  className,
  dataTestNav,
  dataTestLink,
  dataTestTerms,
  dataTestContract,
  dataTestCategoty,
}) => {
  const [triggerCategoties, { data: categories, isSuccess: successCategories }] = booksApi.useLazyGetCategotiesQuery();
  const [triggerBook, { isSuccess: successBooks }] = booksApi.useLazyGetBooksQuery();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      triggerBook();
      triggerCategoties();
    }
  }, [token, triggerBook, triggerCategoties]);

  const currentCategoryPath = useSelector((state) => state.filter.currentCategoryPath);
  const books = useSelector((state) => state.books.books);

  const [isCollapsibleMenu, setCollapsibleMenu] = useState(false);

  const collapsibleMenu = () => {
    setCollapsibleMenu(!isCollapsibleMenu);
  };

  const activeClass = ({ isActive }) => (isActive ? style['tab-menu__link-title-active'] : style['tab-menu__link']);
  const activeClassMenu = ({ isActive }) => (isActive ? style['tab-menu__link-active'] : style['tab-menu__link']);

  return (
    <nav className={`${style.menu} ${className && className}`}>
      <ul className={`${style.menu__tab} ${style.tab}`}>
        <li className={`${style.tab__item} ${style['tab-menu']}`}>
          <button
            className={`${style['tab-menu__title']} ${style['title--xl']}`}
            type='button'
            aria-expanded={!isCollapsibleMenu}
            onClick={collapsibleMenu}
            data-test-id={dataTestNav}
          >
            <LinkMenu
              title='Витрина книг'
              link={`books/${currentCategoryPath}`}
              className={activeClass}
              onClick={() => false}
            />
            {successCategories && successBooks && (
              <span className={style.tab__arrow}>
                <IconArrowMenuBurger classNameArrow={style.arrow} classNameSvg={style.arrow__svg} />
              </span>
            )}
          </button>

          <div className={style['link-title-border']} />
          <ul
            className={`${style['tab-menu__list']} ${isCollapsibleMenu && style['tab-menu-collapsible']}`}
            id='menu-list'
          >
            {categories && successCategories && successBooks && (
              <li className={style['tab-menu__item']}>
                <LinkMenu
                  title='Все книги'
                  className={activeClassMenu}
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
                <li className={style['tab-menu__item']} key={link.id}>
                  <LinkMenu
                    title={link.name}
                    className={activeClassMenu}
                    classNameQuantity={style['tab-item-quantity']}
                    link={`/books/${link.path}`}
                    quantity={`${books.filter((book) => book.categories.includes(link.name)).length}`}
                    onClick={onClick}
                    dataTestLink={dataTestLink}
                    dataTest={link.dataTest}
                    dataTestQuantity={`${dataTestCategoty}book-count-for-${link.path}`}
                    dataTestCategoty={`${dataTestCategoty}${link.path}`}
                  />
                </li>
              ))}
          </ul>
        </li>
        <li className={`${style.tab__item} ${style['tab-menu']}`}>
          <div className={`${style['tab-menu__title']} ${style['title--xl']}`}>
            <LinkMenu
              title='Правила пользования'
              link='regulations'
              className={activeClass}
              onClick={() => setCollapsibleMenu(true)}
              state={{ from: 'Правила пользования' }}
              dataTestLink={dataTestTerms}
              dataTest='true'
            />
          </div>
          <div className={style['link-title-border']} />
        </li>
        <li className={`${style.tab__item} ${style['tab-menu']}`}>
          <div className={`${style['tab-menu__title']} ${style['title--xl']}`}>
            <LinkMenu
              title='Договор оферты'
              link='offer'
              className={activeClass}
              onClick={() => setCollapsibleMenu(true)}
              dataTestLink={dataTestContract}
              dataTest='true'
            />
          </div>
          <div className={style['link-title-border']} />
        </li>
      </ul>
    </nav>
  );
};

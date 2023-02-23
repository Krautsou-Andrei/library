import classNames from 'classnames';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { stateMenuBurger } from '../../../redux/slice/burger-silce';
import avatar from '../../image/avatar.jpg';
import { BurgerMenu } from '../burger-menu';
import style from './header.module.scss';

export const Header = () => {
  const isOpenMenu = useSelector((state) => state.burgerMenu.isOpenMenuBurger);
  const actionMenuBurger = stateMenuBurger.actions.toggleMenuMode;
  const dispatch = useDispatch();

  const toggleMenuBurger = () => dispatch(actionMenuBurger());

  const buttonBurger = useRef(null);

  return (
    <section className='main-page'>
      <header className={style.header}>
        <div className={classNames(style.header__wrapper, style.wrapper)}>
          <div className={classNames(style['layout-2-column'], style['header-wrapper'])}>
            <div className={style.header__burger}>
              <button
                className={style['button-burger']}
                type='button'
                aria-expanded={isOpenMenu}
                onClick={() => toggleMenuBurger()}
                ref={buttonBurger}
                data-test-id='button-burger'
              >
                <span className={style['button-burger__burger']}>
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
            <div className={style.header__logo}>
              <Link to='/'>
                <span className={style.logo__svg} />
              </Link>
            </div>
            <div className={style.header__menu} aria-expanded={isOpenMenu}>
              <BurgerMenu buttonBurger={buttonBurger} onClick={toggleMenuBurger} />
            </div>
            <div className={classNames(style['layout-2-column'], style['header-content-container'])}>
              <div className={style.header__text}>
                <h1 className={classNames(style.header__title, style['title--xxl'])}>Библиотека</h1>
              </div>
              <div className={classNames(style['layout-2-column'], style['header-account-container'])}>
                <div className={style.account__content}>
                  <span>Привет, Иван!</span>
                </div>
                <div className={style.acconut__image}>
                  <img
                    className={classNames(style.image, style.image__account)}
                    src={avatar}
                    alt=''
                    width='58'
                    height='58'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

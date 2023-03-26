import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { BurgerMenu } from '../burger-menu';
import { Profil } from '../profil';
import { DataBurgerLink } from '../../../data/data-burger-link';
import { stateMenuBurger } from '../../../redux/slice/burger-silce';

import { ImageUser } from '../image/image-user/image-user';
import { BASE_URL } from '../../../redux';

import style from './header.module.scss';

export const Header = () => {
  let userAuth = useSelector((state) => state.authenticationUser.user);
  if (userAuth === null || (userAuth !== null && userAuth !== undefined && !Object.keys(userAuth).length)) {
      userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  console.log('authenticationUser', userAuth);

  const [isButtonProfil, setButtonProfil] = useState(false);
  const links = DataBurgerLink();

  const isOpenMenu = useSelector((state) => state.burgerMenu.isOpenMenuBurger);
  const actionMenuBurger = stateMenuBurger.actions.toggleMenuMode;
  const dispatch = useDispatch();

  const buttonBurger = useRef(null);

  const toggleMenuBurger = () => dispatch(actionMenuBurger());
  const toogleProfil = () => {
    setButtonProfil(!isButtonProfil);
  };

  const handleChange = (event) => {
    // console.log('file upload', event.target.files);
  };

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
              <button
                className={`
                  ${style['layout-2-column']}
                  ${style['header-account-container']}
                  ${isButtonProfil && style['active-profil']}`}
                type='button'
                onClick={toogleProfil}
              >
                <div className={style.account__content}>
                  <span>{`Привет, ${userAuth?.firstName}!`}</span>
                </div>
                <div className={style.acconut__image}>
                  <ImageUser
                    src={userAuth?.avatar ? `${BASE_URL}${userAuth?.avatar}` : ''}
                    alt='user'
                    width='58'
                    height='58'
                    className={classNames(style.image, style.image__account)}
                  />
                  {/* <img
                    className={classNames(style.image, style.image__account)}
                    src={userAuth.avatar}
                    alt=''
                    width='58'
                    height='58'
                  /> */}
                </div>
                {/* <input type='file' onChange={handleChange} /> */}
                {isButtonProfil && <Profil className={style.profil} links={links} />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

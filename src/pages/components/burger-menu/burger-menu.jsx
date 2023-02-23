import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Menu } from '../menu';
import { Profil } from '../profil/profil';
import { DataBurgerLink } from '../../../data/data-burger-link';

import style from './burger-menu.module.scss';

export const BurgerMenu = ({ buttonBurger, onClick }) => {
  const isOpenMenu = useSelector((state) => state.burgerMenu.isOpenMenuBurger);
  const links = DataBurgerLink();
  const burgerMenu = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!burgerMenu.current.contains(event.target) === !buttonBurger.current.contains(event.target)) {
        onClick();
      }
    };

    if (isOpenMenu) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [burgerMenu, buttonBurger, isOpenMenu, onClick]);

  return (
    <div className={style['menu-burger']} ref={burgerMenu} inert={undefined}>
      <Menu
        onClick={onClick}
        className={style.menu}
        dataTestNav='burger-showcase'
        dataTestLink='burger-books'
        dataTestTerms='burger-terms'
        dataTestContract='burger-contract'
        dataTestCategoty='burger-'
      />

      <Profil links={links} onClick={onClick} />
    </div>
  );
};

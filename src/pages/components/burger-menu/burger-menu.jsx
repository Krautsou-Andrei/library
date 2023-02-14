import { useEffect, useRef } from 'react';
import { Menu } from '../menu';
import { Profil } from '../profil/profil';
import { DataBurgerLink } from '../../../data/data-burger-link';

export const BurgerMenu = ({ isOpenMenu, buttonBurger, onClick }) => {
  const links = DataBurgerLink();
  const burgerMenu = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!burgerMenu.current.contains(event.target) === !buttonBurger.current.contains(event.target)) {
        onClick();
        document.removeEventListener('click', handleClick);
      }
    };

    if (isOpenMenu) {
      document.addEventListener('click', handleClick);
    }
  }, [burgerMenu, buttonBurger, isOpenMenu, onClick]);

  return (
    <div className='menu-burger' ref={burgerMenu} inert={undefined}>
      <Menu
        onClick={onClick}
        dataTestNav='burger-showcase'
        dataTestLink='burger-books'
        dataTestTerms='burger-terms'
        dataTestContract='burger-contract'
      />

      <Profil links={links} onClick={onClick} />
    </div>
  );
};

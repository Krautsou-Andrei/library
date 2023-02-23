import { Outlet } from 'react-router-dom';

import { Menu } from '../components/menu';

export const MainPage = () => (
  <div className='main__wrapper wrapper'>
    <div className='layout-2-column main-wrapper'>
      <section className='main__menu'>
        <Menu
          dataTestNav='navigation-showcase'
          dataTestLink='navigation-books'
          dataTestTerms='navigation-terms'
          dataTestContract='navigation-contract'
          dataTestCategoty='navigation-'
        />
      </section>
      <section className='main__content'>
        <Outlet />
      </section>
    </div>
  </div>
);

import { LayoutMainPage } from '../layout-main-page';
import { Header } from '../../pages/components/header';

import { Footer } from '../../pages/components/footer/footer';

export const Layout = () => (
  <div className='sait-wrapper'>
    <div className='sait-content'>
      <Header />
      <LayoutMainPage />
    </div>
    <Footer />
  </div>
);

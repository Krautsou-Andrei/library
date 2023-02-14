import { IconFacebook } from '../image/icon/icon-facebook';
import { IconInstagram } from '../image/icon/icon-instagram';
import { IconLinkedin } from '../image/icon/icon-linkedin';
import { IconVk } from '../image/icon/icon-vk';

export const Footer = () => (
  <footer className='footer'>
    <div className='footer__wrapper wrapper'>
      <div className='layout-2-column footer-wrapper'>
        <div className='footer__copyright'>© 2020-2023 Cleverland. Все права защищены.</div>
        <address className='footer__address'>
          <ul className='social__list'>
            <li className='social__item'>
              <IconFacebook />
            </li>
            <li className='social__item'>
              <IconInstagram />
            </li>
            <li className='social__item'>
              <IconVk />
            </li>

            <li className='social__item'>
              <IconLinkedin />
            </li>
          </ul>
        </address>
      </div>
    </div>
  </footer>
);

import { LinkMenu } from '../link-menu';

import style from './profil.module.scss';

export const Profil = ({ links, onClick }) => {
  const activeClass = ({ isActive }) => (isActive ? 'tab-menu__link-title-active' : 'tab-menu__link');
  return (
    <div className='profil'>
      {links.map((link) => (
        <div className='tab-menu__title title--xl' key={link.id}>
          <LinkMenu title={link.title} activeClass={activeClass} link='/' onClick={onClick} />
          <div className='link-title-border' />
        </div>
      ))}
    </div>
  );
};

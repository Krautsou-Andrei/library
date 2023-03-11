import { LinkMenu } from '../link-menu';

import style from './profil.module.scss';

export const Profil = ({ className, links, onClick }) => {
  const activeClass = ({ isActive }) => (isActive ? style['tab-menu__link-title-active'] : style['tab-menu__link']);
  return (
    <div className={className ? className : style.profil}>
      {links.map((link) => (
        <div
          className={
            className
              ? `${style['header-tab-menu__title']} ${style['title--xl']}`
              : `${style['tab-menu__title']} ${style['title--xl']}`
          }
          key={link.id}
        >
          <LinkMenu
            title={link.title}
            activeClass={activeClass}
            link='/'
            onClick={onClick}
            dataTestLink={link.dataTestLink}
            dataTest={link.dataTest}
          />
          <div className={style['link-title-border']} />
        </div>
      ))}
    </div>
  );
};

import { LinkMenu } from '../link-menu';

export const Profil = (props) => {
  const activeClass = ({ isActive }) => (isActive ? 'tab-menu__link-title-active' : 'tab-menu__link');
  return (
    <div className='profil'>
      {props.links.map((link) => (
        <div className='tab-menu__title title--xl' key={link.id}>
          <LinkMenu title={link.title} activeClass={activeClass} link='/' onClick={props.onClick} />
          <div className='link-title-border' />
        </div>
      ))}
    </div>
  );
};

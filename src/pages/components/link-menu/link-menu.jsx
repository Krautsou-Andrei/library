import { NavLink } from 'react-router-dom';

export const LinkMenu = (props) => (
  <>
    <NavLink
      to={props.link}
      className={props.activeClass}
      onClick={props.onClick}
      data-test-id={props.dataTest === 'true' ? props.dataTestLink : ''}
    >
      <span className={props.classTitle ? props.classTitle : ''}>{props.title}</span>
    </NavLink>

    {props.quantity ? <span className='tab-item-quantity'>{props.quantity}</span> : ''}
  </>
);

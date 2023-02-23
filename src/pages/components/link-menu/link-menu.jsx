import { NavLink } from 'react-router-dom';

export const LinkMenu = ({
  link,
  className,
  onClick,
  dataTest,
  dataTestLink,
  dataTestCategoty,
  dataTestQuantity,
  classTitle,
  title,
  quantity,
  classNameQuantity,
}) => (
  <>
    <NavLink
      to={link}
      className={className}
      onClick={onClick}
      data-test-id={dataTest === 'true' ? dataTestLink : dataTestCategoty}
    >
      <span className={classTitle ? classTitle : ''}>{title}</span>
    </NavLink>

    {quantity ? (
      <span className={classNameQuantity} data-test-id={dataTestQuantity}>
        {quantity}
      </span>
    ) : (
      ''
    )}
  </>
);

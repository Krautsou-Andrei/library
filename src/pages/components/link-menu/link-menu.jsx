import { NavLink, useNavigate } from 'react-router-dom';
import { routs } from '../../../data/routs';

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
}) => {
  const navigation = useNavigate();

  function deleteToken() {
    localStorage.removeItem('token');
  }

  const logout = async () => {
    const promise = new Promise((resolve, rejects) => {
      setTimeout(() => resolve(deleteToken()), 1000);
    });

    await promise;
    navigation(routs.auth);
  };

  const onClickLink = () => {
    if (onClick) {
      onClick();
    }
    if (title === 'Выход') {
      logout();
    }
  };

  return (
    <>
      <NavLink
        to={link}
        className={className}
        onClick={onClickLink}
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
};

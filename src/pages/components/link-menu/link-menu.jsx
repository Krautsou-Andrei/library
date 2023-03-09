import { NavLink, useNavigate } from 'react-router-dom';

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
    // document.cookie = `token=${value} ; max-age=-1`;

    localStorage.removeItem('token');
  }

  const logout = async () => {
    // const value = document?.cookie.match(/token=(.+?)(;|$)/)[1];

    const promise = new Promise((resolve, rejects) => {
      setTimeout(() => resolve(deleteToken()), 1000);
    });

    await promise;
    navigation('/auth');
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

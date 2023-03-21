import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { BASE_URL, useLazyGetUserQuery } from '../../../../redux';
import { useGetAvatarMutation, useSetAvatarMutation } from '../../../../redux/sevices/avatar-api';
import { Book } from '../../book';
import { FormEnter } from '../../form-enter';
import { ImageUser } from '../../image/image-user/image-user';
import { Loading } from '../../loading';
import { RegisterPage } from '../../register-page';
import { ChangeInfoUser } from './change-info-user';
import style from './profil-user.module.scss';

export const ProfilUser = () => {
  let user = useSelector((state) => state.authenticationUser.user);
  if (!Object.keys(user).length || user === null) {
    user = JSON.parse(localStorage.getItem('userAuth'));
  }

  const [setAvatar, { isLoading: isLoadingSetAvatar, isSuccess }] = useSetAvatarMutation();
  const [getAvatar] = useGetAvatarMutation();
  const [triggerUser] = useLazyGetUserQuery();

  const bindAvatar = (data) => {
    const avatar = {
      id: user.id,
      avatar: data[0].id,
    };
    // console.log(avatar);
    getAvatar(avatar);
    triggerUser();
  };

  const onChange = (event) => {
    // console.log(event.target.files[0]);
    const files = new FormData();
    files.append('files', event.target.files[0]);
    setAvatar(files).then((result) => bindAvatar(result.data));
  };

  // console.log('eser-profil', user);

  return (
    <>
      {isLoadingSetAvatar && <Loading />}
      <section className={classNames(style.user, style.wrapper)}>
        <div className={style.user__header}>
          <div className={style.user__image}>
            <ImageUser
              className={style['image-source']}
              src={user.avatar ? `${BASE_URL}${user.avatar}` : ''}
              alt='user'
              width='160'
              height='160'
            />
            <input
              className={style['input-image']}
              id='input-image'
              type='file'
              accept='image/*, .png, .jpg, .web'
              onChange={onChange}
            />
            <label className={style['label-input-image']} htmlFor='input-image' aria-label='change-image' />
          </div>
          <div className={style.user__title}>
            <h2 className={style['user-name']}>
              {user.firstName} <br /> {user.lastName}
            </h2>
          </div>
        </div>
        <div className={style.user__form}>
          {/* <div className={style.form}> */}
          <form className={style.form} action=''>
            <fieldset className={style.form__fieldset}>
              <legend className={style.form__legend}>
                <h3 className={style['section-title']}>Учетные данные</h3>
              </legend>
              <div className={style['title-info']}>Здесь вы можете отредактировать информацию о себе</div>
              {/* <ChangeInfoUser /> */}
            </fieldset>
          </form>
          {/* </div> */}
        </div>
        <div className={style['user__info-booking']}>
          <div className={style['info-booking']}>
            <h3 className={style['section-title']}>Забронированная книга</h3>

            <div className={style['title-info']}>
              Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
            </div>
            <div className={`${style['info-booking-description-wrapper']} 'book-list'`}>
              {user?.booking?.book ? (
                <div className='book-list'>
                  <Book product={user.booking.book} type='profil' />
                </div>
              ) : (
                <div className={style['info-booking__description']}>
                  <span className={style['description-label']}>
                    Забронируйте книгу <br />и она отобразится{' '}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={style['user__info-booking']}>
          <div className={style['info-booking']}>
            <h3 className={style['section-title']}>Книга которую взяли</h3>
            <div className={style['title-info']}>
              Здесь можете просмотреть информацию о книге и узнать сроки возврата
            </div>
            <div className={style['info-booking-description-wrapper']}>
              <div className={style['info-booking__description']}>
                <span className={style['description-label']}>
                  Прочитав книгу, <br /> она отобразится в истории
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={style['user__info-booking']}>
          <div className={style['info-booking']}>
            <h3 className={style['section-title']}>История</h3>
            <div className={style['title-info']}>Список прочитанных книг</div>
            <div className={style['info-booking-description-wrapper']}>
              <div className={style['info-booking__description']}>
                <span className={style['description-label']}>
                  Вы не читали книг <br />
                  из нашей библиотеки
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

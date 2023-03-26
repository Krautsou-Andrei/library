import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  BASE_URL,
  useEditDataUserMutation,
  useLazyGetBooksQuery,
  useLazyGetCategotiesQuery,
  useLazyGetUserQuery,
} from '../../../../redux';
import { useGetAvatarMutation, useSetAvatarMutation } from '../../../../redux/sevices/avatar-api';
import { Book } from '../../book';
import { ButtonSubmit } from '../../buttons/button-submit';
import { Button } from '../../buttons/button';
import { Error } from '../../error';
import { typeMessage } from '../../error/type-message';
import { ImageUser } from '../../image/image-user/image-user';
import { Loading } from '../../loading';

import { ProfilSlider } from '../profil-slider.js';
import { ChangeInfoUser } from './change-info-user';
import { editUserShema } from '../../../../helpers/validation';
import { useEditUserData } from '../../../../hooks/use-edit-user-data';

import style from './profil-user.module.scss';
import { bookingError } from '../../../../utils/booking-error';
import { EmptyCard } from '../empty-card/empty-card';
import { ExpiredCard } from '../expired-card';

export const ProfilUser = () => {
  const dataBook = {
    id: 2,
    title: 'Программирование на JAVA',
    rating: 2,
    issueYear: null,
    authors: ['Патрик Нимейер', 'Дэниэл Леук'],
    image: null,
  };

  const dataDelivery = {
    id: 1,
    handed: true,
    dateHandedFrom: '2022-11-04T21:00:00.000Z',
    dateHandedTo: '2022-10-31T21:00:00.000Z',
  };

  const history = {
    id: 3,
    books: [
      {
        id: 76,
        title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
        rating: 5,
        issueYear: null,
        authors: ['Джи Ким', 'Нейт Купер'],
        image: null,
      },
      {
        id: 67,
        title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
        rating: 5,
        issueYear: null,
        authors: ['Джи Ким', 'Нейт Купер'],
        image: null,
      },
      {
        id: 76,
        title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
        rating: 5,
        issueYear: null,
        authors: ['Джи Ким', 'Нейт Купер'],
        image: null,
      },
      {
        id: 76,
        title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
        rating: 5,
        issueYear: null,
        authors: ['Джи Ким', 'Нейт Купер'],
        image: null,
      },
      {
        id: 76,
        title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
        rating: 5,
        issueYear: null,
        authors: ['Джи Ким', 'Нейт Купер'],
        image: null,
      },
      {
        id: 76,
        title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
        rating: 5,
        issueYear: null,
        authors: ['Джи Ким', 'Нейт Купер'],
        image: null,
      },
    ],
  };
  const [inputDisabled, setInputDisabled] = useState(true);
  const [successGetAvatar, setSuccessGetAvatar] = useState(false);
  const [errorSetAvatar, setErrorSetAvatar] = useState(false);
  const [errorGetAvatar, setErrorGetAvatar] = useState(false);
  const [errorEditUser, setErrorEditUser] = useState(false);
  const [successEditUser, setSuccessEditUser] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [editUserError400, setEditUserError400] = useState(false);
  const [editUserError, setEditUserError] = useState(false);
  const { editUser, editUserData } = useEditUserData();
  let userAuth = useSelector((state) => state.authenticationUser.user);
  const user = useSelector((state) => state.user.user);
  let token = user.jwt;
  const navigation = useNavigate();

  if (userAuth === null || (userAuth !== null && userAuth !== undefined && !Object.keys(userAuth).length)) {
    userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  if (user === null || (user !== null && user !== undefined && !Object.keys(user).length)) {
    token = localStorage.getItem('token');
  }

  const {
    register,
    formState: { errors, isDirty, isValid, isTouched },
    handleSubmit,
    clearErrors,
    getFieldState,
    watch,
    trigger,
    control,
  } = useForm({
    mode: 'all',

    criteriaMode: 'all',
    shouldFocusError: 'true',
    defaultValues: {
      login: `${userAuth?.username}`,
      firstName: `${userAuth?.firstName}`,
      lastName: `${userAuth?.lastName}`,
      phone: `${userAuth?.phone}`,
      email: `${userAuth?.email}`,
    },
    resolver: yupResolver(editUserShema),
  });

  // console.log(`${userAuth.firstName}`, userAuth);

  useEffect(() => {
    if (!token) {
      navigation('/auth');
    }
  }, [navigation, token]);

  const [setAvatar, { isLoading: isLoadingSetAvatar, isSuccess, isError: isErrorSetAvatar }] = useSetAvatarMutation();
  const [getAvatar, { isLoading: isLoadingGetAvatar, isSuccess: isSuccessGetAvatar, isError: isErrorGetAvatar }] =
    useGetAvatarMutation();
  const [triggerUser] = useLazyGetUserQuery();
  const [triggerCategories] = useLazyGetCategotiesQuery();
  const [triggerBooks] = useLazyGetBooksQuery();
  const [editDataUser, { isLoading: isLoadingEditDataUser, isSuccess: isSuccessEditUser, isError: isErrorEditUser }] =
    useEditDataUserMutation();

  useEffect(() => {
    triggerCategories();
    triggerBooks();
    triggerUser();
  }, [triggerCategories, triggerBooks, triggerUser]);

  const repeatUser = (result) => {
    if (result?.error) {
      triggerUser();
    } else {
      triggerUser();
    }
  };

  const bindAvatar = (data) => {
    // console.log('data', data);
    const avatarId = data && data[0].id;
    const avatar = {
      id: userAuth?.id,
      avatar: avatarId,
    };

    getAvatar(avatar).then((result) => repeatUser(result));
  };

  const onChange = (event) => {
    const files = new FormData();
    files.append('files', event.target.files[0]);
    setAvatar(files).then((result) => bindAvatar(result.data));
  };

  const editButton = () => {
    setInputDisabled(!inputDisabled);
  };

  const closeErrorMessage = () => {
    setOpenError(false);
    setErrorSetAvatar(false);
    setErrorGetAvatar(false);
    setEditUserError(false);
  };

  const closeSuccessMessage = () => {
    setOpenSuccess(false);
    setSuccessGetAvatar(false);
    setSuccessEditUser(false);
  };

  const closeSuccess = closeSuccessMessage;
  const closeError = closeErrorMessage;

  useEffect(() => {
    if (errorSetAvatar || errorGetAvatar || errorEditUser) {
      setOpenError(true);
      setInputDisabled(true);
      setTimeout(() => closeError(), 4000);
    }

    if (successGetAvatar || successEditUser) {
      setOpenSuccess(true);
      setInputDisabled(true);
      setTimeout(() => closeSuccess(), 4000);
      // triggerUser();
    }
  }, [
    errorEditUser,
    successEditUser,
    successGetAvatar,
    errorSetAvatar,
    errorGetAvatar,
    triggerUser,
    closeSuccess,
    closeError,
  ]);

  const onSubmit = (data) => {
    editUserData(data);
    const userId = userAuth?.id;

    if (!!Object.keys(editUser).length || userAuth === null) {
      editDataUser({ userId, editUser }).then((result) => repeatUser(result));
    }
  };

  const onClickSave = () => {
    clearErrors();
  };

  useMemo(() => setSuccessGetAvatar(isSuccessGetAvatar), [isSuccessGetAvatar]);
  useMemo(() => setErrorSetAvatar(isErrorSetAvatar), [isErrorSetAvatar]);
  useMemo(() => setErrorGetAvatar(isErrorGetAvatar), [isErrorGetAvatar]);
  useMemo(() => setSuccessEditUser(isSuccessEditUser), [isSuccessEditUser]);
  useMemo(() => setErrorEditUser(isErrorEditUser), [isErrorEditUser]);

  return (
    <>
      {(isLoadingSetAvatar || isLoadingGetAvatar || isLoadingEditDataUser) && <Loading />}
      {openError && (
        <Error
          message={
            errorSetAvatar || errorGetAvatar
              ? typeMessage.errorLoadingAvatar
              : errorEditUser
              ? typeMessage.errorLoadingEditUser
              : ''
          }
          closeMessage={closeErrorMessage}
        />
      )}
      {openSuccess && (
        <Error
          message={
            successGetAvatar
              ? typeMessage.successLoadingAvatar
              : successEditUser
              ? typeMessage.successLoadingEditUser
              : ''
          }
          isSuccess={true}
          closeMessage={closeSuccessMessage}
        />
      )}
      <section className={classNames(style.user, style.wrapper)}>
        <div className={style.user__header} data-test-id='profile-avatar'>
          <label className={style.user__image} htmlFor='input-image' aria-label='change-image'>
            <ImageUser
              className={style['image-source']}
              src={userAuth?.avatar ? `${BASE_URL}${userAuth?.avatar}` : ''}
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
            <div className={style['label-input-image']} />
          </label>
          <div className={style.user__title}>
            <h2 className={style['user-name']}>
              {userAuth?.firstName} <br /> {userAuth?.lastName}
            </h2>
          </div>
        </div>
        <div className={style.user__form}>
          {/* <div className={style.form}> */}
          <form className={style.form} action='' onSubmit={handleSubmit(onSubmit)} data-test-id='profile-form'>
            <fieldset className={`${style.form__fieldset} ${editUserError400 && style.error}`}>
              <legend className={style.form__legend}>
                <h3 className={style['section-title']}>Учетные данные</h3>
              </legend>
              <div className={style['title-info']}>Здесь вы можете отредактировать информацию о себе</div>
              <ChangeInfoUser
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                watch={watch}
                style={style}
                trigger={trigger}
                // resetField={resetField}
                control={control}
                inputDisabled={inputDisabled}
                setInputDisabled={setInputDisabled}
                isDirty={isDirty}
                isValid={isValid}
                getFieldState={getFieldState}
                isTouched={isTouched}
              />
            </fieldset>
            <div className={style.form__buttons}>
              <div className={style['form__button-edit']}>
                <Button
                  className={`${style['button-edit']} ${style.button}`}
                  title='Редактировать'
                  // {buttonTextEdit}
                  disabled={false}
                  onClick={editButton}
                  data-test-id='edit-button'
                />
              </div>
              <div className={style['form__button-save']}>
                <ButtonSubmit
                  className={`${style['button-save']} ${style.button}`}
                  title='Сохранить изменения'
                  // {buttonTextSave}
                  isDisabled={inputDisabled}
                  data-test-id='save-button'
                  onClick={onClickSave}
                />
              </div>
            </div>
          </form>
          {/* </div> */}
        </div>
        <div className={style['user__info-booking']}>
          <div className={style['info-booking']}>
            <h3 className={style['section-title']}>Забронированная книга</h3>

            <div className={style['title-info']}>
              Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
            </div>
            <div className={`${style['info-booking-description-wrapper']}`}>
              {userAuth?.booking?.book ? (
                <div className={style['book-list']}>
                  <div className='book-list'>
                    <Book product={userAuth?.booking?.book} type='profil' buttonCancelBooking={true} />
                  </div>
                </div>
              ) : (
                <EmptyCard title='Забронируйте книгу и она отобразится' style={style} />
              )}
              {userAuth?.booking?.dateOrder && bookingError(userAuth?.booking?.dateOrder) && (
                <ExpiredCard
                  title='Дата бронирования книги истекла'
                  subTitle='Через 24 часа книга будет доступна всем'
                  style={style}
                />
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
              {userAuth?.delivery?.book ? (
                <div className={style['book-list']}>
                  <div className='book-list'>
                    {/* userAuth?.delivery?.book     userAuth?.delivery */}
                    <Book product={userAuth?.delivery?.book} type='profil' profilDelivery={userAuth?.delivery} />
                  </div>
                </div>
              ) : (
                <EmptyCard title='Прочитав книгу, она отобразится в истории' style={style} />
              )}
              {userAuth?.delivery?.dateHandedTo && bookingError(userAuth?.delivery?.dateHandedTo) && (
                <ExpiredCard title='Вышел срок пользования книги' subTitle='Верните книгу, пожалуйста' style={style} />
              )}
            </div>
          </div>
        </div>
        <div className={style['user__info-booking']}>
          <div className={style['info-booking']} data-test-id='history'>
            <h3 className={style['section-title']}>История</h3>
            <div className={style['title-info']}>Список прочитанных книг</div>
            <div className={style['info-booking-description-wrapper']}>
              {userAuth?.history?.books ? (
                // true
                <>
                  {/* userAuth?.history?.books      */}
                  <ProfilSlider books={userAuth?.history?.books} style={style} />
                </>
              ) : (
                <EmptyCard title='Вы не читали книг из нашей библиотеки' style={style} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

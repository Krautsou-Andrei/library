export const modalErrorAuthentication = {
  modalTitle: 'Вход не выполнен',
  modalDescription: 'Что-то пошло не так. Попробуйте ещё раз',
  modalButtonText: 'повторить',
  modalLinkPath: '/auth',
};

export const modalErrorRecovery = {
  modalTitle: 'Данные не сохранились',
  modalDescription: 'Что-то пошло не так. Попробуйте ещё раз',
  modalButtonText: 'повторить',
  modalLinkPath: '/forgot-pass',
};

export const modalErrorRegistration = {
  modalTitle: 'Данные не сохранились',
  modalDescription: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
  modalButtonText: 'повторить',
  modalLinkPath: '/registration',
};

export const modalErrorRegistration400 = {
  modalTitle: 'Данные не сохранились',
  modalDescription:
    'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
  modalButtonText: 'назад к регистрации',
  modalLinkPath: '/registration',
};

export const modalSuccessForgot = {
  modalTitle: 'Письмо выслано',
  modalDescription: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
};

export const modalSuccessRecovery = {
  modalTitle: 'Новые данные сохранены',
  modalDescription: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
  modalButtonText: 'вход',
  modalLinkPath: '/auth',
};

export const modalSeccessRegistration = {
  modalTitle: 'Регистрация успешна',
  modalDescription: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
  modalButtonText: 'вход',
  modalLinkPath: '/books/all',
};

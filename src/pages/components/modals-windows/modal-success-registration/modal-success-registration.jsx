import { ModalWindow } from '../modal-window';

export const ModalSeccessRegistration = () => {
  const typeModal = {
    modalTitle: 'Регистрация успешна',
    modalDescription: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
    modalButtonText: 'вход',
    modalLinkPath: '/books/all',
  };
  return <ModalWindow typeModal={typeModal} />;
};

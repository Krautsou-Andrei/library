import { ModalWindow } from '../modal-window';

export const ModalSuccessRecovery = () => {
  const typeModal = {
    modalTitle: 'Новые данные сохранены',
    modalDescription: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
    modalButtonText: 'вход',
    modalLinkPath: '/auth',
  };
  return <ModalWindow typeModal={typeModal} />;
};

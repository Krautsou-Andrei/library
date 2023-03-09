import { ModalWindow } from '../modal-window';

export const ModalErrorAuthentication = ({ onSubmit }) => {
  const typeModal = {
    modalTitle: 'Вход не выполнен',
    modalDescription: 'Что-то пошло не так. Попробуйте ещё раз',
    modalButtonText: 'повторить',
    modalLinkPath: '/auth',
  };

  return <ModalWindow typeModal={typeModal} onSubmit={onSubmit} />;
};

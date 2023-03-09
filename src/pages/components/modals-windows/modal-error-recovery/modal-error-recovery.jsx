import { ModalWindow } from '../modal-window';

export const ModalErrorRecovery = ({ onSubmit }) => {
  const typeModal = {
    modalTitle: 'Данные не сохранились',
    modalDescription: 'Что-то пошло не так. Попробуйте ещё раз',
    modalButtonText: 'повторить',
    modalLinkPath: '/forgot-pass',
  };
  return <ModalWindow typeModal={typeModal} onSubmit={onSubmit} />;
};

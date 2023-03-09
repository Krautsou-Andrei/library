import { useSelector } from 'react-redux';
import { ModalWindow } from '../modal-window';

export const ModalErrorRegistration = ({ onSubmit }) => {
  const typeModal = {
    modalTitle: 'Данные не сохранились',
    modalDescription: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
    modalButtonText: 'повторить',
    modalLinkPath: '/registration',
  };
  return <ModalWindow typeModal={typeModal} onSubmit={onSubmit} />;
};

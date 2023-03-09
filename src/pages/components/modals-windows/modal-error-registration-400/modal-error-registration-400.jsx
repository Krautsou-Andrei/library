import { ModalWindow } from '../modal-window';

export const ModalErrorRegistration400 = ({ onSubmit }) => {
  const typeModal = {
    modalTitle: 'Данные не сохранились',
    modalDescription:
      'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
    modalButtonText: 'назад к регистрации',
    modalLinkPath: '/registration',
  };

  return <ModalWindow typeModal={typeModal} onSubmit={onSubmit} />;
};

import { ModalWindow } from '../modal-window';

export const ModalSuccessForgot = () => {
  const typeModal = {
    modalTitle: 'Письмо выслано',
    modalDescription: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
  };

  return <ModalWindow typeModal={typeModal} />;
};

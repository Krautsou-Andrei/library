import { useNavigate } from 'react-router-dom';

import style from './modal-window.module.scss';

export const ModalWindow = ({ typeModal, onSubmit }) => {
  const { modalTitle, modalDescription, modalButtonText, modalLinkPath } = typeModal;
  const navigation = useNavigate();

  const onClick = () => {
    if (onSubmit) {
      onSubmit();
    }

    navigation(`${modalLinkPath}`);
  };

  return (
    <div className={style.modal} data-test-id='status-block'>
      <h2 className={style.modal__title}>{modalTitle}</h2>

      <div className={style.modal__description}>{modalDescription}</div>
      {modalButtonText && (
        <div className={style.modal__button}>
          <button className={`${style.button} ${style['button-modal']}`} type='button' onClick={onClick}>
            {modalButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

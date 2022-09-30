import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');
const htmlRef = document.querySelector('html');

// Компонент модального окна
export default function Modal({ children, onClose }) {
  // Вешает слушатели (mount)
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    htmlRef.classList.add('openModal');
    // Убирает слушатети (unmount)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      htmlRef.classList.remove('openModal');
    };
  });

  // Наблюдает за Escape и закрывает модалку
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  // Наблюдает за бекдропом и закрывает модалку
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

import React, { useEffect } from 'react';

import ReactPortal from '../helpers/react-portal';
import './style.css';

type Props = {
  children?: JSX.Element[] | JSX.Element;
  isOpen: boolean;
  portalId?: string;
  modalContentClassName?: string;
  blurBackdrop?: boolean;
  onCloseModal: () => void;
};

const Modal = ({ children, isOpen, portalId = 'modal-portal', modalContentClassName = '', onCloseModal }: Props) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? onCloseModal() : null);

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onCloseModal]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const modalWrapper = document.getElementById('modal-wrapper');
    const modalContent = document.getElementById('modal-content');

    if (modalWrapper?.style) {
      if (isOpen) {
        modalWrapper.style.display = 'flex';
        timeout = setTimeout(() => {
          modalWrapper.style.opacity = '1';
          modalContent!.classList.add('content-transition');
        }, 100);
      } else {
        modalContent!.classList.remove('content-transition');
        modalWrapper.style.opacity = '0';

        timeout = setTimeout(() => {
          modalWrapper.style.display = 'none';
        }, 350);
      }
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const onClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <ReactPortal portalId={ portalId }>
      <div id='modal-wrapper' className='modal-wrapper' onClick={ onClickOutside }>
        <div id='modal-content' className={ 'modal-content ' + modalContentClassName }>
          { children }
        </div>
      </div>
    </ReactPortal>
  );
};
export default Modal;

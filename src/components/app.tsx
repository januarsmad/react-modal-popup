import React, { useEffect, useState } from 'react';

import ReactPortal from '../helpers/react-portal';

type Props = {
  children?: JSX.Element[] | JSX.Element;
  isOpen: boolean;
  portalId?: string;
  modalContentClassName?: string;
  blurBackdrop?: boolean;
  onCloseModal: () => void;
};

const Modal = ({
  children,
  isOpen,
  portalId = 'modal-portal',
  modalContentClassName = '',
  onCloseModal
}: Props) => {

  const [styles, setStyles] = useState<any>({
    modalWrapper: {
      position: 'fixed',
      display: 'none',
      inset: 0,
      width: '100vw',
      height: 'calc(100vh - 80px)',
      padding: '40px 0px',
      backgroundColor: '#00000040',
      overflow: 'auto',
      opacity: 0,
      transition: 'all 0.3s ease-in-out',
    },
    modalContent: {
      position: 'relative',
      padding: '20px',
      width: 'fitContent',
      borderRadius: '5px',
      margin: 'auto auto',
      backgroundColor: '#fff',
      transition: 'all 0.3s ease-in-out',
      opacity: 0,
      transform: 'translate(0, 100px)',
    },
  });

  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? isOpen && onCloseModal() : null);

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onCloseModal, isOpen]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setStyles((prevState: any) => ({
        ...prevState,
        modalWrapper: {
          ...prevState.modalWrapper,
          display: 'flex'
        }
      }));

      timeout = setTimeout(() => {
        setStyles((prevState: any) => {
          return {
            ...prevState,
            modalWrapper: {
              ...prevState.modalWrapper,
              opacity: 1
            },
            modalContent: {
              ...prevState.modalContent,
              opacity: 1,
              transform: 'translate(0, 0px)',
            }
          };
        });
      }, 100);
    } else {
      setStyles((prevState: any) => ({
        ...prevState,
        modalWrapper: {
          ...prevState.modalWrapper,
          opacity: 0,
        },
        modalContent: {
          ...prevState.modalContent,
          opacity: 0,
          transform: 'translate(0, 100px)',
        }
      }));

      timeout = setTimeout(() => {
        setStyles((prevState: any) => ({
          ...prevState,
          modalWrapper: {
            ...prevState.modalWrapper,
            display: 'none'
          },
        }));
      }, 350);
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
      <div id='modal-wrapper' style={ styles.modalWrapper } onClick={ onClickOutside }>
        <div id='modal-content' style={ styles.modalContent } className={ modalContentClassName }>
          { children }
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;

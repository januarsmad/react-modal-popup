import React, { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import ReactPortal from '../helpers/react-portal'
import './style.css'

type Props = {
  children: JSX.Element[] | JSX.Element
  isOpen: boolean
  portalId?: string
  onCloseModal: () => void
}

const Modal = ({ children, isOpen, onCloseModal, portalId = 'modal-portal' }: Props) => {
  const nodeRef = useRef(null)

  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? onCloseModal() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [onCloseModal])

  return (
    <ReactPortal portalId={portalId}>
      <CSSTransition in={isOpen} timeout={{ enter: 0, exit: 300 }} unmountOnExit classNames='modal' nodeRef={nodeRef}>
        <div className='modal' ref={nodeRef}>
          <button onClick={onCloseModal} className='close-btn'>
            Close
          </button>
          <div className='modal-content'>{children}</div>
        </div>
      </CSSTransition>
    </ReactPortal>
  )
}
export default Modal

import React, { useState } from 'react'

import { ModalPopup } from '../src/index'

const ExampleApp = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleShowModal = () => setIsOpen(!isOpen)

  return (
    <div>
      <button onClick={ handleShowModal }>Open Modal</button>
      <ModalPopup isOpen={ isOpen } onCloseModal={ handleShowModal }>
        <h1>Modal</h1>
      </ModalPopup>
    </div>
  )
}

export default ExampleApp

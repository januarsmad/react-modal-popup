# react-modal-popup

Simple and lightweight modal popup component.

## Installation:

```bash
npm install --save react-modal-popup
```

or

```bash
yarn add react-modal-popup
```

## Usage :

Add `ModalPopup` to your component:

```js
import React, { useState } from 'react';
import ModalPopup from 'react-modal-popup';

const MyApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowModal = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={ handleShowModal }>Open Modal</button>
      <ModalPopup
        isOpen={ isOpen }
        onCloseModal={ handleShowModal }
      >
        <h1>Modal</h1>
      </ModalPopup>
    </div>
  );
};
```
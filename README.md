# react-modal-popup

## Installation:

```bash
npm install my-react-typescript-package --save-dev
```

or

```bash
yarn add -D my-react-typescript-package
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
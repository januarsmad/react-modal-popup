/* eslint-disable no-undef */
import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import { ModalPopup } from '../src';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <ModalPopup isOpen={ true } onCloseModal={ () => null }>
        <h1>Modal</h1>
      </ModalPopup>,
    );
  });
});

import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent, screen, waitFor, getByText } from '@testing-library/react';

import '@testing-library/jest-dom';

import Message from '../Message';

// jest.useFakeTimers();

it('should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Message message={{ msg: 'Not Authorized' }} />, div);
});

it('should renders toast message and auto close ', async () => {
  const div = document.createElement('div');
  render(<Message message={{ msg: 'Not Authorized' }} duration={100} />, div);
  const searchInput = screen.getByTestId(/toast/i);

  await waitFor(() => expect(searchInput).toBeInTheDocument());
  await waitFor(() => expect(searchInput).not.toBeInTheDocument());
});

// it('should trigger the onClose event after clicking on the close button ', async () => {
//   const div = document.createElement('div');
//   render(<Message message={{ msg: 'Not Authorized' }} />, div);
//   const searchInput = screen.getByTestId(/alert/i);
//   fireEvent.click(screen.getByTestId('alert'));
//   await waitFor(() => expect(searchInput).not.toBeInTheDocument());
//   // console.log(searchInput.hasAttribute('direction'));?
//   // await waitFor(() => expect(searchInput).toHaveAttribute('variant'));
// });

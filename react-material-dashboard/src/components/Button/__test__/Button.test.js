import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import AsyncButton from '../AsyncButton';

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    const p = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise A win!');
      }, 200);
    });

    return p;
  });
});

it('should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<AsyncButton />, div);
});

it('should renders button correctly', () => {
  render(<AsyncButton text="Click" />);
  expect(screen.getByTestId('button')).toHaveTextContent('Click');
});

it('should call "onClick" prop on button click', () => {
  render(<AsyncButton onClick={global.fetch} />);
  fireEvent.click(screen.getByRole('button'));
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

it('element disabled, should not call "onClick" prop on button click', () => {
  render(<AsyncButton onClick={global.fetch} disabled />);
  fireEvent.click(screen.getByRole('button'));
  expect(global.fetch).toHaveBeenCalledTimes(0);
});

it('should call the circularProgres component prop on button click', () => {
  render(<AsyncButton onClick={global.fetch} text="Click" />);
  fireEvent.click(screen.getByRole('button'));
  const searchInput = screen.getByTestId(/circularProgres/i);
  expect(searchInput).toBeInTheDocument();

  setTimeout(() => {
    expect(searchInput).not.toBeInTheDocument();
    expect(screen.getByTestId('button')).toHaveTextContent('Click');
  }, 200);
});

it('should disable the AsycnButton component prop on button click', () => {
  render(<AsyncButton onClick={global.fetch} text="Click" />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByTestId('button')).toBeDisabled();
  setTimeout(() => {
    expect(screen.getByTestId('button')).not.toBeDisabled();
  }, 200);
});

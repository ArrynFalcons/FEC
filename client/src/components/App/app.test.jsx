import React from 'react';
import 'regenerator-runtime/runtime';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

test('loads App and shows the components', async () => {
  render(<App />);
  expect(screen.getByTitle('overview')).toHaveTextContent('Overview');
});
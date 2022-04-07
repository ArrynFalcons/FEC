import React from 'react';
import 'regenerator-runtime/runtime';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Reviews from './Reviews.jsx';
import Summary from './Summary.jsx';

test('loads Reviews and shows the components', async () => {
  render(<Reviews />);
  expect(screen.getByTitle('reviews')).toHaveTextContent('Reviews');
});
// test('Shows summary of review data with an average', async () => {
//   render(<Summary />);
//   expect(screen.getByTitle('summary')).toHaveTextContent('Average Rating');
// });
import React from 'react';
import 'regenerator-runtime/runtime';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Reviews from './Reviews.jsx';
import Summary from './comp/Summary.jsx';
import App from '../App/App.jsx';

test('loads Reviews and shows the components', async () => {
  render(<App />);
  expect(screen.getByTitle('reviews')).toHaveTextContent('Ratings and Reviews');
});
test('Shows summary of review data with an average', async () => {
  render(<App />);
  expect(screen.getByTitle('summary')).toHaveTextContent('Average Rating:');
});
test('Shows a review list', async () => {
  render(<App />);
  expect(screen.getByTitle('reviewlist')).toHaveTextContent('Sort By:');
});
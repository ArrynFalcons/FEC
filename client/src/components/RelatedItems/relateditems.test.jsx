import React from 'react';
import 'regenerator-runtime/runtime';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedItems from './RelatedItems.jsx';

// test('loads App and shows the components', async () => {
//   render(<RelatedItems />);
//   expect(screen.getByTitle('overview')).toHaveTextContent('Overview');
// });

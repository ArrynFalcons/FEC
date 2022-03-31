/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import Questions from './Questions.jsx';
import RelatedItems from './RelatedItems.jsx';
import Reviews from './Reviews.jsx';

function App() {
  axios.get('/products')
    .then(res => console.log(res));
  return (
    <div className="container">
      <div className="overview">
        <Overview />
      </div>
      <div className="related-items">
        <RelatedItems />
      </div>
      <div className="q-and-a">
        <Questions />
      </div>
      <div className="ratings-and-reviews">
        <Reviews />
      </div>
    </div>
  );
}

export default App;

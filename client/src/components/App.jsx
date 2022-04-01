/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import Questions from './Questions.jsx';
import RelatedItems from './RelatedItems.jsx';
import Reviews from './Reviews.jsx';

// import getRouteData from '../../../server/index.js'
// // const { getRouteData } = require('../../../server/index.js');

function App() {
  const getRouteData = (route, page, count, sort, product-id) => {
    let params = {
      page,
      count,
      product_id,
    };
  }
  axios.get('/products', {
    params: {page: 3, count: 15, product_id: 65641},
  })
    .then(data => console.log(data.data));

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

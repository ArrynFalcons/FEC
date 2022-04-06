/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from '../Overview/Overview.jsx';
import Questions from '../Questions/Questions.jsx';
import RelatedItems from '../RelatedItems/RelatedItems.jsx';
import Reviews from '../Reviews/Reviews.jsx';

function App() {
  const getRouteData = (route, page, count, sort, Id, endParam) => {
    const params = {
      page,
      count,
      sort,
      product_id: Id,
    };
    if (route === 'products') {
      return (Id ? axios.get(`/products/${Id}/${endParam}`)
        : axios.get('/products', { params }));
    }
    if (route === 'qa/questions') {
      return (endParam ? axios.get(`/qa/questions/${Id}/${endParam}`)
        : axios.get('/qa/questions', { params }));
    }
    return axios.get(`/reviews/${endParam}`, { params });
  };

  // example of how to use helper function
  // getRouteData('products', 1, 10, '', '65651', '')
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <div className="container">
      <Overview getRouteData={getRouteData} />
      <div className="related-items">
        <RelatedItems getRouteData={getRouteData} />
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

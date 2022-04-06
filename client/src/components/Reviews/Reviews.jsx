/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './comp/summary.jsx';
import ReviewList from './comp/ReviewList.jsx';
import NewReview from './comp/NewReview.jsx';

function Reviews(props) {
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
    <div className="ratings-container">
      <Summary grd={getRouteData} />
      <ReviewList grd={getRouteData} />
      <NewReview grd={getRouteData} />
    </div>
  );
}

export default Reviews;

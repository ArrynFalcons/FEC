/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './comp/summary.jsx';
import ReviewList from './comp/ReviewList.jsx';
import NewReview from './comp/NewReview.jsx';
import Links from './comp/Links.jsx';

function Reviews(props) {
  const { grd, pid } = props;

  return (
    <div className="ratings-container">
      <NewReview pid={pid} grd={grd} />
      <Summary pid={pid} grd={grd} />
      <ReviewList pid={pid} grd={grd} />
      <Links />
    </div>
  );
}

export default Reviews;

/* eslint-disable*/
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { getRouteData } from './Helpers.js';
import Overview from '../Overview/Overview.jsx';
import Questions from '../Questions/Questions.jsx';
import RelatedItems from '../RelatedItems/RelatedItems.jsx';
import Reviews from '../Reviews/Reviews.jsx';
// import Summary from '../Reviews/comp/summary.jsx';

const getRouteData = require('./Helpers.js').default;

function App() {
  // have product id and view in state
  // move this outside of app

  useEffect(() => {
    // need to get access to product id in url
    // set it into state
  }, []);

  const [productId, setProductId] = useState('65635');
  // const reviews = useRef(null);
  // const [avgRating, setAvgRating] = useState(0);

  // sends User Click info to data scientists
  useEffect(() => {
    window.onclick = (event) => {
      let widget = '';
      if (event.pageY <= 900) {
        widget = 'Overview';
      } else if (event.pageY > 900 && event.pageY <= 1700) {
        widget = 'Related Products';
      } else {
        widget = 'Reviews and Ratings';
      }
      const body = {
        element: event.target.outerHTML,
        widget,
        time: moment().format(),
      };
      // axios.post('/interactions', body);
      // too many post requests on click will crash the app
      // probably need to store in windowLocal storage
    };
  });

  return (
    <div className="container">
      <nav className="nav-container">
        <div className="nav">
          <h1 className="logo">Falco</h1>
        </div>
        {/* <h1 className="logo">Logo</h1> */}
      </nav>
      <Overview getRouteData={getRouteData} productId={productId}/>
      <div className="related-items">
        <RelatedItems
          getRouteData={getRouteData}
          productId={productId}
          setProductId={setProductId}
        />
      </div>
      <div className="ratings-and-reviews">
        <Reviews grd={getRouteData} pid={productId} />
      </div>
    </div>
  );

}

export default App;

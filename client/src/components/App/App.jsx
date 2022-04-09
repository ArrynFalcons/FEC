/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
      axios.post('/interactions', body)
        .then((res) => {
          // don't want to let the client know we're tracking their clicks
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
  });

  // useEffect(() => {
  //   getRouteData('reviews', '', '', '', productId, 'meta')
  //     .then((data) => {
  //       const num = 1 * data.data.ratings['1'] + 2;
  //       const div = rating

  //     })
  //     .catch((err) => {
  //       console.log('Error retrieving reviews: ', err);
  //     });
  // }, []);

  return (
    <div className="container" title="container">
      <Overview getRouteData={getRouteData} productId={productId} />
      <div className="related-items">
        <RelatedItems
          getRouteData={getRouteData}
          productId={productId}
          setProductId={setProductId}
        />
      </div>
      {/* <div className="q-and-a">
        <Questions />
      </div> */}
      <div className="ratings-and-reviews">
        <Reviews grd={getRouteData} pid={productId} />
      </div>
    </div>
  );
}

export default App;

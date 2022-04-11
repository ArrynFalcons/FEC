/* eslint-disable*/
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    window.onclick = (event) => {
      // console.log(event.target);
    };
  });

  return (
    <div className="container" title="container">
      <Overview getRouteData={getRouteData} productId={productId}/>
      <div className="related-items">
        <RelatedItems
          getRouteData={getRouteData}
          productId={productId}
          setProductId={setProductId}
        />
      </div>
      <div className="ratings-and-reviews">
        <Reviews grd={getRouteData} productId={productId} />
      </div>
    </div>
  );

}

export default App;

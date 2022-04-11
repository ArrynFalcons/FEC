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
  // const [appView, setAppView] = useState('default');
  // const [imageUrl, setImageUrl] = useState('');
  // const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    window.onclick = (event) => {
      // console.log(event.target);
    };
  });

  // const handleMouseMove = (event) => {
  //   const view = document.querySelector('.expanded-view');
  //   view.style.backgroundPositionX = -event.nativeEvent.offsetX + 'px';
  //   view.style.backgroundPositionY = -event.nativeEvent.offsetY + 'px';
  // }

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

  // if (appView === 'default') {
  //   return (
  //     <div className="container" title="container">
  //       <Overview getRouteData={getRouteData} productId={productId} setAppView={setAppView} setImageUrl={setImageUrl}/>
  //       <div className="related-items">
  //         <RelatedItems
  //           getRouteData={getRouteData}
  //           productId={productId}
  //           setProductId={setProductId}
  //         />
  //       </div>
  //       <div className="ratings-and-reviews">
  //         <Reviews grd={getRouteData} productId={productId} />
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="carousel-container" onClick={() => setAppView('default')} onMouseMove={(event) => handleMouseMove(event)}>
  //       <div className="expanded-view"
  //         style={{
  //           backgroundImage: `url(${imageUrl})`,
  //           width: 800,
  //           height: 800
  //         }}>
  //       </div>
  //       <button className="exit-button" onClick={() => setAppView('default')}>X</button>
  //     </div>
  //   );
  // }
}

export default App;

import React, { useState, useEffect } from 'react';
import Overview from './Overview.jsx';
import Questions from './Questions.jsx';
import RelatedItems from './RelatedItems.jsx';
import Reviews from './Reviews.jsx';
import axios from 'axios';

const App = (props) => {

  return (
    <div className="container">
      <div className="overview">
        <Overview/>
      </div>
      <div className="related-items">
        <RelatedItems/>
      </div>
      <div className="q-and-a">
        <Questions/>
      </div>
      <div className="ratings-and-reviews">
        <Reviews/>
      </div>
    </div>
  );

};

export default App;
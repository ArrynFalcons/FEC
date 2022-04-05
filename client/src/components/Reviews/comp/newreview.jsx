/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewReview(props) {
  const [reviewstate, setreviewstate] = useState(false);
  const [reviewtext, setreviewtext] = useState('');
  const openReviewBox = () => {
    setreviewstate(true);
  };

  return (reviewstate ? (
    <div>
      <input type="text" placeholder="Name" />
      <div>
        Please rate out of 5 stars:
        <img src="https://wpmediastorage.blob.core.windows.net/grabcaruber/2017/05/5-stars-rating.png" width="100" alt="placeholderstars" />
      </div>
      <div>
        Do you recommend this product?
        <button type="submit">
          Yes
        </button>
        <button type="submit">
          No
        </button>
      </div>
      <textarea rows="5" cols="80" onChange={() => {}} placeholder="Write your review here" />
      <textarea rows="2" cols="80" placeholder="Add three comma separated URLs to include images" />
      <button type="submit">Submit</button>
    </div>
  )
    : (
      <div className="new-review">
        <button type="submit" onClick={() => { openReviewBox(); }}>Leave a New Review</button>
      </div>
    )
  );
}

export default NewReview;

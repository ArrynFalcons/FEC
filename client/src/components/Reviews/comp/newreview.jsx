/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewReview(props) {
  return (
    <div className="new-review">FILLMEIN Conditional rendering of NewReview
      <input type="text" placeholder="Leave a New Review"></input>
      <button>Submit Review</button>
    </div>
  );
}

export default NewReview;
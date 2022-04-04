/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
moment().format();

function ReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const { grd } = props;
  useEffect(() => {
    grd('reviews', 1, 10, '', '65651', '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        console.log('Data ', data.data.results)
        setReviews(data.data.results)
        console.log('State "reviews" updated to: ', reviews)
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err)
      });
  }, []);

  return (
    <div>
      <label for="reviewlist">Sort by:</label>
      <select id="reviewlist">
        <option value="relevance" onChange={() => {alert('DISABLED')}}>Relevance</option>
        <option value="highest" onChange={() => {alert('DISABLED')}}>Highest</option>
        <option value="lowest" onChange={() => {alert('DISABLED')}}>Lowest</option>
      </select>

      <ul>
        {reviews.map((review) => (
            <li key={review.reviewer_name}>
              <div className = "tile">
                <img src="https://wpmediastorage.blob.core.windows.net/grabcaruber/2017/05/5-stars-rating.png" width = "100" alt="placeholderstars"/>
                <div>
                  Rating: {review.rating}
                </div>
                <div>
                  Name: {review.reviewer_name}
                </div>
                <div>
                  Left from: {moment(review.date).format('MMMM Do YYYY')}
                </div>
                <div>
                  {review.body}
                </div>
                <div>
                  Recommend? FILL_ME_IN
                </div>
                <div>
                  {review.photos.map((photo)=>
                    <img src={`${photo.url}`} alt="reviewimages" width="200"/>
                  )}

                </div>
                <input type="text" placeholder="Leave a comment"></input>
                <button onClick={() => {alert('DISABLED')}}>Comment</button>
              </div>
            </li>
        ),
        )}
      </ul>
      <button onClick={()=>{alert('DISABLED')}}>Show More Reviews</button>
    </div>
  );
}

export default ReviewList;
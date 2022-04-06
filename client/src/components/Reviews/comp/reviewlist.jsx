/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
moment().format();

function ReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const { grd } = props;
  const pagination = (page) => {
    grd('reviews', page, 5, '', '65635', '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        //console.log('Data ', data.data.results);
        setReviews(data.data.results);
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err);
      });
  }
  useEffect(() => {
    pagination(1);
  }, []);

  return (
    <div className="review-list">
      <label>Sort by:</label>
      <select id="reviewlist">
        <option value="relevance" onChange={() => {alert('DISABLED')}}>Relevance</option>
        <option value="highest" onChange={() => {alert('DISABLED')}}>Highest</option>
        <option value="lowest" onChange={() => {alert('DISABLED')}}>Lowest</option>
      </select>

      <ul>
        {reviews.map((review) => (
          <li key={`${review.reviewer_name}1`}>
            <div className="tile">
              <img src="https://wpmediastorage.blob.core.windows.net/grabcaruber/2017/05/5-stars-rating.png" width="100" alt="placeholderstars" />
              <div>
                Rating: {review.rating}
              </div>
              <div>
                Name: {review.reviewer_name}
              </div>
              <div>
                Reviewed on: {moment(review.date).format('MMMM Do YYYY')}
              </div>
              <div className="reviewbody">
                {review.body}
              </div>
              {/* <style dangerouslySetInnerHTML={{_html: `.reviewbody {color:blue}`}}/> */}
              <div className="inline-block">
                {review.photos.map((photo)=>
                  <img src={`${photo.url}`} value={photo.url} style={{display: 'inline-block'}} className="zoom"
                  onMouseOver={e=>console.log(e.target.currentSrc)}
                  // onMouseOut={e=>console.log(e.target.currentSrc)}
                  alt="reviewimages" height="200" width="200"/>
                )}
              </div>
              <div style={{color: 'blue'}}>
                Recommend?
                {review.recommend ? 'Yes' : 'No'}
              </div>
              <div>
                {review.helpfulness}
                people found this review helpful.
              </div>
            </div>
          </li>
        ),
        )}
      </ul>
      <div>
        <button onClick={()=>{pagination(1)}}>1</button>
        <button onClick={()=>{pagination(2)}}>2</button>
        <button onClick={()=>{pagination(3)}}>3</button>
        <button onClick={()=>{pagination(4)}}>4</button>
        <button onClick={()=>{pagination(5)}}>5</button>
        <button onClick={()=>{pagination(6)}}>6</button>
        <button onClick={()=>{pagination(7)}}>7</button>
      </div>
    </div>
  );
}

export default ReviewList;
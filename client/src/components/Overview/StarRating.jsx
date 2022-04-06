/* eslint-disable */
import React, { useState, useEffect } from 'react';

const StarRating = (props) => {

  const [rating, setRating] = useState(0);
  const [fullStars, setFullStars] = useState(0);
  const [partialStar, setPartialStar] = useState(0);
  const [emptyStars, setEmptyStars] = useState(0);

  useEffect(() => {
    props.getRouteData('reviews', '', '', '', '65635', 'meta')
      .then((res) => {
        let rating = 0;
        let total = 0;
        for (let key in res.data.ratings) {
          rating += (key * Number(res.data.ratings[key]));
          total += Number(res.data.ratings[key]);
        }
        let ratingAvg = rating / total;
        setRating(ratingAvg);
        setFullStars(rating => Math.floor(rating));
      })
      .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    setFullStars(Math.floor(rating));
    setPartialStar(rating - Math.floor(rating));
    setEmptyStars(5 - Math.ceil(rating));
  }, [rating])

  const renderStars = (rating) => {
    if (fullStars > 0) {
      //console.log(fullStars)
      setFullStars(fullStars - 1);
      return <h1>full</h1>
    }
  }

  return rating > 0 ? (
    <div className="star-rating">
      <div className="star-1">
        {renderStars()}
      </div>
      <div className="star-2">
        {renderStars()}
      </div>
      <div className="star-3">
        {renderStars()}
      </div>
      <div className="star-4">
        {renderStars()}
      </div>
      <div className="star-5">
        {renderStars()}
      </div>
    </div>
  ) : null ;
};

export default StarRating;
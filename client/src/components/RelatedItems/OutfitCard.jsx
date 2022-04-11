/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal.jsx';

function OutfitCard({ product, setOutfits, getRouteData, dispatch, start }) {
  const [photo, setPhoto] = useState([]);
  const [sale, setSale] = useState(null);
  const [avgReview, setReview] = useState(null);

  useEffect(() => {
    getRouteData('products', 1, 5, '', product.id, 'styles')
      .then((data) => {
        setPhoto(data.data.results[0].photos[0].thumbnail_url);
        setSale(data.data.results[0].sale_price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getRouteData('reviews', '', '', '', product.id, 'meta')
      .then((reviews) => {
        if (Object.keys(reviews.data.ratings).length) {
          let total = 0;
          let totalReviews = 0;
          for (let i = 0; i < Object.keys(reviews.data.ratings).length; i += 1) {
            // eslint-disable-next-line max-len
            total += (Number(Object.keys(reviews.data.ratings)[i]) * Number(Object.values(reviews.data.ratings)[i]));
            totalReviews += Number(Object.values(reviews.data.ratings)[i]);
          }
          setReview(Math.round(10 * (total / totalReviews)) / 10);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteFromLocalStorage = (deletedProduct) => {
    const updatedStorage = JSON.parse(localStorage.getItem('addedProducts')).filter((item) => {
      if (item.id !== deletedProduct.id) {
        return item;
      }
    });
    localStorage.setItem('addedProducts', JSON.stringify(updatedStorage));
    setOutfits(JSON.parse(localStorage.getItem('addedProducts')));
    updatedStorage.length >= 2 && start !== 0 ? dispatch({ type: 'previous' }) : null;
  };

  return (
    <div>
      <div className="productCard">
        <h2 className="cardIcon overlay" onClick={() => { deleteFromLocalStorage(product); }}>x</h2>
        <img className="thumbnail" src={photo} alt="stock clothing item" />
        <span>{product.category}</span>
        <span>{product.name}</span>
        {sale ? (
          <span>
            <span style={{ textDecoration: 'line-through', color: 'gray' }}>{`$${product.default_price}`}</span>
            <span style={{ color: 'red' }}>{`$${sale}`}</span>
          </span>
        ) : (
          <span>{`$${product.default_price}`}</span>
        )}
        <span className="product-stars" style={{ '--rating': `${avgReview}` }}>
          {avgReview ? `${avgReview}/5` : null}
        </span>
      </div>
    </div>
  );
}

export default OutfitCard;

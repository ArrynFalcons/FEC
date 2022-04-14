/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal.jsx';

function OutfitCard({ product, setOutfits, getRouteData, dispatch, start, currentStyle }) {
  const [photo, setPhoto] = useState([]);
  const [sale, setSale] = useState(null);
  const [avgReview, setReview] = useState(null);

  useEffect(() => {
    const backupPhoto = 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

    product.style.photos[0].thumbnail_url ? (
      setPhoto(product.style.photos[0].thumbnail_url)
    ) : (setPhoto(backupPhoto));
    setSale(product.style.sale_price);
  }, [currentStyle]);

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
        <div className="card-contents">
          <span>{product.category}</span>
          <span>{product.style.name}</span>
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
    </div>
  );
}

export default OutfitCard;

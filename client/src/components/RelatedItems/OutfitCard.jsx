/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal.jsx';

function OutfitCard({ product, setOutfits, getRouteData }) {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    getRouteData('products', 1, 5, '', product.id, 'styles')
      .then((data) => {
        setPhoto(data.data.results[0].photos[0].thumbnail_url);
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
  };

  return (
    <div>
      <div className="productCard">
        <h2 className="top-right" onClick={() => { deleteFromLocalStorage(product); }}>x</h2>
        <img className="thumbnail" src={photo} alt="stock clothing item" />
        <span>{product.category}</span>
        <span>{product.name}</span>
        <span>{`$${product.default_price}`}</span>
        {/* {product.rating} */}
      </div>
    </div>
  );
}

export default OutfitCard;

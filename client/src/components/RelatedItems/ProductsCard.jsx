/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal.jsx';

function ProductsCard({ product, featuredProduct, getRouteData }) {
  const [photo, setPhoto] = useState([]);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    getRouteData('products', 1, 5, '', product.id, 'styles')
      .then((data) => {
        setPhoto(data.data.results[0].photos[0].thumbnail_url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {showModal ? (
        <ComparisonModal featuredProduct={featuredProduct} product={product} />
      ) : null}
      <div className="productCard">
        <h1 className="top-right" onClick={() => setModal(!showModal)}>*</h1>
        <img className="thumbnail" src={photo} alt="stock clothing item" />
        <span>{product.category}</span>
        <span>{product.name}</span>
        <span>{`$${product.default_price}`}</span>
        {/* {product.rating} */}
      </div>
    </div>
  );
}

export default ProductsCard;

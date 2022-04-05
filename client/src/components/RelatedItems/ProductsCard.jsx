/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function ProductsCard({ product, featuredProduct, getRouteData }) {
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
  return (
    <div className="productCard">
      <h1 className="top-right">*</h1>
      <img className="thumbnail" src={photo} alt="stock clothing item" />
      <span>{product.category}</span>
      <span>{product.name}</span>
      <span>{`$${product.default_price}`}</span>
      {/* {product.rating} */}
    </div>
  );
}

export default ProductsCard;

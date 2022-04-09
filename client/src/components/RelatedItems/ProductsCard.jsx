/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal.jsx';

function ProductsCard({ product, featuredProduct, getRouteData, setProductId }) {
  const [photo, setPhoto] = useState([]);
  const [showModal, setModal] = useState(false);
  const [sale, setSale] = useState(null);

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

  const sendToGallery = (sentProduct) => {
    // sends product to gallery for display on click
    setProductId(sentProduct.id);
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-card-container">
      {showModal ? (
        <ComparisonModal featuredProduct={featuredProduct} product={product} setModal={setModal} />
      ) : null}
      <div className="overlay">
        <h2 className="cardIcon overlay" onClick={() => { setModal(!showModal); }}>★</h2>
        <div className="productCard " onClick={() => { sendToGallery(product) }}>
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
          {/* {product.rating} */}
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;

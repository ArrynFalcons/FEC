/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
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
  const [avgReview, setReview] = useState(null);
  const backupPhoto = 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

  useEffect(() => {
    getRouteData('products', 1, 5, '', product.id, 'styles')
      .then((data) => {
        data.data.results[0].photos[0].thumbnail_url ? (
          setPhoto(data.data.results[0].photos[0].thumbnail_url)
        ) : (setPhoto(backupPhoto));
        setSale(data.data.results[0].sale_price);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setSale(null);
      setPhoto([]);
    };
  }, [product]);

  useEffect(() => {
    getRouteData('reviews', '', '', '', product.id, 'meta')
      .then((reviews) => {
        if (Object.keys(reviews.data.ratings).length) {
          let total = 0;
          let totalReviews = 0;
          for (let i = 0; i < Object.keys(reviews.data.ratings).length; i += 1) {
            total += (Number(Object.keys(reviews.data.ratings)[i]) * Number(Object.values(reviews.data.ratings)[i]));
            totalReviews += Number(Object.values(reviews.data.ratings)[i]);
          }
          setReview(Math.round(10 * (total / totalReviews)) / 10);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => { setReview(null); };
  }, [product]);

  const sendToGallery = (sentProduct) => {
    // sends product to gallery for display on click
    setProductId(sentProduct.id);
    window.scrollTo(0, 0);
  };

  const stopScroll = () => {
    showModal ? document.body.classList.remove('stop-scroll')
      : document.body.classList.add('stop-scroll');
  };

  return (
    <div className="product-card-container">
      {showModal ? (
        <ComparisonModal
          featuredProduct={featuredProduct}
          product={product}
          setModal={setModal}
          stopScroll={stopScroll}
        />
      ) : null}
      <div className="overlay">
        <h2 className="cardIcon overlay" onClick={() => { setModal(!showModal); stopScroll(); }}>★</h2>
        <div className="productCard " onClick={() => { sendToGallery(product); }}>
          <img className="thumbnail" src={photo} alt="stock clothing item" />
          <div className="product-card-contents">
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
      </div>
    </div>
  );
}

export default ProductsCard;

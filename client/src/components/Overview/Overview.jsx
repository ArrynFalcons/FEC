/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Gallery from './Gallery/Gallery.jsx';
import Description from './Description/Description.jsx';
import Features from './Description/Features.jsx';
import Cart from './Cart/Cart.jsx';
import Styles from './Styles/Styles.jsx';

function Overview({ productId, getRouteData, setCurrentStyle }) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState({});
  const [isExpandedView, setExpandedView] = useState(false);
  const [avgReview, setAvgReview ] = useState(0);

  useEffect(() => {
    getRouteData('reviews', '', '', '', productId, 'meta')
      .then((reviews) => {
        if (Object.keys(reviews.data.ratings).length) {
          let total = 0;
          let totalReviews = 0;
          for (let i = 0; i < Object.keys(reviews.data.ratings).length; i += 1) {
            total += (Number(Object.keys(reviews.data.ratings)[i]) * Number(Object.values(reviews.data.ratings)[i]));
            totalReviews += Number(Object.values(reviews.data.ratings)[i]);
          }
          setAvgReview(Math.round(10 * (total / totalReviews)) / 10);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [productId]);

  useEffect(() => {
    getRouteData('products', 1, 1, '', productId, '')
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
    getRouteData('products', '', '', '', productId, 'styles')
      .then((res) => {
        setStyles(res.data.results);
        setStyle(res.data.results[0]);
        setCurrentStyle(res.data.results[0]);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const getSkus = (style) => {
    const skus = [];
      for (let sku in style.skus) {
        if (style.skus[sku].quantity > 0) {
          skus.push(style.skus[sku]);
        }
      }
    return skus;
  }

  return isExpandedView
    ? (
      <div className="overview">
        <Gallery style={style} isExpandedView={isExpandedView} setExpandedView={setExpandedView}/>
        <Description product={product} />
        <Features product={product}/>
      </div>
    )
    : (
      <div className="overview">
        <Gallery style={style} isExpandedView={isExpandedView} setExpandedView={setExpandedView}/>
        <div className="main">
          <div className="category-stars-container">
            <h2 className="product-category">{product.category}</h2>
            <div className="star-container">
              <span className="product-overview-stars Stars" style={{ '--rating': `${avgReview}` }}>
                {avgReview ? `${avgReview}` : null}
              </span>
            </div>
          </div>
          <h1 className="product-title">{product.name}</h1>
          <Styles styles={styles} style={style} setStyle={setStyle} setCurrentStyle={setCurrentStyle}/>
          <Cart style={style} skus={getSkus(style)}/>
        </div>
        <Description product={product}/>
        <Features product={product}/>
      </div>
    )
}

export default Overview;

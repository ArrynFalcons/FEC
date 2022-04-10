/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Gallery from './Gallery/Gallery.jsx';
import Description from './Description/Description.jsx';
import Features from './Description/Features.jsx';
import Cart from './Cart/Cart.jsx';
import Styles from './Styles/Styles.jsx';

function getSkus(style) {
  const skus = [];
    for (let sku in style.skus) {
      if (style.skus[sku].quantity > 0) {
        skus.push(style.skus[sku]);
      }
    }
  return skus;
}

function Overview({productId, getRouteData, setAppView, setImageUrl}) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState({});

  //test id 65722
  //default id 65635
  //65632
  useEffect(() => {
    getRouteData('products', 1, 1, '', productId, '')
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
    getRouteData('products', '', '', '', productId, 'styles')
      .then((res) => {
        setStyles(res.data.results);
        setStyle(res.data.results[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //conditional rendering for loading
  return (
    <div className="overview">
      <Gallery style={style} setAppView={setAppView} setImageUrl={setImageUrl}/>
      <div className="main">
        <h2 className="product-category">{product.category}</h2>
        <h1 className="product-title">{product.name}</h1>
        <Styles styles={styles} style={style} setStyle={setStyle}/>
        <Cart style={style} skus={getSkus(style)}/>
      </div>
      <Description product={product} />
      <Features product={product}/>
    </div>
  );
}

export default Overview;

/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Gallery from './Gallery.jsx';
import Description from './Description.jsx';
import Cart from './Cart.jsx';
import Styles from './Styles.jsx';

function Overview(props) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState({});

  //test id 65722
  useEffect(() => {
    props.getRouteData('products', 1, 1, '', '65635', '')
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
    props.getRouteData('products', '', '', '', '65635', 'styles')
      .then((res) => {
        setStyles(res.data.results);
        setStyle(res.data.results[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //conditional rendering for loading
  return (
    <div className="overview">
      <Gallery />
      <div className="main">
        <h3 className="product-category">{product.category}</h3>
        <h1 className="product-title">{product.name}</h1>
        <Styles styles={styles} style={style} setStyle={setStyle}/>
        <Cart />
      </div>
      <Description product={product} />
    </div>
  );
}

export default Overview;

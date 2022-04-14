/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import Outfit from './Outfit.jsx';

// const getRouteData = (route, page, count, sort, Id, endParam)
function RelatedItems({ getRouteData, productId, setProductId, currentStyle }) {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(65635);

  useEffect(() => {
    setCurrentProduct(productId);
  }, [productId]);

  useEffect(() => {
    getRouteData('products', 1, 10, '', currentProduct, 'related')
      .then((data) => {
        const checkDuplicates = [];
        data.data.forEach((id) => {
          if (!checkDuplicates.includes(id) && id !== productId) {
            checkDuplicates.push(id);
          }
        });
        const container = checkDuplicates.map((relatedId) => getRouteData('products', 1, 10, '', relatedId, '').then((res) => res.data));
        Promise.all(container)
          .then((related) => setProducts(related));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentProduct]);

  return (
    <>
      <RelatedProductsList
        products={products}
        currentProduct={currentProduct}
        setProductId={setProductId}
        getRouteData={getRouteData}
      />
      <div style={{ paddingTop: '25px' }}>
        <Outfit
          currentProduct={currentProduct}
          currentStyle={currentStyle}
          getRouteData={getRouteData}
        />
      </div>
    </>
  );
}

export default RelatedItems;

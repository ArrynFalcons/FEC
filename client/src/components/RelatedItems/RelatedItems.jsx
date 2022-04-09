/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import Outfit from './Outfit.jsx';

// const getRouteData = (route, page, count, sort, Id, endParam)
function RelatedItems({ getRouteData, productId, setProductId }) {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState(65635);
  const [currentProduct, setCurrentProduct] = useState(productId);

  useEffect(() => {
    getRouteData('products', 1, 10, '', 65635, 'related')
      .then((data) => {
        // slice off duplicate
        const container = data.data.slice(1).map((relatedId) => getRouteData('products', 1, 10, '', relatedId, '').then((res) => res.data));
        Promise.all(container)
          .then((related) => setProducts(related));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCurrentProduct(productId);
  }, [productId]);

  return (
    <>
      <RelatedProductsList
        products={products}
        featured={featured}
        setProductId={setProductId}
        getRouteData={getRouteData}
      />
      <Outfit
        currentProduct={currentProduct}
        getRouteData={getRouteData}
      />
    </>
  );
}

export default RelatedItems;

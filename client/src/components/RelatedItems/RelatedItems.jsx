/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';

// const getRouteData = (route, page, count, sort, Id, endParam)
function RelatedItems({ getRouteData }) {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState(65651);

  useEffect(() => {
    getRouteData('products', 1, 10, '', 65651, 'related')
      .then((data) => {
        const container = data.data.map((relatedId) => getRouteData('products', 1, 10, '', relatedId, '').then((res) => res.data));
        Promise.all(container)
          .then((related) => setProducts(related));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <RelatedProductsList
      products={products}
      featured={featured}
      getRouteData={getRouteData}
    />
  );
}

export default RelatedItems;

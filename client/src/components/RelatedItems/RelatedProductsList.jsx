/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import ProductsCard from './ProductsCard.jsx';

function reducer(state, action) {
  switch (action.type) {
    case 'next':
      return { next: state.next + 1, start: state.start + 1 };
    case 'previous':
      return { next: state.next - 1, start: state.start - 1 };
    default:
      throw new Error();
  }
}
function RelatedProductsList({ products, featured, getRouteData }) {
  const [state, dispatch] = useReducer(reducer, { start: 0, next: 3 });

  // useEffect(() => {
  //   getRouteData('products', 1, 10, '', featured, '')
  //     .then((data) => {
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div>
      RELATED PRODUCTS
      <div className="relatedProducts">
        {state.start === 0 ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'previous' }); }}>{'<'}</button>)}

        {products.slice(state.start, state.next).map((product) =>
          <ProductsCard product={product} key={product.id} featured={featured} />)}

        {state.next === products.length ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'next' }); }}>{'>'}</button>)}
      </div>
    </div>
  );
}

export default RelatedProductsList;

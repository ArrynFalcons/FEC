import React, { useState, useReducer } from 'react';
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
function RelatedProductsList({ products }) {
  const [state, dispatch] = useReducer(reducer, { start: 0, next: 3 });
  return (
    <div>
      RELATED PRODUCTS
      <div className="relatedProducts">
        {state.start === 0 ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'previous' }); }}>{'<'}</button>)}

        {products.slice(state.start, state.next).map((product) =>
          <ProductsCard product={product} key={product.id} />)}

        {state.next === products.length ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'next' }); }}>{'>'}</button>)}
      </div>
    </div>
  );
}

export default RelatedProductsList;

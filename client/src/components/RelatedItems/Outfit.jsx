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
function outfit({ products, featured, getRouteData }) {
  const [state, dispatch] = useReducer(reducer, { start: 0, next: 3 });
  const [featuredProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    getRouteData('products', 1, 1, '', featured, '')
      .then((data) => {
        setFeaturedProduct(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      YOUR OUTFIT
      <div className="relatedProducts">
        {state.start === 0 ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'previous' }); }}>{'<'}</button>)}

        {products.slice(state.start, state.next).map((product) => (
          <ProductsCard
            product={product}
            key={product.id}
            featuredProduct={featuredProduct}
            getRouteData={getRouteData}
          />
        ))}

        {state.next === products.length ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'next' }); }}>{'>'}</button>)}
      </div>
    </div>
  );
}

export default outfit;

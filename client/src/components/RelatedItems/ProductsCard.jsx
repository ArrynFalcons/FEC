import React, { useState, useEffect } from 'react';

function ProductsCard({ product }) {

  return (
    <div className="productCard">
      <span>{product.category}</span>
      <span>{product.name}</span>
      <span>{`$${product.default_price}`}</span>
      {/* {product.rating} */}
    </div>
  );
}

export default ProductsCard;

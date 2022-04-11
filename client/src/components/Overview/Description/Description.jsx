/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Description({ product }) {
  return (
    <div className="description">
      <h3 className="product-slogan"><i>{product.slogan}</i></h3>
      <p className="product-description">{product.description ? product.description : null}</p>
    </div>
  );
}

export default Description;

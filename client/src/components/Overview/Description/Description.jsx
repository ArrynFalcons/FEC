/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Description(props) {
  return (
    <div className="description">
      <h3 className="product-slogan"><i>{props.product.slogan}</i></h3>
      <p className="product-description">{props.product.description ? props.product.description : null}</p>
    </div>
  );
}

export default Description;

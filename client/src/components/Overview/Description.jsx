/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Description(props) {
  return (
    <div className="description">
      <p className="product-slogan">{props.product.slogan}</p>
      <p className="product-description">{props.product.description ? props.product.description : null}</p>
      <ul className="feature-list">
        {props.product.features ?
          props.product.features.map((feature) => (
            <li className="feature" key={feature.feature}>
              <span className="feature-name">{feature.feature}</span>
              <span className="feature-value">{feature.value}</span>
            </li>
          ))
          : null
        }
      </ul>
    </div>
  );
}

export default Description;

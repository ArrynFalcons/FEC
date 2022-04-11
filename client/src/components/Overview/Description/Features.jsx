/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Features({ product }) {

  return (
    <div className="features-container">
      <ul className="feature-list">
        {product.features ?
          product.features.map((feature) => (
            <li className="feature" key={feature.feature}>
              <span className="feature-name">{feature.feature}: </span>
              <span className="feature-value">{feature.value}</span>
            </li>
          ))
          : null
        }
      </ul>
    </div>
  );
}

export default Features;
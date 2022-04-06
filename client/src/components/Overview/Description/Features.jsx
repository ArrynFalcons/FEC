/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Features(props) {

  return (
    <div className="features">
      <ul className="feature-list">
        {props.product.features ?
          props.product.features.map((feature) => (
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
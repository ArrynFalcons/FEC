/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function ComparisonModal({ featuredProduct, product }) {
  const container = [];
  const features = [...featuredProduct.features, ...product.features].filter((feature)=> {
    if (!container.includes(feature.value)) {
      container.push(feature.value);
      return feature;
    }
  });

  return (
    <div className="comparisonModal">
      <pre>{`${featuredProduct.name} characteristics ${product.name}`}</pre>
      {features.map((feature) => (
        <pre>
          {featuredProduct.features.includes(feature) ? '√' : null}

          {`${feature.feature}: ${feature.value}`}

          {product.features.filter((e) => {
            if (e.value === feature.value) {
              return e;
            }
          }).length ? '√' : null}
        </pre>
      ))}
    </div>
  );
}

export default ComparisonModal;

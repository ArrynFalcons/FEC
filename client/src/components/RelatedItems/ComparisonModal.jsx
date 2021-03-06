/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function ComparisonModal({ featuredProduct, product, setModal, stopScroll }) {
  const container = [];
  const features = [...featuredProduct.features, ...product.features].filter((feature) => {
    if (!container.includes(feature.value)) {
      container.push(feature.value);
      return feature;
    }
  });

  return (
    <div className="comparisonModal overlay" onClick={ () => {
        setModal(false);
        stopScroll();
      }
    }>
      <pre>
        <h4 className="modalContentLeft">{`${featuredProduct.name}`}</h4>
        <h4 className="modalContentRight">{`${product.name}`}</h4>
      </pre>
      <h5>characteristics</h5>
      <div className="features">
        {features.map((feature) => (
          <pre key={feature.feature}>
            <span className="modalContentLeft">{featuredProduct.features.includes(feature) ? '√' : null}</span>
            <span>{`${feature.feature}: ${feature.value}`}</span>
            <span className="modalContentRight">
              {product.features.filter((e) => {
                if (e.value === feature.value) {
                  return e;
                }
              }).length ? '√' : null}
            </span>
          </pre>
        ))}
      </div>
    </div>
  );
}

export default ComparisonModal;

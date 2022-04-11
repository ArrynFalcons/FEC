/* eslint-disable */
import React, { useState, useEffect } from 'react';

function SizeSelector({ skus, size, setSize }) {

  return skus.length === 0
    ? (
      <div className="size-selector">
        <select className="size-dropdown" value={size} disabled>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
    )
    : (
      <div className="size-selector">
        <select className="size-dropdown" required value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="" selected>Select Size</option>
          {skus.map((sku, i) => <option value={sku.size} key={i}>{sku.size}</option>)}
        </select>
      </div>
    )

}
export default SizeSelector;
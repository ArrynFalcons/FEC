/* eslint-disable */
import React, { useState, useEffect, forwardRef } from 'react';

const SizeSelector = forwardRef(({ skus, size, setSize }, ref) => {

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
        <select className="size-dropdown" value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="select" >Select Size</option>
          {skus.map((sku, i) => <option value={sku.size} key={i}>{sku.size}</option>)}
        </select>
        <div className="select-size-message" hidden ref={ref}>
            Please select a size.
        </div>
      </div>
    )

});
export default SizeSelector;
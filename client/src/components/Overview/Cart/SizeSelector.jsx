/* eslint-disable */
import React, { useState, useEffect } from 'react';

function SizeSelector(props) {

  return props.skus.length === 0
    ? (
      <div className="size-selector">
        <select value={props.size} disabled>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
    )
    : (
      <div className="size-selector">
        <select required value={props.size} onChange={(e) => props.setSize(e.target.value)}>
          <option value="" selected hidden>Select Size</option>
          {props.skus.map((sku, i) => <option value={sku.size} key={i}>{sku.size}</option>)}
        </select>
      </div>
    )

}
export default SizeSelector;
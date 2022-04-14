/* eslint-disable */
import React, { useState, useEffect } from 'react';

const QuantitySelector = ({ sku, size, setQuantity }) => {

  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const quantArr = [];
    for (let i = 1; i <= sku.quantity; i++) {
      if (i > 15) {
        break;
      }
      quantArr.push(i);
    }
    setQuantities(quantArr);
  }, [sku])

  return Object.keys(sku).length > 0
    ? (
      <div className="quantity-selector">
        <select className="quantity-dropdown" name="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value)}>
          {quantities.map((quantity, i) => <option value={quantity} key={i}>{quantity}</option>)}
        </select>
      </div>
    )
    : (
      <div className="quantity-selector">
        <select className="quantity-dropdown" name="quantity" id="quantity" disabled>
          <option value="-">Qty</option>
        </select>
      </div>
    )

}

export default QuantitySelector;
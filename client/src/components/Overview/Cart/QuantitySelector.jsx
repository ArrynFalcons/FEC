/* eslint-disable */
import React, { useState, useEffect } from 'react';

function QuantitySelector(props) {

  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const quantArr = [];
    for (let i = 1; i <= props.sku.quantity; i++) {
      if (i > 15) {
        break;
      }
      quantArr.push(i);
    }
    setQuantities(quantArr);
  }, [props.sku])

  return Object.keys(props.sku).length > 0
    ? (
      <div className="quantity-selector">
        <select name="quantity" id="quantity" onChange={(event) => props.setQuantity(event.target.value)}>
          {quantities.map((quantity, i) => <option value={quantity} key={i}>{quantity}</option>)}
        </select>
      </div>
    )
    : (
      <div className="quantity-selector">
        <select name="quantity" id="quantity" disabled>
          <option value="-">-</option>
        </select>
      </div>
    )

}

export default QuantitySelector;
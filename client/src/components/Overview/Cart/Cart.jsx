/* eslint-disable */
import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import AddToCart from './AddToCart.jsx';

function Cart(props) {

  const [skus, setSkus] = useState([]);
  const [size, setSize] = useState('');
  const [sku, setSku] = useState({});
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    const skuArr = [];
    for (let sku in props.style.skus) {
      if (props.style.skus[sku].quantity > 0) {
        skuArr.push(props.style.skus[sku]);
      }
    }
    setSkus(skuArr);
  }, [props.style])

  useEffect(() => {
    for (let sku in props.style.skus) {
      if (props.style.skus[sku].size === size) {
        setSku(props.style.skus[sku]);
        break;
      }
    }
  }, [size])

  return (
    <div className="cart">
      <form>
        <SizeSelector skus={skus} size={size} setSize={setSize}/>
        <QuantitySelector skus={skus} sku={sku} setQuantity={setQuantity}/>
        <input type="submit" value="Add to Cart"/>
      </form>
    </div>
  );

}

export default Cart;

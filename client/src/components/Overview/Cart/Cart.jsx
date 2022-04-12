/* eslint-disable */
import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import axios from 'axios';

function Cart({ style, skus }) {

  // const {skus} = props;
  const [size, setSize] = useState('');
  const [sku, setSku] = useState({});
  const [skuId, setSkuId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    size.length > 0 ? setFilled(true) : setFilled(false);
    for (let sku in style.skus) {
      if (style.skus[sku].size === size) {
        setSku(style.skus[sku]);
        setSkuId(sku);
        break;
      }
    }
  }, [size])

  useEffect(() => {
    if (filled) {
      const toShake = document.querySelector(".cart-dropdowns");
      toShake.classList.remove("shake");
    }
  }, [filled])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filled) {
      const toShake = document.querySelector(".cart-dropdowns");
      toShake.classList.add("shake");
      return;
    }
    for (let i = 0; i < Number(quantity); i++) {
      axios.post('/cart', { sku_id: Number(skuId) })
        .then((res) => console.log('success posting'))
        .catch((err) => console.log(err));
    }
    //axios.get('/cart').then((res) => console.log('get successful on front end'))
  }

  return (
    <div className="cart">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="cart-dropdowns">
          <SizeSelector skus={skus} size={size} setSize={setSize}/>
          <QuantitySelector skus={skus} sku={sku} setQuantity={setQuantity}/>
        </div>
        <input className="add-to-cart" type="submit" value="Add to Bag"/>
      </form>
    </div>
  );

}

export default Cart;

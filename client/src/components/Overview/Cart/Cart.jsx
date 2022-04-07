/* eslint-disable */
import React, { useState, useEffect } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import axios from 'axios';

function Cart(props) {

  const [skus, setSkus] = useState([]);
  const [size, setSize] = useState('');
  const [sku, setSku] = useState({});
  const [skuId, setSkuId] = useState('');
  const [quantity, setQuantity] = useState('1');

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
        setSkuId(sku);
        break;
      }
    }
  }, [size])

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < Number(quantity); i++) {
      axios.post('/cart', { sku_id: Number(skuId) })
        .then((res) => console.log('success posting'))
        .catch((err) => console.log(err));
    }
    //axios.get('/cart').then((res) => console.log('get successful on front end'))
  }

  return (
    <div className="cart">
      <form onSubmit={(event) => handleSubmit(event)}>
        <SizeSelector skus={skus} size={size} setSize={setSize}/>
        <QuantitySelector skus={skus} sku={sku} setQuantity={setQuantity}/>
        <input type="submit" value="Add to Cart"/>
      </form>
    </div>
  );

}

export default Cart;

/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
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
  const toShake = useRef(null);
  const message = useRef(null);
  const cartAdd = useRef(null);

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
      toShake.current.classList.remove("shake");
      message.current.hidden = true;
    }
  }, [filled])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filled) {
      toShake.current.classList.add("shake");
      message.current.hidden = false;
      return;
    }
    for (let i = 0; i < Number(quantity); i++) {
      axios.post('/cart', { sku_id: Number(skuId) })
        .then((res) => console.log('success posting'))
        .catch((err) => console.log(err));
    }
    cartAdd.current.setAttribute("value", "Added to Bag");
    //axios.get('/cart').then((res) => console.log('get successful on front end'))
  }

  return (
    <div className="cart">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="cart-dropdowns" ref={toShake}>
          <SizeSelector skus={skus} size={size} setSize={setSize} ref={message}/>
          <QuantitySelector skus={skus} sku={sku} setQuantity={setQuantity}/>
        </div>
        <input className="add-to-cart" type="submit" value="Add to Bag" ref={cartAdd}/>
      </form>
    </div>
  );

}

export default Cart;

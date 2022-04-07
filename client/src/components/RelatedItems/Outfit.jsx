/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import OutfitCard from './OutfitCard.jsx';

function reducer(state, action) {
  switch (action.type) {
    case 'next':
      return { next: state.next + 1, start: state.start + 1 };
    case 'previous':
      return { next: state.next - 1, start: state.start - 1 };
    default:
      throw new Error();
  }
}
function outfit({ currentProduct, getRouteData }) {
  const [state, dispatch] = useReducer(reducer, { start: 0, next: 2 });
  const [outfits, setOutfits] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    getRouteData('products', 1, 1, '', currentProduct, '')
      .then((data) => {
        setAddedProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    JSON.parse(localStorage.getItem('addedProducts'))
      ? setOutfits(JSON.parse(localStorage.getItem('addedProducts'))) : null;
  }, [setOutfits]);

  const saveToLocalStorage = (addedProduct) => {
    if (!localStorage.getItem('addedProducts')) {
      localStorage.setItem('addedProducts', JSON.stringify([addedProduct]));
    }
    const storage = JSON.parse(localStorage.getItem('addedProducts'));
    const duplicate = storage.filter((product) => {
      if (product.id === addedProduct.id) {
        return addedProduct;
      }
    });
    duplicate.length ? null
      : (storage.push(addedProduct),
      localStorage.setItem('addedProducts', JSON.stringify(storage))
      );
    setOutfits(JSON.parse(localStorage.getItem('addedProducts')));
  };

  return (
    <div>
      YOUR OUTFIT
      <div className="relatedProducts">

        {state.start === 0 ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'previous' }); }}>{'<'}</button>)}

        <div className="staticCard">
          <h2 onClick={() => { saveToLocalStorage(addedProducts); }}>+</h2>
          <h2>Add to Outfit</h2>
        </div>

        {outfits.length ? outfits.slice(state.start, state.next).map((product) => (
          <OutfitCard
            product={product}
            key={product.id}
            setOutfits={setOutfits}
            getRouteData={getRouteData}
          />
        )) : null}

        {state.next === outfits.length ? null : (
          <button type="submit" onClick={() => { dispatch({ type: 'next' }); }}>{'>'}</button>)}
      </div>
    </div>
  );
}

export default outfit;

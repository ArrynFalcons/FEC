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
function outfit({ currentProduct, getRouteData, currentStyle }) {
  const [state, dispatch] = useReducer(reducer, { start: 0, next: 4 });
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
  }, [currentProduct]);

  useEffect(() => {
    JSON.parse(localStorage.getItem('addedProducts'))
      ? setOutfits(JSON.parse(localStorage.getItem('addedProducts'))) : null;
  }, [setOutfits]);

  const saveToLocalStorage = (addedProduct) => {
    addedProduct.style = currentStyle;
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
      localStorage.setItem('addedProducts', JSON.stringify(storage)),
      storage.length > 4 ? dispatch({ type: 'next' }) : null
      );
    setOutfits(JSON.parse(localStorage.getItem('addedProducts')));
  };

  return (
    <div>
      <h1>YOUR CLOSET</h1>
      <div className="relatedProducts">

        {state.start === 0 ? null : (
          <h2 className="product-arrows" onClick={() => { dispatch({ type: 'previous' }); }}>◀︎</h2>)}

        <div className="staticCard">
          <h2 className="plus-sign" onClick={() => { saveToLocalStorage(addedProducts); }}>+</h2>
          <h2>Add to Outfit</h2>
        </div>

        {outfits.length ? outfits.slice(state.start, state.next).map((product) => (
          <OutfitCard
            key={product.id}
            product={product}
            currentStyle={currentStyle}
            dispatch={dispatch}
            setOutfits={setOutfits}
            getRouteData={getRouteData}
            start={state.start}
          />
        )) : null}

        {(state.next === outfits.length || outfits.length < 4) ? null : (
          <h2 className="product-arrows" onClick={() => { dispatch({ type: 'next' }); }}>►</h2>)}
      </div>
    </div>
  );
}

export default outfit;

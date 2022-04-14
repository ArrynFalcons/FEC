/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Arrows({ index, setIndex, length, page, setPage, setZoomedView }) {

  const handlePrev = (e) => {
    e.stopPropagation();
    setZoomedView(false);
    if (index === page * 6) {
      setPage(page - 1);
    }
    setIndex(index - 1);
  }

  const handleNext = (e) => {
    e.stopPropagation();
    setZoomedView(false);
    if (index === (page + 1) * 6 - 1) {
      setPage(page + 1);
    }
    setIndex(index + 1);
  }

  return (
    <div className="arrows">
      {index === 0
        ? <button className="prev" onClick={(e) => handlePrev(e)} disabled>&larr;</button>
        : <button className="prev" onClick={(e) => handlePrev(e)}>&larr;</button>
      }
      {index === length - 1
        ? <button className="next" onClick={(e) => handleNext(e)} disabled>&rarr;</button>
        : <button className="next" onClick={(e) => handleNext(e)}>&rarr;</button>
      }
    </div>
  );

}

export default Arrows;

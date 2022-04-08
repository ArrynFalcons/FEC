/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Arrows(props) {

  // const handleNext = () => {
  //   if (props.index === 4) {
  //     props.setIndex(0);
  //     props.setP
  //   }
  // }

  return (
    <div className="arrows carousel">
      {props.index === 0
        ? <button className="prev" onClick={() => props.setIndex(props.index - 1)} disabled>&larr;</button>
        : <button className="prev" onClick={() => props.setIndex(props.index - 1)}>&larr;</button>
      }
      {props.index === props.length - 1
        ? <button className="next" onClick={() => props.setIndex(props.index + 1)} disabled>&rarr;</button>
        : <button className="next" onClick={() => props.setIndex(props.index + 1)}>&rarr;</button>
      }
    </div>
  );

}

export default Arrows;

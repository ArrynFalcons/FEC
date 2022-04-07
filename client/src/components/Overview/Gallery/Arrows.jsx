/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Arrows(props) {

  // const [prevDisabled, setPrevDisabled] = useState(true);
  // const [nextDisabled, setNextDisabled] = useState(false);

  // if (props.index === 0) {
  //   setPrevDisabled(true);
  // } else if (props.index === props.length - 1) {
  //   setNextDisabled(true);
  // } else {
  //   setPrevDisabled(false);
  //   setNextDisabled(false);
  // }

  if (props.index === 0) {
    return (
      <div className="arrows">
        <button className="prev" onClick={() => props.setIndex(props.index - 1)} disabled>{'<'}</button>
        <button className="next" onClick={() => props.setIndex(props.index + 1)}>{'>'}</button>
      </div>
    )
  } else if (props.index === props.length - 1) {
    return (
      <div className="arrows">
        <button className="prev" onClick={() => props.setIndex(props.index - 1)}>{'<'}</button>
        <button className="next" onClick={() => props.setIndex(props.index + 1)} disabled>{'>'}</button>
      </div>
    )
  } else {
    return (
      <div className="arrows">
        <button className="prev" onClick={() => props.setIndex(props.index - 1)}>{'<'}</button>
        <button className="next" onClick={() => props.setIndex(props.index + 1)}>{'>'}</button>
      </div>
    )
  }

  // return (
  //   <div className="arrows">
  //     <button className="prev" onClick={() => props.setIndex(props.index + 1)} disabled={prevDisabled}>{'<'}</button>
  //     <button className="next" onClick={() => props.setIndex(props.index + 1)} disabled={nextDisabled}>{'>'}</button>
  //   </div>
  // );

}

export default Arrows;

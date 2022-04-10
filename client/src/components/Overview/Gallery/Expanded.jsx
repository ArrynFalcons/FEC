/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Expanded({image}) {

  // const handleMouseMove = (event) => {
  //   const view = document.querySelector('.expanded-view');
  //   console.log(view);
  // }

  return (
    <div className="expanded-view" style={{backgroundImage: `url(${image})`, width: 765, height: 600}}></div>
  );

}

export default Expanded;
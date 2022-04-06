/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Styles(props) {

  const handleStyleClick = (event) => {
    for (let style of props.styles) {
      if (style.style_id === Number(event.target.id)) {
        props.setStyle(style);
        break;
      }
    }
  }

  return (
    <div className="styles">
      {props.style.sale_price
        ? <p style={{color: "red"}}><s style={{color: "gray"}}>${props.style.original_price}</s>${props.style.sale_price}</p>
        : <p>${props.style.original_price}</p>}
      <p>STYLE {"<"} {props.style.name}</p>
      <div className="style-thumbnails">
        {props.styles.map((style) =>
          <div className="thumbnail-container" key={style.style_id}>
            <img className="style-thumbnail" id={style.style_id} src={style.photos[0].thumbnail_url} width="60" height="60" onClick={(event) => handleStyleClick(event)}/>
          </div>
        )}
      </div>
    </div>
  );

}

export default Styles;

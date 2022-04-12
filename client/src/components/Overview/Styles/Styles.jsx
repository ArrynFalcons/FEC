/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Styles({ styles, style, setStyle, setCurrentStyle }) {

  const handleStyleClick = (e) => {
    for (let style of styles) {
      if (style.style_id === Number(e.target.id)) {
        setStyle(style);
        setCurrentStyle(style);
        break;
      }
    }
  }

  return (
    <div className="styles">
      {style.sale_price
        ? <p style={{color: "red"}}><s style={{color: "gray"}}>${style.original_price}</s>${style.sale_price}</p>
        : <h2 className="style-price">${style.original_price}</h2>}
      <h3 className="style-name">STYLE {"<"} {style.name}</h3>
      <div className="style-thumbnails">
        {styles.map((style) =>
          <div className="style-thumbnail-container" key={style.style_id}>
            <img className="style-thumbnail" id={style.style_id} src={style.photos[0].thumbnail_url} width="60" height="60" onClick={(e) => handleStyleClick(e)}/>
          </div>
        )}
      </div>
    </div>
  );

}

export default Styles;

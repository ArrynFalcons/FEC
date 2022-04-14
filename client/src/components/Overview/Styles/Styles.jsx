/* eslint-disable */
import React, { useState, useEffect } from 'react';

function Styles({ styles, style, setStyle, setCurrentStyle }) {

  const [selected, setSelected] = useState(0);

  const handleStyleClick = (e, i) => {
    setSelected(i);
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
        ? <h2 className="style-price" style={{color: "red"}}><s style={{color: "gray"}}>${style.original_price}</s> ${style.sale_price}</h2>
        : <h2 className="style-price">${style.original_price}</h2>}
      <div className="style-name">
        <h3 className="style-name-label">STYLE {"<"}</h3>
        <h3 className="style-name-name">{style.name}</h3>
      </div>
      <div className="style-thumbnails">
        {styles.map((style, i) =>
          <div className="style-thumbnail-container" key={style.style_id}>
            <div className={i === selected ? "style-selected" : "style-unselected"}>
              <img className="style-thumbnail" id={style.style_id} src={style.photos[0].thumbnail_url} width="60" height="60" onClick={(e) => handleStyleClick(e, i)}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default Styles;

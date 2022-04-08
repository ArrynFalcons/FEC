/* eslint-disable */
import React, { useState, useEffect } from 'react';

const Thumbnails = (props) => {

  const [page, setPage] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const imagesCopy = props.images.slice();
    const thumbnailPages = [];
    while (imagesCopy.length > 0) {
      thumbnailPages.push(imagesCopy.splice(0, 6));
    }
    setThumbnails(thumbnailPages);
  }, [props.images]);

  // const handleSelected = (i) => {
  //   if (i === props.index && i === thumbnails[page].length - 1) {
  //     props.setSelected('last');
  //   } else if (i === 0) {
  //     props.setSelected('first');
  //   }
  //   else {
  //     props.setSelected('');
  //   }
  // }

  return thumbnails.length > 0 ? (
    <div className="gallery-thumbnails">
      {page === 0
        ? <button className="thumbnail-arrow" onClick={() => setPage(page - 1)} disabled>&and;</button>
        : <button className="thumbnail-arrow" onClick={() => setPage(page - 1)}>&and;</button>
      }
      {thumbnails[page].map((image, i) => {
        // handleSelected(i);
        return (
          <div className={i === props.index
            ? "gallery-thumbnail-container selected"
            : "gallery-thumbnail-container"} key={i}>
            <img className="gallery-image" src={image.thumbnail_url} width="60px" height="60px" onClick={() => {props.setIndex(i);}}/>
          </div>
        )
      })}
      {page === thumbnails.length - 1
        ? <button className="thumbnail-arrow" onClick={() => setPage(page + 1)} disabled>&or;</button>
        : <button className="thumbnail-arrow" onClick={() => setPage(page + 1)}>&or;</button>
      }
    </div>
  ) : null

}

export default Thumbnails;
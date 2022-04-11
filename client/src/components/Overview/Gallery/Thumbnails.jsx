/* eslint-disable */
import React, { useState, useEffect } from 'react';

const Thumbnails = ({ index, setIndex, images, setZoomedView, page, setPage }) => {

  // const [page, setPage] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const imagesCopy = images.slice();
    const thumbnailPages = [];
    while (imagesCopy.length > 0) {
      thumbnailPages.push(imagesCopy.splice(0, 6));
    }
    setThumbnails(thumbnailPages);
  }, [images]);

  return thumbnails.length > 0 ? (
    <div className="gallery-thumbnails">
      {page === 0
        ? <button className="thumbnail-arrow" onClick={() => setPage(page - 1)} disabled>&and;</button>
        : <button className="thumbnail-arrow" onClick={() => setPage(page - 1)}>&and;</button>
      }
      {thumbnails[page].map((image, i) => {
        return (
          <div className={index === (page * 6) + i
            ? "gallery-thumbnail-container selected"
            : "gallery-thumbnail-container"} key={i}>
            <img className="gallery-image" src={image.thumbnail_url} width="60px" height="60px" onClick={() => {
              setIndex((page * 6) + i);
              setZoomedView(false);
            }}/>
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
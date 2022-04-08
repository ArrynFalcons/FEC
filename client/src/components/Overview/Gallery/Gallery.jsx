/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Arrows from './Arrows.jsx';
import Thumbnails from './Thumbnails.jsx';

function Gallery(props) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const imageArr = [];
    for (let photo in props.style.photos) {
      imageArr.push(props.style.photos[photo]);
    }
    setImages(imageArr);
  }, [props.style])

  return (images.length > 0
    ? <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images}/>
        <div className="carousel-container">
          {<img className="gallery-image carousel" src={images[index].url} key={index} width="765px" height="600px"/>}
          <Arrows index={index} setIndex={setIndex} length={images.length}/>
        </div>
      </div>
    : null
  )

}

export default Gallery;

//<img className="gallery-image" src={image.url}/>
//{images.map((image, i) => <img className="gallery-image" src={image.url} key={i}/>)}
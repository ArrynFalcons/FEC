/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Arrows from './Arrows.jsx';

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
        {<img className="gallery-image" src={images[index].url} key={index}/>}
        {/* {images.map((image, i) => <img className="gallery-image" src={image.url} key={i}/>)} */}
        <Arrows index={index} setIndex={setIndex} length={images.length}/>
      </div>
    : null
  )

}

export default Gallery;

//<img className="gallery-image" src={image.url}/>
//{images.map((image, i) => <img className="gallery-image" src={image.url} key={i}/>)}
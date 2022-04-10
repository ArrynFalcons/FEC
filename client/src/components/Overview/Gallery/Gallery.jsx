/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Arrows from './Arrows.jsx';
import Thumbnails from './Thumbnails.jsx';
// import Expanded from './Expanded.jsx';

function Gallery(props) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [view, setView] = useState('default');
  // const [positionX, setPositionX] = useState('');
  // const [positionY, setPositionY] = useState('');
  // const [expandedStyle, setExpandedStyle] = useState({});
  // const [firstSelected, setFirstSelected] = useState(true);
  // const [lastSelected, setLastSelected] = useState(false);
  // const [selected, setSelected] = useState('first');
  // const [numThumbnails, setNumThumbnails] = useState(6);

  useEffect(() => {
    const imageArr = [];
    for (let photo in props.style.photos) {
      imageArr.push(props.style.photos[photo]);
    }
    setImages(imageArr);
  }, [props.style])

  const handleMouseMove = (event) => {

    const view = document.querySelector('.expanded-view');
    view.style.backgroundPositionX = -event.nativeEvent.offsetX + "px";
    view.style.backgroundPositionY = -event.nativeEvent.offsetY + "px";

  }

  return (images.length > 0 && view === 'default'

    ? <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images}/>
        <div className="carousel-container">
          {<img className="gallery-image carousel" src={images[index].url} key={index} width="765px" height="600px"/>}
          <Arrows index={index} setIndex={setIndex} length={images.length}/>
          <button className="expand-button" onClick={() => setView('expanded')}>[ ]</button>
          {/* <i className="fas-plus"></i> */}
        </div>
      </div>

    : images.length > 0 && view === 'expanded'

    ? <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images}/>
        <div className="carousel-container" onMouseMove={(event) => handleMouseMove(event)}>
          <div className="expanded-view"
            style={{
              backgroundImage: `url(${images[index].url})`,
              width: 765,
              height: 600,
            }}>
          </div>
          <Arrows index={index} setIndex={setIndex} length={images.length}/>
          <button className="expand-button" onClick={() => setView('default')}>[ ]</button>
          {/* <i className="fas-plus"></i> */}
        </div>
      </div>

    : null

  )

}

export default Gallery;

//<img className="gallery-image" src={image.url}/>
//{images.map((image, i) => <img className="gallery-image" src={image.url} key={i}/>)}
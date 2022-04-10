/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Arrows from './Arrows.jsx';
import Thumbnails from './Thumbnails.jsx';

function Gallery(props) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [isExpandedView, setExpandedView] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const imageArr = [];
    for (let photo in props.style.photos) {
      imageArr.push(props.style.photos[photo]);
    }
    setImages(imageArr);
  }, [props.style])

  useEffect(() => {
    if (images.length > 0) {
      props.setImageUrl(images[index].url);
    }
  }, [images])

  const handleMouseMove = (e) => {
    const view = document.querySelector('.expanded-view');
    view.style.backgroundPositionX = -e.nativeEvent.offsetX + 'px';
    view.style.backgroundPositionY = -e.nativeEvent.offsetY + 'px';
  }

  if (images.length > 0 && isExpandedView === false) {
    // props.setImageUrl(images[index].url);
    return (
      <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images} setExpandedView={setExpandedView} page={page} setPage={setPage}/>
        <div className="carousel-container" onClick={() => setExpandedView(!isExpandedView)}>
          {<img className="gallery-image carousel" src={images[index].url} key={index} width="765px" height="600px"/>}
          <Arrows index={index} setIndex={setIndex} length={images.length} page={page} setPage={setPage}/>
          <button className="expand-button" onClick={() => props.setAppView('expanded')}>[ ]</button>
          {/* <i className="fas-plus"></i> */}
        </div>
      </div>
    )
  } else if (images.length > 0 && isExpandedView === true) {
    // props.setImageUrl(images[index].url);
    return (
      <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images} setExpandedView={setExpandedView} page={page} setPage={setPage}/>
        <div className="carousel-container" onClick={() => setExpandedView(!isExpandedView)} onMouseMove={(e) => handleMouseMove(e)}>
          <div className="expanded-view"
            style={{
              backgroundImage: `url(${images[index].url})`,
              width: 765,
              height: 600,
            }}>
          </div>
          <Arrows index={index} setIndex={setIndex} length={images.length} page={page} setPage={setPage}/>
          <button className="expand-button" onClick={() => setExpandedView(!isExpandedView)}>[ ]</button>
          {/* <i className="fas-plus"></i> */}
        </div>
      </div>

    )
  } else {
    return null;
  }

}

export default Gallery;

//<img className="gallery-image" src={image.url}/>
//{images.map((image, i) => <img className="gallery-image" src={image.url} key={i}/>)}
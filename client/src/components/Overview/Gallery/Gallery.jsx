/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import Arrows from './Arrows.jsx';
import Thumbnails from './Thumbnails.jsx';

function Gallery({ style, isExpandedView, setExpandedView }) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [isZoomedView, setZoomedView] = useState(false);
  const zoomed = useRef(null);
  const gallery = useRef(null);
  const expanded = useRef(null);

  useEffect(() => {
    const imageArr = [];
    for (let photo in style.photos) {
      imageArr.push(style.photos[photo]);
    }
    setImages(imageArr);
  }, [style])

  const handleMouseMove = (e) => {
    zoomed.current.style.backgroundPositionX = 180-e.nativeEvent.offsetX + 'px';
    zoomed.current.style.backgroundPositionY = 130-e.nativeEvent.offsetY + 'px';
  }

  const styleExpanded = () => {
    gallery.current.style.gridArea = '1 / 1 / 2 / 3';
  }

  const styleCollapsed = () => {
    gallery.current.style.gridArea = '1 / 1 / 2 / 2';
  }

  const handleHover = (e) => {
    expanded.current.style.backgroundPositionX = -e.nativeEvent.offsetX * 0.4 + 'px';
    expanded.current.style.backgroundPositionY = -e.nativeEvent.offsetY + 'px';
  }

  if (isExpandedView) {
    return (
      <div className="gallery" ref={gallery}>
        {styleExpanded()}
        <div className="expanded-view" ref={expanded}
          style={{
            backgroundImage: `url(${images[index].url})`,
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: 600,
            backgroundSize: 'cover'
          }} onMouseMove={(e) => handleHover(e)} onClick={() =>
            {
            styleCollapsed();
            setExpandedView(false);
            setZoomedView(false);
            }
          }>
          <button className="exit-button" onClick={() => {
            styleCollapsed();
            setExpandedView(false)
            setZoomedView(false);}}>
            ✕
          </button>
        </div>
      </div>
    )
  } else if (images.length > 0 && isZoomedView === false) {
    return (
      <div className="gallery" ref={gallery}>
        <Thumbnails index={index} setIndex={setIndex} images={images} setZoomedView={setZoomedView} page={page} setPage={setPage}/>
        <div className="carousel-container default" onClick={() => setZoomedView(!isZoomedView)}>
          {<img className="gallery-image carousel" src={images[index].url} key={index} width="765px" height="600px"/>}
          {/* <div className="gallery-image carousel"
            style={{
              backgroundImage: `url(${images[index].url})`,
              backgroundRepeat: 'no-repeat',
              // width: 765,
              // height: 600,
              backgroundSize: 'contain'
            }}>
          </div> */}
          <Arrows index={index} setIndex={setIndex} length={images.length} page={page} setPage={setPage} setZoomedView={setZoomedView}/>
          <button className="expand-button" onClick={() => setExpandedView(true)}>⤢</button>
        </div>
      </div>
    )
  } else if (images.length > 0 && isZoomedView === true) {
    return (
      <div className="gallery" ref={gallery}>
        <Thumbnails index={index} setIndex={setIndex} images={images} setZoomedView={setZoomedView} page={page} setPage={setPage}/>
        <div className="carousel-container zoomed" onClick={() => setZoomedView(!isZoomedView)} onMouseMove={(e) => handleMouseMove(e)}>
          <div className="zoomed-view" ref={zoomed}
            style={{
              backgroundImage: `url(${images[index].url})`,
              transform: 'scale(2)',
              backgroundRepeat: 'no-repeat',
              width: 765,
              height: 600,
              backgroundSize: 'cover'
            }}>
          </div>
          <Arrows index={index} setIndex={setIndex} length={images.length} page={page} setPage={setPage} setZoomedView={setZoomedView}/>
          <button className="expand-button" onClick={() => setExpandedView(true)}>⤢</button>
        </div>
      </div>

    )
  } else {
    return null;
  }

}

export default Gallery;
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Arrows from './Arrows.jsx';
import Thumbnails from './Thumbnails.jsx';

function Gallery({ style, isExpandedView, setExpandedView }) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [isZoomedView, setZoomedView] = useState(false);

  useEffect(() => {
    const imageArr = [];
    for (let photo in style.photos) {
      imageArr.push(style.photos[photo]);
    }
    setImages(imageArr);
  }, [style])

  const handleMouseMove = (e) => {
    const view = document.querySelector('.zoomed-view');
    view.style.backgroundPositionX = -e.nativeEvent.offsetX + 'px';
    view.style.backgroundPositionY = -e.nativeEvent.offsetY + 'px';
  }

  const styleExpanded = () => {
    const overview = document.querySelector('.gallery');
    overview.style.gridArea = '1 / 1 / 2 / 3';
  }

  const styleCollapsed = () => {
    const overview = document.querySelector('.gallery');
    overview.style.gridArea = '1 / 1 / 2 / 2';
  }

  const handleHover = (e) => {
    const view = document.querySelector('.expanded-view');
    view.style.backgroundPositionX = -e.nativeEvent.offsetX * 0.4 + 'px';
    view.style.backgroundPositionY = -e.nativeEvent.offsetY + 'px';
  }

  if (isExpandedView) {
    return (
      <div className="gallery">
        {styleExpanded()}
        <div className="expanded-view"
          style={{
            backgroundImage: `url(${images[index].url})`,
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: 600,
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
    // props.setImageUrl(images[index].url);
    return (
      <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images} setZoomedView={setZoomedView} page={page} setPage={setPage}/>
        <div className="carousel-container" onClick={() => setZoomedView(!isZoomedView)}>
          {<img className="gallery-image carousel" src={images[index].url} key={index} width="765px" height="600px"/>}
          <Arrows index={index} setIndex={setIndex} length={images.length} page={page} setPage={setPage} setZoomedView={setZoomedView}/>
          <button className="expand-button" onClick={() => setExpandedView(true)}>❐</button>
          {/* <i className="fas-plus"></i> */}
        </div>
      </div>
    )
  } else if (images.length > 0 && isZoomedView === true) {
    return (
      <div className="gallery">
        <Thumbnails index={index} setIndex={setIndex} images={images} setZoomedView={setZoomedView} page={page} setPage={setPage}/>
        <div className="carousel-container" onClick={() => setZoomedView(!isZoomedView)} onMouseMove={(e) => handleMouseMove(e)}>
          <div className="zoomed-view"
            style={{
              backgroundImage: `url(${images[index].url})`,
              backgroundRepeat: 'no-repeat',
              width: 765,
              height: 600,
            }}>
          </div>
          <Arrows index={index} setIndex={setIndex} length={images.length} page={page} setPage={setPage} setZoomedView={setZoomedView}/>
          <button className="expand-button" onClick={() => setExpandedView(true)}>❐</button>
          {/* <i className="fas-plus"></i> */}
        </div>
      </div>

    )
  } else {
    return null;
  }

}

export default Gallery;
import React, { useState } from 'react';
import './styles.css'

const ImageCarousel = ({ images = [] }) => {
  const numImages = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () => setActiveIndex(prev => prev === numImages - 1 ? 0 : prev + 1)
  const handlePrev = () => setActiveIndex(prev => prev - 1 === -1 ? numImages - 1 : prev - 1)

  return (

    numImages ? <div className="carousel-container">

      < div className="images-container" >
        <div className="image-container">
          <img src={images[activeIndex].src} />
          <button className="leftBtn"
            id="Previous" onClick={handlePrev}>Left</button>
          <button className="rightBtn"
            id="Next"
            onClick={handleNext}>Right</button>
        </div>

      </div >
      <div className="page-selector">
        {Array.from({ length: numImages }).map((_, index) => (
          <div
            id={`pageButton-${index}`}
            onClick={() => setActiveIndex(index)}
            key={index} className={`page ${index === activeIndex ? 'active' : ""}`}></div>
        ))}
      </div>
    </div > : (<span>No images available.</span>)


  );
};

export default ImageCarousel;

import React, { useState, useEffect } from 'react';

function Welcome() {
  
  const slides = [
    {
      image: './assets/welcome.png',
      
    },
    {
      image: './assets/loan2.png',
      
    },
    {
      image: './assets/acc.png',
      
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [slides.length]);

  
  
  const containerStyle = {
    backgroundColor: '',   
    color: '#fff',               
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    overflow: 'hidden'
  };
  const carouselStyle = {
    position: 'relative',
    maxWidth: '1700px',
    // height : '100vh',
    margin: '0 auto',            
    overflow: 'hidden'
  };
  const sliderStyle = {
    display: 'flex',
    transition: 'transform 1s ease-in-out',
    transform: `translateX(${-currentSlide * 100}%)`
  };
  const slideStyle = {
    flex: '0 0 100%',           
    position: 'relative'
  };
  const imageStyle = {
    width: '100%',
    verticalAlign: 'middle'
  };
  const captionStyle = {
    position: 'absolute',
    bottom: '20%',              
    left: '10%',
    right: '10%',              
    color: '#fff',
    fontSize: '2em',         
    fontWeight: 'bold',
    lineHeight: '1.2',
    textShadow: '0 2px 4px rgba(0,0,0,0.6)'  
  };

  return (
    <div style={containerStyle}>
      <div style={carouselStyle}>
        <div style={sliderStyle}>
          {slides.map((slide, index) => (
            <div key={index} style={slideStyle}>
              <img src={slide.image} alt={slide.caption} style={imageStyle} />
              <div style={captionStyle}>{slide.caption}</div>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}

export default Welcome;

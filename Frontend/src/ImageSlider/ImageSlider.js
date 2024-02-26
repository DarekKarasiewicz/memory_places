import React, { useState, useEffect } from 'react';

function ImageSlider(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesLength = props.slides.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slidesLength - 1 ? 0 : currentSlide + 1);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slidesLength - 1 : currentSlide - 1);
  };

  return (
    <section className='relative'>
      <div
        className={`absolute -left-3 top-1/2 transform -translate-y-1/2 rounded-full border-2 h-10 w-10 bg-white border-slate-600 flex justify-center items-center ${
          slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer '
        }`}
        onClick={previousSlide}
      >
        <img src='./assets/arrow_left_icon.svg' alt='left arrow icon'></img>
      </div>
      <div
        className={`absolute -right-3 top-1/2 transform -translate-y-1/2 rounded-full border-2 h-10 w-10 bg-white border-slate-600 flex justify-center items-center ${
          slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
        }`}
        onClick={nextSlide}
      >
        <img src='./assets/arrow_right_icon.svg' alt='right arrow icon'></img>
      </div>
      {props.slides.map((slide, index) => {
        return (
          <div key={index}>
            {index === currentSlide && (
              <img src={slide.image} alt='temp stock image' className='w-[42rem] h-[24rem]' />
            )}
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;

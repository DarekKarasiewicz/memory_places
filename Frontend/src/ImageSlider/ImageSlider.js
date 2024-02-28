import React, { useState } from 'react';

function ImageSlider(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translation, setTranslation] = useState(0);
  const slidesLength = props.slides.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide !== slidesLength - 1 ? currentSlide + 1 : currentSlide);
    setTranslation(translation - 100);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide !== 0 ? currentSlide - 1 : currentSlide);
    setTranslation(translation + 100);
  };

  return (
    <section className='relative'>
      <div
        className={`absolute -left-3 top-1/2 transform -translate-y-1/2 rounded-full border-2 h-10 w-10 z-10 bg-white border-slate-600 flex justify-center items-center ${
          slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
        } ${currentSlide === 0 ? 'pointer-events-none hidden' : 'cursor-pointer'}`}
        onClick={previousSlide}
      >
        <img src='./assets/arrow_left_icon.svg' alt='left arrow icon'></img>
      </div>
      <div
        className='flex h-[22rem] overflow-hidden z-0'
        style={{
          transform: `translateX(${translation}%)`,
          transition: 'transform 0.5s ease',
        }}
      >
        {props.slides.map((slide, index) => (
          <img key={index} src={slide.image} alt={slide.alt} className='h-[22rem] w-[22rem]' />
        ))}
      </div>
      <div
        className={`absolute -right-3 top-1/2 transform -translate-y-1/2 rounded-full border-2 h-10 w-10 z-10 bg-white border-slate-600 flex justify-center items-center ${
          slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
        } ${currentSlide === slidesLength - 1 ? 'pointer-events-none hidden' : 'cursor-pointer'}`}
        onClick={nextSlide}
      >
        <img src='./assets/arrow_right_icon.svg' alt='right arrow icon'></img>
      </div>
    </section>
  );
}

export default ImageSlider;

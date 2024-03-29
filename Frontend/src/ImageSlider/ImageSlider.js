import React, { useState } from 'react';

function ImageSlider(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translation, setTranslation] = useState(0);
  const slidesLength = props.slides.length;
  const colors = ['bg-white', 'bg-slate-400', 'bg-slate-400'];

  const nextSlide = () => {
    setCurrentSlide(currentSlide !== slidesLength - 1 ? currentSlide + 1 : currentSlide);
    setTranslation(translation - 100);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide !== 0 ? currentSlide - 1 : currentSlide);
    setTranslation(translation + 100);
  };

  return (
    <section className='relative w-full h-full'>
      <div
        className={`absolute -left-3 top-1/2 transform -translate-y-1/2 rounded-full border-2 h-10 w-10 z-10 bg-white border-slate-600 flex justify-center items-center ${
          slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
        } ${currentSlide === 0 ? 'pointer-events-none hidden' : 'cursor-pointer'}`}
        onClick={previousSlide}
      >
        <img
          src='./assets/arrow_left_icon.svg'
          alt='left arrow icon'
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        ></img>
      </div>
      <div className='overflow-x-hidden w-full h-full'>
        <div
          className='flex z-0 w-full h-full'
          style={{
            transform: `translateX(${translation}%)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {props.slides.map((slide, index) => (
            <div key={index} className='flex-shrink-0 w-full'>
              {/* If want to preserve the image dimension change object-cover to object-scale-down */}
              <img src={slide.image} alt={slide.alt} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-slate-600 flex gap-1 p-2 rounded-full mb-2 ${
            slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
          }`}
        >
          {props.slides.map((slide, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full ${colors} ${
                index === currentSlide ? 'bg-white' : 'bg-slate-400'
              }`}
            ></div>
          ))}
        </div>
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

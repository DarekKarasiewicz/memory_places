import { useEffect, useState } from 'react';

import ArrowLeftIcon from 'icons/ArrowLeftIcon';
import ArrowRightIcon from 'icons/ArrowRightIcon';

function ImageSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translation, setTranslation] = useState(0);
  const slidesLength = slides.length;
  const [isAnyImages, setIsAnyImages] = useState(false);

  const nextSlide = () => {
    setCurrentSlide(currentSlide !== slidesLength - 1 ? currentSlide + 1 : currentSlide);
    setTranslation(translation - 100);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide !== 0 ? currentSlide - 1 : currentSlide);
    setTranslation(translation + 100);
  };

  useEffect(() => {
    setIsAnyImages(slides.length !== 0);
    setCurrentSlide(0);
    setTranslation(0);
  }, [slides]);

  return (
    <section className='relative w-full h-full'>
      {isAnyImages ? (
        <>
          <div
            className={`absolute -left-3 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 z-10 bg-secondaryBgColor shadow-itemShadow flex justify-center items-center ${
              slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
            } ${currentSlide === 0 ? 'pointer-events-none hidden' : 'cursor-pointer'}`}
            onClick={previousSlide}
          >
            <ArrowLeftIcon />
          </div>
          <div className='overflow-x-hidden w-full h-full'>
            <div
              className='flex z-0 w-full h-full'
              style={{
                transform: `translateX(${translation}%)`,
                transition: 'transform 0.5s ease',
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className='flex-shrink-0 w-full'>
                  {/* If want to preserve the image dimension change object-cover to object-scale-down */}
                  <img src={slide.img} alt={slide.alt} className='w-full h-full object-contain' />
                </div>
              ))}
            </div>
            <div
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-secondaryBgColor shadow-itemShadow flex gap-1 p-2 rounded-full mb-2 ${
                slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
              }`}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-slate-400'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <div
            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 z-10 bg-secondaryBgColor shadow-itemShadow flex justify-center items-center ${
              slidesLength === 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
            } ${
              currentSlide === slidesLength - 1 ? 'pointer-events-none hidden' : 'cursor-pointer'
            }`}
            onClick={nextSlide}
          >
            <ArrowRightIcon />
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center h-full w-full'>
          <p>No images available for this element.</p>
        </div>
      )}
    </section>
  );
}

export default ImageSlider;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CustomSliderProps {
  items: string[];
  width: number;
  height: number;
  slideImgClass?: string;
  slideContClass?: string;
  largeCont: string;
  imagesPerSlide: number
}

const dotsContainerStyles = "absolute bottom-4 w-full flex justify-center top-[95%]";
const dotStyle = "mx-1 cursor-pointer w-2 h-2 rounded-full bg-transparent border-green-600 border-2";
const activeDotStyle = "bg-green-600";

const CustomSlider: React.FC<CustomSliderProps> = ({ 
  items, 
  width, 
  height, 
  slideImgClass, 
  slideContClass, 
  largeCont, 
  imagesPerSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

 

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(items.length / imagesPerSlide));
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, imagesPerSlide]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
const totalSlides = Math.ceil(items.length / imagesPerSlide);
  return (
    <div className={`home-slider ${largeCont} h-[60%] w-full relative `}>
      <div className={`image ${slideContClass} flex  overflow-hidden`}>
      {
                items.map((url, index) => (
            <Image src={items[currentIndex]} alt={`Slide ${index + 1}`}
            className={`slide-img ${slideImgClass} object-cover`}
            aria-hidden={index < currentIndex * imagesPerSlide || index >= (currentIndex + 1) * imagesPerSlide}
              key={index}
              width={width}
              height={height}
        />
          ))
        }
      </div>
      <div className={dotsContainerStyles}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`${dotStyle} ${index === currentIndex ? activeDotStyle : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;

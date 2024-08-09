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
  imagesPerSlide: number; // New prop for number of images per slide
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
  imagesPerSlide, // Receiving the new prop
}) => {
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

  return (
    <div className={`home-slider ${largeCont} h-[60%] w-full relative`}>
      <div className={`image ${slideContClass} flex  overflow-hidden`} style={{ width: `${100 * items.length / imagesPerSlide}%` }}>
        {
          items.map((url, index) => (
            <Image
              src={url}
              alt={`Slide ${index + 1}`}
              className={`slide-img ${slideImgClass} object-cover`}
              style={{
                translate: `${-100 * currentIndex}%`,
                width: `${100 / imagesPerSlide}%`, // Adjust image width based on imagesPerSlide
              }}
              aria-hidden={index < currentIndex * imagesPerSlide || index >= (currentIndex + 1) * imagesPerSlide}
              key={index}
              width={width}
              height={height}
            />
          ))
        }
      </div>
      <div className={dotsContainerStyles}>
        {Array.from({ length: Math.ceil(items.length / imagesPerSlide) }).map((_, index) => (
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

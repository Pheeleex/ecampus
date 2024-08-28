import CustomSlider from '@/app/Components/CustomSlider';
import { fetchProperties } from '@/utils/firebase';
import Link from 'next/link';
import React from 'react';

const Properties = async () => {
  const allProperties = await fetchProperties();
  const isDataEmpty = !Array.isArray(allProperties) || allProperties.length < 1 || !allProperties;

  return (
    <section className='p-6 sm:p-8 lg:p-12 flex flex-wrap justify-center gap-8 md:gap-12'>
      {isDataEmpty ? (
        <h1 className='text-center text-lg font-semibold'>No properties found.</h1>
      ) : (
        allProperties.map((property) => (
          <div 
            key={property.id} 
            className="flex flex-col w-full sm:w-[90%] md:w-[48%] lg:w-[30%] border border-gray-400 
            rounded-lg overflow-hidden mb-8 h-auto"
          >
            <div className="p-6 flex flex-col-reverse gap-2.5 h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl text-gray-700">{property.Location}</h2>
                <h3 className="text-md md:text-lg">N{property.Rent}</h3>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm md:text-base">{property.ProjectType}</p>
              </div>
              <span className="text-sm md:text-base">
                {property.Bedroom} {property.Bedroom === 1 ? 'Bedroom' : 'Bedrooms'}
              </span>
              <Link 
                href={`/Properties/${property.id}`} 
                className="mt-4 bg-green-700 w-full sm:w-[10rem] text-white no-underline py-2 px-4 text-center rounded-md transition-colors duration-300 hover:bg-black"
              >
                Find Out More
              </Link>
            </div>
            {property.images && property.images.length > 0 ? (
              <div className="h-64 md:h-80 lg:h-96">
                <CustomSlider
                  items={property.images}
                  width={600}
                  height={800}
                  slideContClass="w-full h-full overflow-hidden"
                  slideImgClass="w-full h-full object-cover"
                  largeCont="w-full h-full"
                  imagesPerSlide={1}
                />
              </div>
            ) : (
              <div className="h-64 md:h-80 lg:h-96 flex items-center justify-center bg-gray-100">
                <h1 className="text-gray-500">No images found</h1>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default Properties;

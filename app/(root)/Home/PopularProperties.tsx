'use client';
import CustomSlider from '@/app/Components/CustomSlider';
import { fetchProperties } from '@/utils/firebase';
import { Property } from '@/utils/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PopularProperties = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties: Property[]  = await fetchProperties();
        setAllProperties(properties);
        setIsDataEmpty(!Array.isArray(properties) || properties.length < 1 || !properties);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleViewAllProperties = () => {
    router.push('./Properties'); // Navigate to the properties page
  };

  return (
    <section className='p-4 lg:p-12 flex flex-col items-center'>
      <h1 className='mt-12 font-bold text-2xl lg:text-4xl text-green-950'>Popular Properties</h1>
      <div className='flex flex-wrap justify-center gap-4 lg:gap-20 mt-8 lg:mt-[3rem] w-full'>
        {
          allProperties ? (
            allProperties.map((property) => (
              <div key={property.id} className="flex flex-1 min-w-full sm:min-w-[80%] md:min-w-[45%] lg:min-w-[45%] xl:max-w-[30%]
                flex-col-reverse border border-gray-400 rounded-lg overflow-hidden mb-8 lg:mb-12 h-[24rem] lg:h-[28rem]">
                <div className="p-4 lg:p-8 flex flex-col gap-2.5 h-full">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg lg:text-xl text-gray-700">{property.Location}</h2>
                    <h3 className="text-md lg:text-lg">N{property.Rent}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>{property.ProjectType}</p>
                  </div>
                  <span>{property.Bedroom} {property.Bedroom === 1 ? 'Bedroom' : "Bedrooms"}</span>
                  <Link href={`/Properties/${property.id}`} className="mt-4 bg-green-700 text-white no-underline 
                    py-2 px-4 max-w-xs text-center rounded-md transition-colors duration-300 hover:bg-black">
                    Find Out More
                  </Link>
                </div>
                {property.images && property.images.length > 0 ? (
                  <CustomSlider
                    items={property.images}
                    width={600}
                    height={800}
                    slideContClass="w-full h-full overflow-hidden"
                    slideImgClass="w-full h-full object-cover bg-red"
                    largeCont="w-full h-full"
                    imagesPerSlide={1}
                  />
                ) : (
                  <h1>No images found</h1>
                )}
              </div>
            ))
          ) : (
            <h1>Loading</h1>
          )
        }
      </div>
      <div className='flex items-center justify-center mt-8'>
        <button 
          onClick={handleViewAllProperties}
          className='p-2 border-black border-2 bg-transparent'
        >
          View all Properties
        </button>
      </div>
    </section>
  );
};

export default PopularProperties;

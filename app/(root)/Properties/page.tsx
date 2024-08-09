import CustomSlider from '@/app/Components/CustomSlider';
import { fetchProperties } from '@/utils/firebase';
import Link from 'next/link';
import React from 'react'

const Properties = async() => {
    const allProperties = await fetchProperties()
    const isDataEmpty = !Array.isArray(allProperties) || allProperties.length < 1 || !allProperties;

  return (
    <>
    <section className='p-8 lg:p-12 flex flex-wrap justify-center gap-20'>
      {
        allProperties ? (
          allProperties.map((property) => (
            <div key={property.id} className="flex flex-1 min-w-full md:min-w-1/2 lg:min-w-[35%] lg: max-w-[40%]
              flex-col-reverse border border-gray-400 rounded-lg overflow-hidden mb-12 h-[28rem]">
              <div className="p-8 flex flex-col gap-2.5 h-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl text-gray-700">{property.Location}</h2>
                  <h3 className="text-lg">N{property.Rent}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <p>{property.ProjectType}</p>
                </div>
                <span>{property.Bedroom} {property.Bedroom === 1 ? 'Bedroom' : "Bedrooms"}</span>
                <Link href={`/Properties/${property.id}`} className="mt-4 bg-green-700 w-[10rem] text-white no-underline 
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
    </section>
  </>
  )
}

export default Properties
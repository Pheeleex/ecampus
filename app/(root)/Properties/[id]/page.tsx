import CustomSlider from '@/app/Components/CustomSlider';
import { fetchProperties } from '@/utils/firebase'
import Link from 'next/link';
import React from 'react'

interface pageProps{
    params:{
        id: string
    }
}

const page = async({params}: pageProps) => {
    const properties = await fetchProperties()
    const property = properties.find((prop) => prop.id === params.id);

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <section className='flex flex-col justify-center items-center'>
      <div className="property-details">
        <h1>{property.Location}</h1>
        <p>Amount: ${property.Rent}</p>
        <p>Type: {property.ProjectType}</p>
        <p>Bedrooms: {property.Bedroom}</p>
        </div>
        <CustomSlider
          items={property.images || []} 
          width={1000}
          height={775}
          slideContClass=' w-full h-full'
          slideImgClass='w-1/2 hfull'
          largeCont='w-3/4 h-1/2'
          imagesPerSlide={2}
        />

        <Link href="/products" className="btn">Back to Products</Link>
    
    </section>
  );
}

export default page
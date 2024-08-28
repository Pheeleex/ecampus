import { fetchProperties } from '@/utils/firebase';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const PropertyDetails = async ({ params }: PageProps) => {
  const properties = await fetchProperties();
  const property = properties.find((prop) => prop.id === params.id);

  if (!property) {
    return <p className="text-center text-xl text-red-500">Property not found</p>;
  }

  return (
    <section className="flex flex-col items-center py-8 px-4 md:px-8 lg:px-16">
      <div className="property-details w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{property.Location}</h1>
        <p className="text-lg md:text-xl">Amount: <span className="font-semibold">${property.Rent}</span></p>
        <p className="text-lg md:text-xl">Type: <span className="font-semibold">{property.ProjectType}</span></p>
        <p className="text-lg md:text-xl">Bedrooms: <span className="font-semibold">{property.Bedroom}</span></p>
        <p className="text-lg md:text-xl">Location: <span className="font-semibold">{property.Location}</span></p>
      </div>

      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {property.images && property.images?.length > 0 ? (
          property.images?.map((image, index) => (
            <div key={index} className="relative h-64 md:h-80 lg:h-96">
              <Image src={image} alt={`image ${index}`} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          ))
        ) : (
          <p className="text-center text-xl">No images available</p>
        )}
      </div>

      <Link href="/products"
        className="mt-10 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Back to Products
      </Link>
    </section>
  );
}

export default PropertyDetails;

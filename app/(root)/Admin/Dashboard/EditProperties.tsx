'use client'
import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { fetchProperties, deleteProperty } from '@/utils/firebase';
import { Property } from '@/utils/types';


// Define the type for the onEdit prop
interface EditPropertiesProps {
  onEdit: (property: Property) => void;
}

const EditProperties: React.FC<EditPropertiesProps> = ({ onEdit }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      const loadedProperties = await fetchProperties();
      setProperties(loadedProperties);
    };
    loadProperties();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-20 mt-20">
      {properties.map((prop) => (
        <div key={prop.id} className="border rounded-lg shadow-lg p-4 w-80 bg-red-100">
          <div className='flex justify-between'>
            <h1 className="text-xl font-bold mb-2 text-red-600">{prop.Location}</h1>
            <h3 className="text-lg text-gray-700 mb-4">${prop.Rent}</h3>
          </div>
          <div className="service-type mb-4">
            <p>{prop.ProjectType}</p>
          </div>
          <span className="block mb-4 text-red-600">
            {prop.Bedrooms} {prop.Bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </span>
          <div className="flex justify-between">
            <button
              onClick={() => onEdit(prop)}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <Edit className="w-5 h-5 mr-1" /> Edit
            </button>
            <button
              onClick={() => deleteProperty(prop.id, prop.ImagePath ?? '', setProperties)}
              className="flex items-center text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5 mr-1" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditProperties;

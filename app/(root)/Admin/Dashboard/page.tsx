'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import {v4 as uuidv4} from 'uuid'
import EditProperties from './EditProperties';
import { ref, uploadBytes } from 'firebase/storage';
import { Controller, useForm, FieldValues, SubmitHandler, UseFormSetValue, UseFormSetError, UseFormReset } from 'react-hook-form';
import { addProperty, auth, storage, updateProperty } from '@/utils/firebase';
import { Property } from '@/utils/types';

interface PropertyFormValues {
  Rent: number;
  ProjectType: string;
  Bedroom: number;
  Electricity: number
  Water: boolean
  Location: string;
  About: string;
  ImagePath?: string;
  imageFiles: File[];
  id?: string;
}

const Page: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
    setError
  } = useForm<PropertyFormValues>({
    defaultValues: {
      ImagePath: '',
      imageFiles: []
    }
  });

  // Populate form with existing data when edit button is clicked
  const handleEdit = (data: Property) => {
    const fields: Array<keyof PropertyFormValues> = [
      'id',
      'Rent',
      'ProjectType',
      'Location',
      'Bedroom',
      'About',
      'Electricity',
      'Water',
      'ImagePath',
    ];

    fields.forEach(field => {
        setValue(field, data[field] as PropertyFormValues[typeof field]);
    });

    setValue('imageFiles', []);
    setIsEditing(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit: SubmitHandler<PropertyFormValues> = async (data) => {
    const {
        Rent,
        ProjectType,
        ImagePath,
        Electricity,
        Water,
        imageFiles,
        Location,
        About,
        id
    } = data;

    if (isEditing) {
      // Update form data using new values entered
      const updatedData: Partial<PropertyFormValues> = {};
      const fieldsToUpdate = {
        ProjectType,
        Rent,
        Water,
        Electricity,
        Location,
        id,
        About
      };

     // Use type assertion to ensure the correct type is assigned
for (const [key, value] of Object.entries(fieldsToUpdate)) {
  if (value !== undefined && value !== null) {
    updatedData[key as keyof PropertyFormValues] = value as any;
  }
}

      if (imageFiles.length > 0) {
        if (!ImagePath) {
          setError('ImagePath', {
            type: 'server',
            message: 'Image path must be provided if uploading new images.'
          });
          return;
        }

        updatedData.ImagePath = ImagePath;
        await Promise.all(
          imageFiles.map((file, index) => {
            const storageRef = ref(storage, `${ImagePath}/${ImagePath}${index + 1}`);
            return uploadBytes(storageRef, file);
          })
        );
      } else {
        updatedData.ImagePath = ImagePath;
      }

      await updateProperty(id!, updatedData);
    } else {
      // If not editing, submit property data with an ID
      const propertyData = {
        ...data,
        id: uuidv4()
      };
      await addProperty(propertyData, data.imageFiles, data.ImagePath!);
    }
    reset();
  };

  // If there is no user signed in, push the visitor to the sign-in page
  useEffect(() => {
    if (!loading && !user) {
      router.push('./Auth/SignIn');
    }
  }, [loading, router, user]);

  const locations: string[] = ['Gold State', 'Blue State', 'Marquess State', 'Grey State'];

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 mb-12">
      <h1 className="text-2xl font-bold mb-6 mt-10">Hello </h1>
      <button
        className="mb-6 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
        onClick={() => {
          signOut(auth);
          localStorage.removeItem('user');
          router.push('/Admin/Auth/SignIn');
        }}
      >
        Sign out
      </button>

      <div ref={formRef} className="bg-red-100 p-8 rounded-lg shadow-md w-full md:w-[34rem] lg:w-[40rem]">
        <h2 className="text-xl font-semibold mb-4">Add Properties</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Price:</label>
            <input
              {...register("Rent", { required: 'Rent is required' })}
              type="number"
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
            {errors.Rent && (
              <p className="text-red-500">{errors.Rent.message}</p>
            )}
          </div>
        
        <div>
          <label className="block text-red-900 mb-2">Electricity</label>
            <input
              {...register("Electricity", { required: 'Project name is required' })}
              type="text"
              placeholder='How many hours of electricity on average?'
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
            {errors.Electricity && (
              <p className="text-red-500">{errors.Electricity.message}</p>
            )}
          </div>

          
          <div className='flex flex-col pb-8'>
            <label className="block text-red-900 mb-2">Property Type:</label>
            <input
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              {...register('ProjectType', { required: 'Project Type is required' })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Bedrooms:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((option) => (
                <label className='mr-4 mb-2 text-red-900' key={option}>
                  <input
                    type="radio"
                    value={option}
                    {...register('Bedroom')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-red-900 mb-2">Water:</label>
            <div className="flex space-x-2">
              {['Yes', 'No'].map((opt) => (
                <label className='mr-4 mb-2 text-red-900' key={opt}>
                  <input
                    type="radio"
                    value={opt}
                    {...register('Water')}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          
          <div className='flex flex-col pb-8'>
            <label htmlFor="">Location</label>
            <input
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              {...register('Location', { required: 'Location is required' })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-red-900 mb-2">Describe property:</label>
            <textarea
              {...register('About', { required: 'Description is required' })}
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Upload Image:</label>
            <input
              {...register('imageFiles')}
              type='file'
              name='imageFiles'
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              multiple
            />
            {errors.imageFiles && (
              <p className="text-red-500">{errors.imageFiles.message}</p>
            )}
          </div>
          <div className='flex flex-col pb-8'>
            <label htmlFor="">ImagePath</label>
            <input
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              placeholder='Add Imagefolder name e.g ImageA, ImageB etc'
              {...register('ImagePath', { required: 'ImagePath is required' })}
            />
             {errors.ImagePath && (
              <p className="text-red-500">{errors.ImagePath.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            {isEditing ? 
              (isSubmitting ? 'Updating Property' : 'Update Property') :
              (isSubmitting ? 'Adding Property...' : 'Add Property')
            }
          </button>
        </form>
      </div>
      <EditProperties onEdit={handleEdit} />
    </div>
  );
};

export default Page;

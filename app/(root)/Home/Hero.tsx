import { Search } from 'lucide-react'
import React from 'react'
import PopularProperties from './PopularProperties'
import Dropdown from '@/app/Components/Dropdown';
import CityGuide from './CityGuide';

const Hero = () => {
  const types = ['Studio Apartment', 'Modern Apartment', 'Luxury Apartment'];
  const bedrooms = ['1', '2', '3', '4'];
  const prices = ['50,000', '100,000', '150,000', '200,000', '250,000'];
  
  return (
    <div className='px-4 py-10 lg:p-20'>
      <section className='relative w-full mb-20 lg:mb-36'>
        <div className="flex flex-col justify-center items-center relative min-h-[200px] lg:h-[400px] w-full rounded-xl 
        bg-banner bg-cover bg-center text-center mb-10 tones">
          <div className="absolute inset-0 bg-green-800 opacity-10 rounded-xl"></div>
          <h1 className='text-2xl lg:text-5xl text-white font-bold'>Student housing made easy</h1>
          
          <div className='absolute top-[70%] w-full lg:w-[40rem] tones p-4 lg:p-12 h-[14rem] lg:h-auto'>
            <div className='flex items-center justify-center md:w-3/4 lg:w-full border p-2 w-full rounded-lg 
            bg-white border-white'>
              <input
                type='text'
                placeholder='location'
                aria-label='Search location'
                className='border-none outline-none w-full p-2 bg-transparent'
              />
              <div className='text-gray-400'>
                <Search color='grey' />
              </div> 
            </div>
            <div className='flex flex-wrap justify-between text-white font-bold gap-2 lg:gap-4 p-2 lg:p-4 bg-green-800 rounded-md z-[52] lg:bg-transparent mt-4 lg:mt-0'>
              <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-2 lg:gap-4">
                <Dropdown label="Type" options={types} />
                <Dropdown label="Bedroom" options={bedrooms} />
                <Dropdown label="Min. Price" options={prices} />
                <Dropdown label="Max. Price" options={prices} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <PopularProperties />
      <CityGuide />
    </div>
  )
}

export default Hero;

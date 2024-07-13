import { Search } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <div>
         <section className='relative w-full'>
         <div className=" flex flex-col justify-center items-center relative min-h-[274px] w-full rounded-xl 
         bg-banner bg-cover bg-center text-center mt-16">
            <h1 className='text-3xl text-white font-extrabold'>Student housing made easy</h1>
            <div className='flex items-center justify-center md:w-3/4 lg:w-1/2 border p-2 w-full rounded-lg 
            bg-white border-white '>
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
        </div>
        </section>
    </div>
  )
}

export default Hero
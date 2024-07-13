import { House } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    const navlinks = ['Home', 'Rentals', 'About', 'Contact']
  return (
    <nav className='flex sticky top-0 z-50 justify-between p-4'>
        <div className='flex items-center justify-center gap-1'>
            <House />
            <h2 className='font-extrabold'>E-CAMPUS</h2>
        </div>
        <div className='flex items-center justify-center gap-4'>
            {
                navlinks.map((nav, index) => (
                    <h3 key={index}>{nav}</h3>
                ))
            }
        </div>
    </nav>
  )
}

export default Navbar
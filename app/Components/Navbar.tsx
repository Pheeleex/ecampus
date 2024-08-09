'use client'
import { House, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navlinks = ['Home', 'Rentals', 'Area Guide', 'Blog', 'Contact'];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className='flex sticky top-0 z-50 justify-between p-4 bg-white shadow-md'>
      <Link href='/' className='flex items-center justify-center gap-1'>
        <House color='green' />
        <h2 className='font-extrabold text-green-900'>E-CAMPUS</h2>
      </Link>
      <div className='hidden md:flex items-center justify-center gap-[2rem]'>
        {navlinks.map((nav, index) => (
          <div
            key={index}
            className='font-bold text-[15px] text-green-900 p-2 rounded-md cursor-pointer hover:bg-green-200'
          >
            {nav}
          </div>
        ))}
      </div>
      <div className='hidden md:flex justify-between items-center gap-2'>
        <button className='text-white font-bold text-[14px] bg-green-800 p-2 rounded-md'>
          Sign Up
        </button>
        <button className='text-white font-bold text-[14px] bg-green-800 p-2 rounded-md'>
          Sign In
        </button>
      </div>
      <div className='md:hidden flex items-center'>
        <button onClick={toggleMenu}>
          <Menu color='green' size={30} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className='fixed inset-0 bg-white flex flex-col items-center justify-center z-50'
          >
            <div className='flex justify-between items-center w-full p-4'>
              <div className='flex items-center justify-center gap-1'>
                <House color='green' />
                <h2 className='font-extrabold text-green-900'>E-CAMPUS</h2>
              </div>
              <button onClick={closeMenu}>
                <X color='green' size={30} />
              </button>
            </div>
            {navlinks.map((nav, index) => (
              <div
                key={index}
                className='font-bold text-[20px] text-green-900 p-4 cursor-pointer hover:bg-green-200'
                onClick={closeMenu}
              >
                {nav}
              </div>
            ))}
            <button
              className='text-white font-bold text-[18px] bg-green-800 p-3 rounded-md mt-4'
              onClick={closeMenu}
            >
              Sign Up
            </button>
            <button
              className='text-white font-bold text-[18px] bg-green-800 p-3 rounded-md mt-4'
              onClick={closeMenu}
            >
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

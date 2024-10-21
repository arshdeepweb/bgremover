import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className='flex mx-4 py-3 lg:mx-44 m-auto justify-between items-center h-[70px]'>
        <Link to='/'><img src={assets.logo} alt="" /></Link>
        <div>
          <button className='flex bg-black rounded-3xl gap-4 py-3 px-8 text-white items-center hover:scale-105 transition-all duration-700'>Get Started <FaArrowRight /></button>
        </div>
      </div>
      <hr className='bg-gradient-to-r from-violet-600 to-fuchsia-500 h-1'/>
    </>
  )
}

export default Navbar
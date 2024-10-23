import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className='flex flex-col sm:flex-row mx-2 py-3 lg:mx-44 m-auto justify-between items-center h-[70px]'>
        <div className='flex gap-10 items-center'>
        <Link to='/'><img src={assets.logo} alt="" className='w-[200px] sm:w-full' /></Link> 
        <p className='hidden sm:inline'>|</p>  
        <p>All right reserved. Copyright @bg removal</p>
        </div>
        <div className='flex'>
          <img src={assets.facebook_icon} alt="" className='hover:scale-125 cursor-pointer transition-all duration-500'/>
          <img src={assets.twitter_icon} alt="" className='hover:scale-125 cursor-pointer transition-all duration-500'/>
          <img src={assets.google_plus_icon} alt="" className='hover:scale-125 cursor-pointer transition-all duration-500'/>
        </div>
      </div>
     
    </>
  )
}

export default Footer
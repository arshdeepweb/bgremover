import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import { appContext } from '../../context/appContext';

const Navbar = () => {

  const {openSignIn} = useClerk()
  const { isSignedIn, user } = useUser()
  const {credit, loadCreditData} = useContext(appContext)

  useEffect(() => {
    
    if(isSignedIn){
      loadCreditData()
    }

  }, [isSignedIn])
  

  return (
    <>
      <div className='flex mx-2 py-3 lg:mx-44 m-auto justify-between items-center h-[70px]'>
        <Link to='/'><img src={assets.logo} alt="" className='w-[150px] sm:w-full' /></Link>
        {
          isSignedIn?<div className='flex items-center gap-2 sm:gap-3'>
            <button className='flex items-center gap-2 bg-blue-400 px-4 sm:px-7 py-1.5 sm:py-2 rounded-full hover:scale-105 transition-all duration-700'>
              <img src={assets.credit_icon} alt="" className='w-5' />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits : {credit}</p>
            </button>
            <p className='text-gray-600 mxax-sm:hidden'>Hi, {user.fullName}</p>
            <UserButton />
          </div>:<button className='flex bg-black rounded-3xl gap-2 md:gap-4 py-3 px-6 md:px-8 text-white items-center hover:scale-105 transition-all duration-700' onClick={()=>openSignIn({})}>Get Started <FaArrowRight /></button>
        }
        {/* <div>
          
        </div> */}
      </div>
      <hr className='bg-gradient-to-r from-violet-600 to-fuchsia-500 h-1'/>
    </>
  )
}

export default Navbar
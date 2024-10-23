import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';

const Navbar = () => {

  const {openSignIn} = useClerk()
  const { isSignedIn, user } = useUser()

  return (
    <>
      <div className='flex mx-2 py-3 lg:mx-44 m-auto justify-between items-center h-[70px]'>
        <Link to='/'><img src={assets.logo} alt="" className='w-[150px] sm:w-full' /></Link>
        {
          isSignedIn?<div>
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
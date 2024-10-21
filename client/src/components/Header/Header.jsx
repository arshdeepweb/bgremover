import React from 'react'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='flex items-center justify-between mx-4 flex-col-reverse md:flex-row py-4 gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 '>
      {/* --------------- Left Side -------------- */}
      <div className='text-center md:text-left mt-8 md:mt-0 '>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove The <br className='max-md:hidden'/> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text bg text-transparent'>BackGround</span> From <br className='max-md:hidden' /> Images For Free</h1>
        <p className='my-6 text-[15px] text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br className='hidden md:block' /> Lorem Ipsum has been the industry's standard dummy text ever.</p>
        <div >
          <input type="file" name='' id='upload1' hidden/>
          <label htmlFor="upload1" className='inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 m-auto hover:scale-105 transition-all duration-700 '>
            <img src={assets.upload_btn_icon} alt="" />
            <p className='text-white text-sm'>Upload your image</p>
          </label>
        </div>
      </div>

      {/* --------------- Right Side -------------- */}
      <div className='w-full max-w-md'>
      <img src={assets.header_img} alt="" />
      </div>

    </div>
  )
}

export default Header
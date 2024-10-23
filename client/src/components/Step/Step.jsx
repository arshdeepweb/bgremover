import React from 'react'
import { assets } from '../../assets/assets'

const Step = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
      <h1 className='text-4xl text-center xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Steps to remove background <br /> image in seconds</h1>
      <div className='flex items-start flex-wrap gap-4 md:gap-6 mt-16 xl:mt-24 justify-center'>
        <div className='flex items-start gap-4 bg-white border shadow-md shadow-neutral-700 p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
          <img src={assets.upload_icon} alt="" className='max-w-9'/>
          <div>
            <h2 className='text-xl font-medium'>Upload image</h2>
            <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later. <br /> This is a demo..</p>
          </div>
        </div>
        <div className='flex items-start gap-4 bg-white border shadow-md shadow-neutral-700 p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
          <img src={assets.remove_bg_icon} alt="" className='max-w-9'/>
          <div>
            <h2 className='text-xl font-medium'>Remove background</h2>
            <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later. <br /> This is a demo..</p>
          </div>
        </div>
        <div className='flex items-start gap-4 bg-white border shadow-md shadow-neutral-700 p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
          <img src={assets.download_icon} alt="" className='max-w-9'/>
          <div>
            <h2 className='text-xl font-medium'>Download image</h2>
            <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later. <br /> This is a demo..</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step
import React from 'react'
import { assets, testimonialsData } from '../../assets/assets'

const Testimonial = () => {
  return (
    <div className='pb-10 md:py-20 mx-2'>
      <h1 className=' mb-12 sm:mb-20 text-4xl text-center xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Customer Testimonials</h1>

      <div className='flex items-start flex-wrap gap-4 md:gap-6 mt-16 xl:mt-24 justify-center'>
        {testimonialsData.map((itemData)=>(
          <div key={itemData.id} className='flex items-start flex-col gap-4 max-w-md bg-white border shadow-md shadow-neutral-700 p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
            <p className='text-4xl text-neutral-600 font-medium mb-[-10px]'>”</p>
            <p className='text-sm text-neutral-500 '>{itemData.text}</p>
            <div className='flex items-center gap-4'>
              <img src={itemData.image} className='max-w-12 rounded-full' alt="" />
              <div className=''>
                <p className='text-lg font-medium'>{itemData.author}</p>
                <p>{itemData.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Testimonial
import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const BgSlider = () => {

  const [sliderPosition, setSliderPosition] = useState(80)

  const handleSliderChange = (e) =>{
    setSliderPosition(e.target.value)
  }

  return (
    <div className='pb-10 md:py-20 mx-2'>
      {/* TITLE */}
      <h1 className=' mb-12 sm:mb-20 text-4xl text-center xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove Background With High <br /> Quality and Accuracy</h1>

      <div className='relative w-full max-w-3xl overflow-hidden m-auto rounded-xl'>
        {/* Background Image */}

        <img src={assets.image_w_bg} style={{clipPath:`inset(0 ${100.2 - sliderPosition}% 0 0)`}} alt="" />

        {/* Forground Image */}
        <img src={assets.image_wo_bg} style={{clipPath:`inset(0 0 0 ${sliderPosition}%)`}} alt="" className='absolute top-0 left-0 w-full' />

        {/* slider */}
        <input type="range" min={0} max={100} value={sliderPosition} onChange={handleSliderChange} className='absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 w-full z-10 slider' />

      </div>
    </div>
  )
}

export default BgSlider
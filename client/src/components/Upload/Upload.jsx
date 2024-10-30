import React, { useCallback, useContext } from 'react'
import { assets } from '../../assets/assets'
import { appContext } from '../../context/appContext'

const Upload = () => {

  const {removeBG} = useContext(appContext)
  

  return (
    <div className='pb-10 md:py-20 mx-2'>
      <h1 className=' mb-12 sm:mb-15 text-4xl text-center xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>See the magic. Try now</h1>
      <div className='text-center'>
          <input type="file" name='' id='upload1' hidden onChange={(e)=>removeBG(e.target.files)} accept='image/*'/>
          <label htmlFor="upload1" className='inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 m-auto hover:scale-105 transition-all duration-700 '>
            <img src={assets.upload_btn_icon} alt="" />
            <p className='text-white text-sm'>Upload your image</p>
          </label>
        </div>
    </div>
  )
}

export default Upload
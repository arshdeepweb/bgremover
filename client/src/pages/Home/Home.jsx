import React from 'react'
import Header from '../../components/Header/Header'
import Step from '../../components/Step/Step'
import BgSlider from '../../components/BgSlider/BgSlider'
import Testimonial from '../../components/Testimonial/Testimonial'
import Upload from '../../components/Upload/Upload'

const Home = () => {
  return (
    <div>
      <Header />
      <Step />
      <BgSlider />
      <Testimonial />
      <Upload />
    </div>
  )
}

export default Home
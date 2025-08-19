import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import FeatureSection from '../Components/FeatureSection'
import AboutUsSection from '../Components/AboutUsSection'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className='bg-gray-100 min-h-screen '>
          <Navbar />
          <HeroSection />
          <FeatureSection />
          <AboutUsSection />
          <Footer/>
    </div>
  )
}

export default Home
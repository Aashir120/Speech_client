import React from 'react'
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Testimonials from './Testimonials';
import CtaSection from './CtaSection';
import Footer from './Footer';

export default function Home() {
  return (
    <div className='overflow-hidden'>
        <Hero/>
        <About/>
        <Features/>
        <Testimonials/>
        <CtaSection/>
        <Footer/>        
    </div>
  )
}

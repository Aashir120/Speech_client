import React from 'react';

// import animate on scroll
import Aos from 'aos';
import 'aos/dist/aos.css';
import Navigation from './components/Navigation';


const App = () => {
  // animate on scroll initialization
  Aos.init({
    duration: 1800,
    offset: 0,
  });
  return (
    
      <Navigation/>
  
  );
};

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import LoginRegister from './LoginRegister';
import Header from './Header';
import Dashboard from './Dashboard'
import Details from './Details'

export default function Navigation() {
  return (
    <div  className='lg:h-[900px] py-12'>
    <Header/>
    <Router>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" exact element={<LoginRegister/>} />
          <Route path="/dashboard" exact element={<Dashboard/>} />
          <Route path="/details" exact element={<Details/>} />
        </Routes>
    </Router>
    </div>
  )
}

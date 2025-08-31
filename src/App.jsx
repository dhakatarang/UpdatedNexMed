import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import DonateMedicine from './Pages/DonateMedicine/DonateMedicine';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donate" element={<DonateMedicine />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Features from './Pages/Features/Features';
import HowItWorks from './Pages/HowItWorks/Works';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Article1 from './Components/Article1/Article1';
import Article2 from './Components/Article2/Article2';
import Article3 from './Components/Article3/Article3';
import SignUp from './Components/SignUp/SignUp';
import DonateMedicine from './Pages/DonateMedicine/DonateMedicine';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/howItWorks" element={<HowItWorks/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<LoginSignUp/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/donate" element={<DonateMedicine/>} />
        <Route path="/articles/medicine-donation" element={<Article1/>} />
        <Route path="/articles/healthcare-gap" element={<Article2/>} />
        <Route path="/articles/ai-medicine" element={<Article3/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
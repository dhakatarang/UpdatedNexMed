import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import css from './HeroCarousel.module.css';

const HeroCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      title: 'Donate Medicines, Save Lives',
      description: 'Your unused medicines can bring hope to those in need. Join our platform to make healthcare accessible to all.',
      link: '/donate'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1576676934180-e8e5d48a4c64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Prevent Medicine Waste',
      description: '60% of medicines are wasted while millions lack access. Be part of the solution with our donation platform.',
      link: '/howItWorks'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80',
      title: 'AI-Powered Medicine Tracking',
      description: 'Our smart system tracks expiry dates and connects donors with verified NGOs efficiently.',
      link: '/features'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1576091160557-36efdcab53cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Join Our Community',
      description: 'Thousands have already donated medicines through our platform. Be part of this life-saving movement.',
      link: '/signup'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (carouselItems.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, carouselItems.length, currentIndex]); // Added currentIndex to dependencies

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1);
  };

  return (
    <section className={css.hero}>
      <div 
        className={css.carousel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={css.carouselInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {carouselItems.map((item, index) => (
            <div 
              key={item.id}
              className={css.carouselItem}
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
              }}
            >
              <div className={css.carouselContent}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <Link to={item.link} className={css.signUpBtn}>
                  {item.link === '/donate' ? 'DONATE NOW' : 'LEARN MORE'} <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        {carouselItems.length > 1 && (
          <>
            <button className={css.carouselArrowPrev} onClick={goToPrev}>
              &#10094;
            </button>
            <button className={css.carouselArrowNext} onClick={goToNext}>
              &#10095;
            </button>
          </>
        )}
        
        <ul className={css.carouselIndicators}>
          {carouselItems.map((_, index) => (
            <li 
              key={index}
              className={index === currentIndex ? css.active : ''}
              onClick={() => goToSlide(index)}
            ></li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HeroCarousel;
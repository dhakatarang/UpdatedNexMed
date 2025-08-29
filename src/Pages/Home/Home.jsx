import React from 'react';
import HeroCarousel from '../../Components/HeroCarousel/HeroCarousel';
import ArticlesSection from '../../Components/ArticleSection/ArticleSection';
import ImpactDashboard from '../../Components/ImpactDashboard/ImpactDashboard';
import MotivationBox from '../../Components/MotivationBox/MotivationBox';
import css from './Home.module.css';

const Home = () => {
  return (
    <div className={css.homeContainer}>
      <HeroCarousel />
      <ArticlesSection />
      <ImpactDashboard />
      <MotivationBox />
    </div>
  );
};

export default Home;
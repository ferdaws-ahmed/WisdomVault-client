import React from 'react';
import Navbar from '../../Components/common/Navbar';
import HeroSlider from './HeroSection';
import WhyLearningSection from './whyLearningSection';
import TopContributors from './TopContributors';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <TopContributors></TopContributors>
            <WhyLearningSection></WhyLearningSection>
        </div>
    );
};

export default Home;

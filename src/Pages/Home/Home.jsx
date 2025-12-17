import React from 'react';
import Navbar from '../../Components/common/Navbar';
import HeroSlider from './HeroSection';
import WhyLearningSection from './whyLearningSection';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <WhyLearningSection></WhyLearningSection>
        </div>
    );
};

export default Home;

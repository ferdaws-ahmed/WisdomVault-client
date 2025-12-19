import React from 'react';
import Navbar from '../../Components/common/Navbar';
import HeroSlider from './HeroSection';
import WhyLearningSection from './whyLearningSection';
import TopContributors from './TopContributors';
import CommunityImpactStats from './CommunityImpactStats';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            
            <WhyLearningSection></WhyLearningSection>
            <TopContributors></TopContributors>
            <CommunityImpactStats></CommunityImpactStats>
        </div>
    );
};

export default Home;

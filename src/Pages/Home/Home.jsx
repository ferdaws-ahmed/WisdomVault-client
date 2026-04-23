import React from 'react';
import Navbar from '../../Components/common/Navbar';
import HeroSlider from './HeroSection';
import FeaturedLessons from './FeaturedLessons';
import WhyLearningSection from './whyLearningSection';
import TopContributors from './TopContributors';
import CommunityImpactStats from './CommunityImpactStats';
import FaqSection from './FAQSection';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <FeaturedLessons></FeaturedLessons>
            <WhyLearningSection></WhyLearningSection>
            <TopContributors></TopContributors>
            <CommunityImpactStats></CommunityImpactStats>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;

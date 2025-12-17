"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import Button from "../../Components/ui/Button";

// **Dark Mode Images (Existing)**
import lifeAdviceImg from '../../assets/hero-assets/life-advice.png';
import motivationImg from '../../assets/hero-assets/motivation.png';

import personalGrowthImg from '../../assets/hero-assets/personal-growth.png';
import lifeSkillsImg from '../../assets/hero-assets/life-skills.png';
import dailyWisdomImg from '../../assets/hero-assets/daily-wisdom.png';
import psychologyImg from '../../assets/hero-assets/psychology.png';

// **Light Mode Images 
import motivationLightImg from '../../assets/hero-assets/motivation-light.png'; 
import lifeAdviceLightImg from '../../assets/hero-assets/life-advice-light.png'; 
import personalGrowthLightImg from '../../assets/hero-assets/personal-growth-light.png'; 
import lifeSkillsLightImg from '../../assets/hero-assets/life-skills-light.png';
import dailyWisdomLightImg from '../../assets/hero-assets/daily-wisdom-light.png';
import psychologyLightImg from '../../assets/hero-assets/psychology-light.png';


const slides = [
  {
    title: "Life Advice",
    subtitle: "Navigate the complexities of life with timeless wisdom. Get simple, actionable insights to improve your daily decisions.",
    color: "text-blue-400",
    image: lifeAdviceImg, // Dark Mode Default
    lightImage: lifeAdviceLightImg, // Light Mode Version
    buttonText: "Explore Life Advice",
  },
  {
    title: "Personal Growth",
    subtitle: "Unlock your full potential and evolve into the best version of yourself through consistent improvement.",
    color: "text-green-400",
    image: personalGrowthImg, // Dark Mode Default
    lightImage: personalGrowthLightImg, // Light Mode Version
    buttonText: "Start Growing",
  },
  {
    title: "Motivation",
    subtitle: "Stay inspired and keep moving forward with powerful stories, ideas, and mindset techniques.",
    color: "text-red-400",
    image: motivationImg, // Dark Mode Default
    lightImage: motivationLightImg, // Light Mode Version
    buttonText: "Get Inspired",
  },
  {
    title: "Life Skills",
    subtitle: "Learn essential skills to thrive in modern life—from communication to critical thinking.",
    color: "text-purple-400",
    image: lifeSkillsImg, // Dark Mode Default
    lightImage: lifeSkillsLightImg, // Light Mode Version
    buttonText: "Master New Skills",
  },
  {
    title: "Daily Wisdom",
    subtitle: "Gain fresh insights each day that guide your thoughts, decisions, and personal growth.",
    color: "text-yellow-400",
    image: dailyWisdomImg, // Dark Mode Default
    lightImage: dailyWisdomLightImg, // Light Mode Version
    buttonText: "Get Daily Wisdom",
  },
  {
    title: "Psychology",
    subtitle: "Understand the human mind and behavior to improve relationships and emotional intelligence.",
    color: "text-pink-400",
    image: psychologyImg, // Dark Mode Default
    lightImage: psychologyLightImg, // Light Mode Version
    buttonText: "Understand Psychology",
  },
];

// Motion Variants
const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subtitleRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 1, ease: "easeOut" } },
};

const buttonEnterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.8, ease: "easeOut" } },
};

const breathingVariants = {
  hover: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } },
};

export default function HeroSlider() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const currentSlide = slides[index];

  //image selection logic
  const currentImage = theme === 'light' 
    ? (currentSlide.lightImage || currentSlide.image) 
    : currentSlide.image;

  const nextSlide = useCallback(() => setIndex((prev) => (prev + 1) % slides.length), []);
  const prevSlide = useCallback(() => setIndex((prev) => (prev - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden bg-gray-900">
      {/* Background */}
      <AnimatePresence initial={false}>
        <motion.div
          
          key={index + theme} 
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0 bg-cover bg-center"
          
          style={{ backgroundImage: `url(${currentImage})` }}
        >
          <div
            
            className={`absolute inset-0 ${
              theme === "light" ? "bg-black/40" : "bg-black/70"
            }`}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="max-w-4xl flex flex-col items-center mx-auto"
          >
            <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl ${currentSlide.color}`}>
              <Typewriter
                words={[currentSlide.title]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={20}
                delaySpeed={500}
              />
            </h1>

            <motion.p
              variants={subtitleRevealVariants}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
            >
              {currentSlide.subtitle}
            </motion.p>

            <motion.div
              variants={buttonEnterVariants}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <motion.div variants={breathingVariants} whileHover="hover">
                <Button className="px-8 py-3 text-lg rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition">
                  {currentSlide.buttonText}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls (Hide on small devices) */}
      <div className="hidden md:block">
        <button
          onClick={prevSlide}
          className="absolute z-20 top-1/2 -translate-y-1/2 left-4 bg-white/20 p-3 rounded-full text-white hover:bg-white/40 backdrop-blur transition-colors duration-200"
          aria-label="Previous Slide"
        >
          <ArrowLeft size={26} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute z-20 top-1/2 -translate-y-1/2 right-4 bg-white/20 p-3 rounded-full text-white hover:bg-white/40 backdrop-blur transition-colors duration-200"
          aria-label="Next Slide"
        >
          <ArrowRight size={26} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 z-20 flex gap-2 justify-center w-full">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === i ? "bg-white scale-150" : "bg-gray-300/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
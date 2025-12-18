import { useEffect, useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const TopContributors = () => {
  const { theme } = useTheme();
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const crowns = ["👑", "🥈", "🥉"];

  
  const crownAnimations = [
    "animate-[bounce_2.5s_infinite] drop-shadow-[0_10px_10px_rgba(255,215,0,0.5)]", 
    "animate-wiggle",                                                              
    "animate-[pulse_2s_ease-in-out_infinite] scale-110"                            
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/top-contributors`)
      .then((res) => res.json())
      .then((data) => {
        setContributors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section
      className={`py-12 md:py-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: translateX(-50%) rotate(-7deg); }
            50% { transform: translateX(-50%) rotate(7deg); }
          }
          .animate-wiggle {
            animation: wiggle 1.2s ease-in-out infinite;
          }
          .swiper-button-next, .swiper-button-prev {
            transform: scale(0.7);
          }
          @media (min-width: 768px) {
            .swiper-button-next, .swiper-button-prev {
              transform: scale(1);
            }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-16">
          🏆 Top Contributors
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          style={{ overflow: 'visible' }} 
          className="pb-20 pt-10" 
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 10 },
            480: { slidesPerView: 1.4, spaceBetween: 15 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 30 },
            1280: { slidesPerView: 4.2, spaceBetween: 20 }
          }}
        >
          {contributors.map((user, index) => (
            <SwiperSlide key={user._id} className="flex justify-center" style={{ overflow: 'visible' }}>
              <div
                className={`relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[340px] rounded-3xl p-6 md:p-8 text-center backdrop-blur-md bg-opacity-40 border border-opacity-20 shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl overflow-visible ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-gray-100"
                    : "bg-white border-gray-200 text-gray-900 shadow-gray-200"
                }`}
              >
                {/* Rank Badge */}
                <span className={`absolute top-4 right-4 font-bold text-xs px-2 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  #{index + 1}
                </span>

                {/* Animated Crowns */}
                {index < 3 && (
                  <span className={`absolute -top-8 left-1/2 -translate-x-1/2 text-5xl z-20 ${crownAnimations[index]}`}>
                    {crowns[index]}
                  </span>
                )}

                {/* Profile Image */}
                <img
                  src={user.photo}
                  alt={user._id}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-4 border-4 border-primary object-cover shadow-lg"
                />

                <h3 className="font-bold text-lg md:text-xl mb-3 truncate px-2">
                    {user._id}
                </h3>

                {/* Stats Container */}
                <div className={`text-sm space-y-2 py-3 px-4 rounded-2xl mb-4 ${
                    theme === 'dark' ? 'bg-black/20' : 'bg-gray-50'
                }`}>
                  <p className="flex justify-between">
                      <span className="opacity-70">📘 Lessons:</span> 
                      <span className="font-bold">{user.totalLessons}</span>
                  </p>
                  <p className="flex justify-between">
                      <span className="opacity-70">❤️ Likes:</span> 
                      <span className="font-bold">{user.totalLikes}</span>
                  </p>
                  <p className="flex justify-between">
                      <span className="opacity-70">🔖 Favorites:</span> 
                      <span className="font-bold">{user.totalFavorites}</span>
                  </p>
                </div>

                {/* Score */}
                <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Total Score</p>
                    <div className="text-2xl font-black text-primary">
                    {user.score}
                    </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopContributors;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Eye, Clock, User, ArrowRight } from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext';

const FeaturedLessons = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = "https://wisdomvaultserver-l1x3pt82e-alif-mahmuds-projects-07063357.vercel.app";
    
    const fetchFeaturedLessons = async () => {
      try {
        console.log("Fetching featured lessons from:", `${API_URL}/featured-lessons`);
        const response = await fetch(`${API_URL}/featured-lessons`);
        const data = await response.json();
        console.log("Featured lessons received:", data);
        setLessons(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured lessons:", error);
        setLoading(false);
      }
    };

    fetchFeaturedLessons();
  }, []);

  if (loading) {
    return (
      <section className={`py-16 ${isLight ? "bg-gray-50" : "bg-gray-900"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isLight ? "text-gray-800" : "text-gray-100"}`}>
              Featured Lessons
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`animate-pulse rounded-xl h-64 ${isLight ? "bg-gray-200" : "bg-gray-800"}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 transition-colors duration-300 ${isLight ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLight ? "text-gray-800" : "text-gray-100"}`}>
              🌟 Featured Lessons
            </h2>
            <p className={`text-lg ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              Most loved and appreciated wisdom from our community
            </p>
          </motion.div>
        </div>

        {/* Lessons Grid - 2 rows, 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isLight ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"
              }`}
            >
              {/* Lesson Content */}
              <div className="p-6">
                {/* Category & Tone Badges */}
                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isLight ? "bg-blue-100 text-blue-700" : "bg-blue-900 text-blue-300"
                  }`}>
                    {lesson.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900 text-purple-300"
                  }`}>
                    {lesson.emotionalTone}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${
                  isLight ? "text-gray-800" : "text-gray-100"
                }`}>
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 line-clamp-3 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}>
                  {lesson.shortDescription}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={lesson.authorPhoto || "https://via.placeholder.com/32"}
                    alt={lesson.authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className={`text-sm font-medium ${isLight ? "text-gray-700" : "text-gray-300"}`}>
                    {lesson.authorName}
                  </span>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-3">
                    <span className={`flex items-center gap-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                      <Heart size={14} />
                      {lesson.likesCount || 0}
                    </span>
                    <span className={`flex items-center gap-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                      <Bookmark size={14} />
                      {lesson.favoritesCount || 0}
                    </span>
                    <span className={`flex items-center gap-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                      <Eye size={14} />
                      {lesson.viewsCount || 0}
                    </span>
                  </div>
                  <span className={`flex items-center gap-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                    <Clock size={14} />
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <Link
                  to={`/lesson/${lesson._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Explore All Lessons
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
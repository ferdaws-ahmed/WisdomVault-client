import React, { useEffect, useState } from "react";
import { BookOpen, Users, Bookmark, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityImpactStats() {
  const [stats, setStats] = useState({
    totalLessons: 0,
    totalUsers: 0,
    totalFavorites: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    fetch("https://wisdomvaultserver.vercel.app/community-stats")
      .then(res => res.json())
      .then(data => {
        setStats({
          totalLessons: data?.totalLessons || 0,
          totalUsers: data?.totalUsers || 0,
          totalFavorites: data?.totalFavorites || 0,
          totalCategories: data?.totalCategories || 0,
        });
      });
  }, []);

  return (
    <section
      className="
        py-20
        bg-white
        dark:bg-[#020617]
        transition-colors duration-300
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 text-center"
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold
          text-slate-900 dark:text-white">
          Community Impact
        </h2>

        <p className="mt-3 mb-14 max-w-xl mx-auto
          text-slate-600 dark:text-slate-400">
          Real numbers that reflect the strength of our community
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-14">
          <Stat icon={BookOpen} value={stats.totalLessons} label="Lessons" />
          <Stat icon={Users} value={stats.totalUsers} label="Contributors" />
          <Stat icon={Bookmark} value={stats.totalFavorites} label="Favorites" />
          <Stat icon={Globe} value={stats.totalCategories} label="Categories" />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center"
    >
      {/* Icon */}
      <div
        className="
          mb-5 h-16 w-16 rounded-full flex items-center justify-center
          bg-slate-100 dark:bg-slate-800
        "
      >
        <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
      </div>

      {/* Number */}
      <h3 className="text-4xl font-extrabold
        text-slate-900 dark:text-white">
        {Number(value).toLocaleString()}+
      </h3>

      {/* Label */}
      <p className="mt-2 text-sm uppercase tracking-wider
        text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </motion.div>
  );
}

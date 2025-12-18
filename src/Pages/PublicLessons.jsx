import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import { Link } from "react-router";

// Debounce function
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Memoized Lesson Card
const LessonCard = React.memo(({ lesson, user, theme }) => {
  const isLocked = lesson.accessLevel === "premium" && !user?.isPremium;

  // Card styling based on theme
  const cardBase = `
    relative rounded-xl overflow-hidden transition-transform duration-300
    w-full
    ${theme === "dark" ? "bg-gray-800 text-gray-100 shadow-lg hover:scale-105 hover:shadow-2xl" 
                         : "bg-white text-gray-900 shadow-md hover:scale-105 hover:shadow-xl"}
  `;

  const badgeCategory =
    theme === "dark"
      ? "bg-indigo-500 text-white"
      : "bg-indigo-100 text-indigo-800";
  const badgeTone =
    theme === "dark"
      ? "bg-emerald-500 text-white"
      : "bg-emerald-100 text-emerald-800";
  const badgePremium =
    theme === "dark"
      ? "bg-yellow-500 text-black"
      : "bg-yellow-200 text-yellow-900";

  return (
    <div className={cardBase}>
      <img
        src={`${lesson.image}?w=400&h=300&fit=crop`}
        alt={lesson.title}
        loading="lazy"
        className={`h-48 w-full object-cover ${isLocked ? "blur-sm" : ""}`}
      />
      <div className={`p-5 ${isLocked ? "blur-sm" : ""}`}>
        <h3 className={`text-xl font-bold mb-2 ${theme === "light" ? "text-indigo-700" : ""}`}>
          {lesson.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-3">{lesson.shortDescription}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-xs mb-4">
          <span className={`px-2 py-1 rounded-full ${badgeCategory}`}>{lesson.category}</span>
          <span className={`px-2 py-1 rounded-full ${badgeTone}`}>{lesson.emotionalTone}</span>
          {lesson.accessLevel === "premium" && (
            <span className={`px-2 py-1 rounded-full ${badgePremium}`}>Premium</span>
          )}
        </div>

        {/* Creator */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img src={lesson.creator.photo} alt={lesson.creator.name} className="w-8 h-8 rounded-full" />
            <span>{lesson.creator.name}</span>
          </div>
          <span className="opacity-70">{lesson.createdAt}</span>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <Link
            to={`/lesson-details/${lesson._id}`}
            className={`inline-block text-sm font-medium ${
              theme === "dark" ? "text-indigo-400 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-800"
            } hover:underline`}
          >
            See Details →
          </Link>
        </div>
      </div>

      {/* Premium Overlay */}
      {isLocked && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${
            theme === "dark" ? "bg-black/60 text-white" : "bg-white/70 text-black"
          }`}
        >
          <Lock className="w-9 h-9 mb-2" />
          <p className="font-semibold mb-3">Premium Lesson</p>
          <Link
            to="/pricing"
            className={`px-4 py-2 rounded-lg font-medium ${
              theme === "dark" ? "bg-yellow-400 text-black" : "bg-yellow-200 text-yellow-900"
            }`}
          >
            Upgrade to View
          </Link>
        </div>
      )}
    </div>
  );
});

export default function PublicLessons() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/lessons")

      .then(res => res.json())
      .then(data => {
        setLessons(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = useCallback(
    debounce((value) => setSearch(value), 200),
    []
  );

  const filteredLessons = useMemo(() => {
    return lessons
      .filter(lesson => lesson.title.toLowerCase().includes(search.toLowerCase()))
      .filter(lesson => categoryFilter === "All" ? true : lesson.category === categoryFilter);
  }, [lessons, search, categoryFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const categories = ["All", ...new Set(lessons.map(l => l.category))];
  const sectionBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <section className={`${sectionBg} min-h-screen w-full px-4 py-12`}>
      {/* Title */}
      <h1 className={`text-3xl md:text-5xl font-extrabold text-center mb-6 ${theme === "light" ? "text-indigo-700 drop-shadow-md" : textColor}`}>
        Public Life Lessons
      </h1>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 w-full">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full sm:w-1/3"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full sm:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredLessons.map(lesson => (
          <LessonCard key={lesson._id} lesson={lesson} user={user} theme={theme} />
        ))}
      </div>
    </section>
  );
}

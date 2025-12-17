import React, { useEffect, useMemo, useState } from "react";

import { useParams, useNavigate, Link } from "react-router"; 

import { Lock, Calendar, Hourglass, Globe } from "lucide-react"; 
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import toast from "react-hot-toast";

export default function LessonDetails() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  const [allLessons, setAllLessons] = useState([]);
  const [lesson, setLesson] = useState(null);

  // States updated according to the new JSON properties
  const [likesCount, setLikesCount] = useState(0);
  const [savesCount, setSavesCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0); // State for the new Views property
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const [shareOpen, setShareOpen] = useState(false);

  // Estimated Reading Time calculation
  const readingTime = lesson ? Math.ceil(lesson.fullDescription.split(/\s+/).length / 200) : 0;

  /* ================= FETCH (Static JSON Demo) ================= */
  useEffect(() => {
    fetch("/public-lessons.json")
      .then((res) => res.json())
      .then((data) => {
        setAllLessons(data);
        const found = data.find((l) => l._id === lessonId);
        
        if (found) {
          setLesson(found);
          // FIXED: Correct property names from JSON are used: likesCount, favoritesCount, viewsCount
          setLikesCount(found.likesCount || 0);
          setSavesCount(found.favoritesCount || 0); 
          setViewsCount(found.viewsCount || 0);
          setComments(found.comments || []);
          
        }
      })
      .catch(err => {
        console.error("Error loading lesson:", err);
      });
  }, [lessonId]);

  /* ================= SIMILAR LESSONS ================= */
  const similarLessons = useMemo(() => {
    if (!lesson) return [];
    return allLessons
      .filter(
        (l) =>
          l._id !== lesson._id &&
          (l.category === lesson.category ||
            l.emotionalTone === lesson.emotionalTone)
      )
      .slice(0, 6);
  }, [lesson, allLessons]);

  /* ================= GUARD (Loading/Skeleton) ================= */
  if (!lesson) {
    return (
      <div className={`min-h-screen px-6 py-20 animate-pulse ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6" />
        <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
    );
  }

  const isLocked = lesson.accessLevel === "premium" && !user?.isPremium;
  const isLessonOwner = user?._id === lesson.creator._id; 

  /* ================= HANDLERS ================= */
  const handleLike = () => {
    if (!user) {
      toast.error("Please log in to like");
      return;
    }
    const isLiking = !liked;
    setLiked(isLiking);
    setLikesCount((c) => (isLiking ? c + 1 : c - 1));
    
  };

  const handleSave = () => {
    if (!user) {
      toast.error("Please log in to save");
      return;
    }
    const isSaving = !saved;
    setSaved(isSaving);
    setSavesCount((c) => (isSaving ? c + 1 : c - 1));
    toast.success(isSaving ? "Saved to favorites" : "Removed from favorites");
   
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }
    if (!commentInput.trim()) return;

    // Create current date in YYYY-MM-DD format for new comment
    const today = new Date();
    const formattedDate = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, '0') + "-" +
      String(today.getDate()).padStart(2, '0');

    const newComment = {
        // Changed according to JSON structure
        name: user.name || "Demo User", 
        comment: commentInput,
        date: formattedDate 
    };

    setComments((p) => [...p, newComment]);
    setCommentInput("");
    toast.success("Comment added successfully!"); 
    
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: lesson.title,
        text: lesson.shortDescription,
        url: window.location.href,
      });
    } else {
      setShareOpen(true);
    }
  };

  const submitReport = () => {
    if (!reportReason) {
      toast.error("Select a reason for the report.");
      return;
    }
   

    setReportOpen(false);
    toast.success("Report submitted successfully! We will review it shortly."); 
    setReportReason("");
  };

  /* ================= RENDER ================= */
  return (
    <section
      className={`min-h-screen transition-colors ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      {/* ================= HERO ================= */}
      <div className="relative h-[60vh]">
        <img
          src={lesson.image}
          className={`absolute inset-0 w-full h-full object-cover ${
            isLocked && "blur-md"
          }`}
          alt={lesson.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 h-full flex items-end px-6 pb-10">
          <div>
            <div className={`flex gap-3 mb-3 ${theme === "dark"? "text-white": "text-white"}`}>
              <span className="reaction-badge">📘 {lesson.category}</span>
              <span className="reaction-badge">✨ {lesson.emotionalTone}</span>
            </div>

            <h1 className="mb-10 text-4xl md:text-5xl font-extrabold text-white">
              {lesson.title}
            </h1>
          </div>
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
            <Lock className="w-10 h-10 mb-3" />
            <p className="mt-3 mb-4 text-xl font-semibold">Premium Lesson: Upgrade to Unlock</p>
            <button
              onClick={() => navigate("/pricing")}
              className="px-6 py-2 bg-yellow-400 text-black rounded-full font-bold shadow-xl hover:scale-[1.03] transition duration-200"
            >
              Upgrade to Unlock
            </button>
          </div>
        )}
      </div>

      {/* ================= AUTHOR (Creator Section - Fixed Style) ================= */}
      <div className="max-w-4xl mx-auto -mt-10 px-6 relative z-20">
        <div className={`p-5 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 ${theme === "dark" ? "bg-gray-900": "bg-white"} flex items-center justify-between gap-4`}>
          {/* Left Side: Image, Name/Lesson Count */}
          <div className="flex items-center gap-4">
            <img
              src={lesson.creator.photo || "/default-avatar.png"}
              className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
              alt={lesson.creator.name}
            />
            <div>
              <h4 className="font-semibold text-lg">{lesson.creator.name}</h4>
              <p className="text-sm opacity-70">
                {lesson.creator.lessonCount || 'N/A'} lessons published
              </p>
            </div>
          </div>
          {/* Right Side: View Profile Link */}
          <Link to="/profile" className="text-indigo-500 font-medium hover:text-indigo-400 transition flex items-center gap-1 shrink-0">
            View profile →
          </Link>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className={`px-6 py-14 ${isLocked && "blur-sm"}`}>
        <div className="max-w-3xl mx-auto">

          {/* Metadata */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-70 mb-6 border-b pb-4 border-gray-200 dark:border-gray-800">
            <span className="flex items-center gap-1"><Calendar size={14} /> Created: {lesson.createdAt || "2024-01-01"}</span>
            <span className="flex items-center gap-1"><Globe size={14} /> {lesson.visibility || 'Public'}</span>
            <span className="flex items-center gap-1"><Hourglass size={14} /> {readingTime} min read</span>
          </div>

          <p className="text-lg leading-relaxed mb-8 whitespace-pre-line">
            {lesson.fullDescription}
          </p>

          {/* STATS */}
          <div className="flex gap-6 mb-6 font-semibold border-t pt-4 border-gray-200 dark:border-gray-800">
            <span className="text-red-500">❤️ {likesCount} Likes</span>
            <span className="text-emerald-500">🔖 {savesCount} Favorites</span>
            <span className="opacity-70">👀 {viewsCount.toLocaleString()} Views</span> 
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={handleLike}
              className={`reaction-btn ${liked ? "liked" : ""}`}
              title={liked ? "Unlike" : "Like"}
            >
              {liked ? "💖" : "❤️"} Like
            </button>

            <button
              onClick={handleSave}
              className={`reaction-btn ${saved ? "saved" : ""}`}
              title={saved ? "Remove from Favorites" : "Save to Favorites"}
            >
              {saved ? "✅ Saved" : "🔖 Save"}
            </button>

            <button onClick={handleShare} className="reaction-btn">
              🔗 Share
            </button>

            <button
              onClick={() => setReportOpen(true)}
              className="reaction-btn text-red-500 hover:text-red-400"
            >
              🚩 Report
            </button>
          </div>

          {/* COMMENTS */}
          <h3 className="text-xl font-bold mb-4 border-t pt-6 border-gray-200 dark:border-gray-800">
            Comments ({comments.length})
          </h3>

          <form onSubmit={handleComment} className="mb-8 flex gap-3">
            <input
              className={`p-3 rounded-lg shadow-sm flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder={user ? "Write a comment..." : "Log in to comment..."}
              disabled={!user}
            />
            <button
              className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={!user || !commentInput.trim()}
            >
              Post
            </button>
          </form>

          {/* Comment List - 'date' added */}
          <div className="space-y-4">
            {comments.map((c, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-sm`}
              >
                {/* Updated to display 'name' and 'date' according to JSON structure */}
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold opacity-90">{c.name}</p>
                  <p className="text-xs opacity-50">{c.date}</p>
                </div>
                <p className="text-sm mt-1">{c.comment}</p>
              </div>
            ))}
          </div>

          {/* SIMILAR */}
          <h3 className="text-2xl font-bold mt-14 mb-6 border-t pt-6 border-gray-200 dark:border-gray-800">
            Recommended Lessons
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarLessons.map((item) => {
              const locked =
                item.accessLevel === "premium" && !user?.isPremium;

              return (
                <div
                  key={item._id}
                  onClick={() => {
                    if(locked) {
                      navigate("/pricing");
                    } else {
                      navigate(`/lesson-details/${item._id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="cursor-pointer relative block rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
                >
                  <img src={item.image} alt={item.title} className={`h-44 w-full object-cover ${locked ? "blur-md" : ""}`} />
                  {locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-xl">
                      <Lock size={20} className="mr-2"/> Premium
                    </div>
                  )}
                  <div className={`p-3 ${theme==="dark" ? "text-white": "text-black"}`}>
                    <h4 className="font-semibold truncate">{item.title}</h4>
                    <p className="text-xs opacity-70 mt-1">{item.category}</p>
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      </div>

      {/* ================= REPORT MODAL ================= */}
      {reportOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 max-w-[90%] shadow-2xl transform scale-100 transition-transform">
            <h3 className="font-bold text-xl mb-4 text-red-500">🚩 Report Lesson</h3>
            <p className="text-sm opacity-80 mb-4">Please select the most appropriate reason for reporting this lesson.</p>

            <select
              className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg mb-6 dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">Select reason</option>
              <option>Inappropriate Content</option>
              <option>Hate Speech or Harassment</option>
              <option>Misleading or False Information</option>
              <option>Spam or Promotional Content</option>
              <option>Sensitive or Disturbing Content</option>
              <option>Other</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReportOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
                disabled={!reportReason}
              >
                Submit Report
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= SHARE FALLBACK ================= */}
      {shareOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h3 className="font-bold text-xl mb-4">🔗 Share Lesson</h3>
            <div className="flex flex-col gap-3">
              <a href={`mailto:?body=${window.location.href}`} className="text-indigo-500 hover:text-indigo-400">📧 Email</a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(lesson.title + " - " + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400"
              >
                💬 WhatsApp
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                  setShareOpen(false);
                }}
                className="text-gray-500 hover:text-gray-400 text-left"
              >
                📋 Copy link
              </button>
            </div>
            <button
              onClick={() => setShareOpen(false)}
              className="mt-6 text-sm bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
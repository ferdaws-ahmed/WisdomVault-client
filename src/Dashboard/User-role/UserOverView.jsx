import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { FaBook, FaHeart, FaPlusCircle, FaChartBar } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const UserOverview = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      if (!user?.token) return;
      try {
        const res = await axios.get("http://localhost:3000/dashboard/my-lessons", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLessons(res.data || []);
      } catch (err) {
        console.error("Failed to fetch my lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [user?.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  /* ================= MONTHLY CONTRIBUTIONS ================= */
  const monthMap = {
    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
    6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec",
  };

  const monthlyCounts = Array(12).fill(0);
  lessons.forEach((lesson) => {
    const month = new Date(lesson.createdAt).getMonth();
    monthlyCounts[month]++;
  });

  const chartData = monthlyCounts.map((count, idx) => ({
    month: monthMap[idx],
    lessons: count,
  }));

  /* ================= QUICK STATS ================= */
  const totalLessons = lessons.length;
  const savedLessons = lessons.reduce((sum, l) => sum + (l.favoritesCount || 0), 0);
  const thisMonth = new Date().getMonth();
  const lessonsThisMonth = chartData[thisMonth]?.lessons || 0;

  /* ================= RECENT LESSONS ================= */
  const recentLessons = [...lessons].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 5); // last 5 lessons

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="opacity-70 text-sm">Welcome back, {user?.name || "User"}</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<FaBook className="text-blue-500" />} title="Total Lessons" value={totalLessons} />
        <StatCard icon={<FaHeart className="text-red-500" />} title="Saved Lessons" value={savedLessons} />
        <StatCard icon={<FaChartBar className="text-green-500" />} title="This Month" value={lessonsThisMonth} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-4 flex-wrap">
        <ActionButton icon={<FaPlusCircle />} text="Add New Lesson" />
        <ActionButton icon={<FaBook />} text="My Lessons" />
        <ActionButton icon={<FaHeart />} text="Saved Lessons" />
      </div>

      {/* MONTHLY ANALYTICS CHART */}
      <div className="bg-base-100 p-6 border rounded-xl shadow-sm">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <FaChartBar /> Monthly Contributions
        </h2>
        {lessons.length === 0 ? (
          <div className="h-[200px] flex items-center justify-center border-dashed border-2 rounded-lg">
            <p className="text-sm opacity-60 text-center">No activity recorded yet for the chart.</p>
          </div>
        ) : (
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Line
                  type="monotone"
                  dataKey="lessons"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      
      {/* RECENT LESSONS */}
<div>
  <h2 className="font-semibold mb-3">Recently Added Lessons</h2>
  {recentLessons.length === 0 ? (
    <div className="p-8 border-dashed border-2 rounded-lg text-center opacity-60 text-sm">
      You haven't added any lessons yet.
    </div>
  ) : (
    <ul className="space-y-3">
      {recentLessons.map((lesson) => (
        <li
          key={lesson._id}
          className="p-4 border rounded-lg bg-base-100 flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          {/* Lesson Image */}
          {lesson.image ? (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-xs opacity-50">
              No Image
            </div>
          )}

          <div className="flex-1 flex flex-col justify-between">
            <span className="font-medium">{lesson.title}</span>
            <span className="text-xs px-2 py-1 bg-base-200 rounded-full opacity-70 mt-1 w-fit">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default UserOverview;

/* ---------------- SMALL COMPONENTS ---------------- */
const StatCard = ({ icon, title, value }) => (
  <div className="p-6 bg-base-100 border rounded-xl flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors">
    <div className="text-3xl p-3 bg-base-200 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium opacity-60 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ icon, text }) => (
  <button className="flex items-center gap-2 px-5 py-2.5 border rounded-lg font-medium hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm">
    {icon} {text}
  </button>
);

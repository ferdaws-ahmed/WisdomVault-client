import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import {
  FaBook,
  FaHeart,
  FaPlusCircle,
  FaChartBar,
} from "react-icons/fa";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        // নিশ্চিত করুন ব্যাকএন্ডে /dashboard/overview রাউটটি আছে
        const res = await axios.get(
          "http://localhost:3000/dashboard/overview",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, // Optional chaining for safety
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Dashboard overview error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) loadOverview();
  }, [user]);

  // ১. লোডিং স্টেট চেক
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  /* ================= MONTHLY CHART DATA ================= */
  const monthMap = {
    1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
    7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
  };

  // Safe data mapping
  const chartData =
    data?.monthlyStats?.map((item) => ({
      month: monthMap[item._id] || `M${item._id}`,
      lessons: item.count || 0,
    })) || [];

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="opacity-70 text-sm">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      {/* STATS - Safe access with default values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaBook className="text-blue-500" />}
          title="Total Lessons"
          value={data?.totalLessons || 0}
        />
        <StatCard
          icon={<FaHeart className="text-red-500" />}
          title="Saved Lessons"
          value={data?.totalFavorites || 0}
        />
        <StatCard
          icon={<FaChartBar className="text-green-500" />}
          title="This Month"
          value={chartData.reduce((sum, item) => sum + item.lessons, 0)}
        />
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

        {chartData.length === 0 ? (
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
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="lessons"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* RECENT LESSONS - Safe Mapping */}
      <div>
        <h2 className="font-semibold mb-3">Recently Added Lessons</h2>
        <ul className="space-y-3">
          {data?.recentLessons && data.recentLessons.length > 0 ? (
            data.recentLessons.map((lesson) => (
              <li
                key={lesson._id}
                className="p-4 border rounded-lg bg-base-100 flex justify-between items-center hover:shadow-md transition-shadow"
              >
                <span className="font-medium">{lesson.title}</span>
                <span className="text-xs px-3 py-1 bg-base-200 rounded-full opacity-70">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <div className="p-8 border-dashed border-2 rounded-lg text-center opacity-60 text-sm">
              You haven't added any lessons yet.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserOverview;

/* ---------------- SMALL COMPONENTS (Refined) ---------------- */

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
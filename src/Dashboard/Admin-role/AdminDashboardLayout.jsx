import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaFlag, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-6 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="text-white text-xl" />
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    reportedLessons: 0,
    weeklyGrowth: "0",
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentLessons, setRecentLessons] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token"); // Firebase token

        // ------------------ STATS ------------------
        const statsRes = await axios.get("http://localhost:3000/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

        // ------------------ Recent Users ------------------
        const usersRes = await axios.get("http://localhost:3000/admin/recent-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentUsers(usersRes.data.map(u => ({
          ...u,
          createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
        })));

        // ------------------ Recent Lessons ------------------
        const lessonsRes = await axios.get("http://localhost:3000/admin/recent-lessons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentLessons(lessonsRes.data.map(l => ({
          ...l,
          createdAt: l.createdAt ? new Date(l.createdAt) : new Date(),
        })));

      } catch (err) {
        console.error("Failed to load admin dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm opacity-70 mt-1">System overview & moderation controls</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={FaUsers} color="bg-blue-500" />
        <StatCard title="Total Lessons" value={stats.totalLessons} icon={FaBook} color="bg-green-500" />
        <StatCard title="Reported Lessons" value={stats.reportedLessons} icon={FaFlag} color="bg-red-500" />
        <StatCard title="Weekly Growth" value={stats.weeklyGrowth} icon={FaChartLine} color="bg-purple-500" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="p-6 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Recent Users</h3>
          <ul className="space-y-3 text-sm">
            {recentUsers.length > 0 ? recentUsers.map(u => (
              <li key={u.email} className="flex justify-between">
                <span>{u.name}</span>
                <span className="opacity-60">{u.createdAt.toLocaleDateString()}</span>
              </li>
            )) : <li className="opacity-60">No users found</li>}
          </ul>
        </div>

        {/* Recent Lessons */}
        <div className="p-6 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Recently Added Lessons</h3>
          <ul className="space-y-3 text-sm">
            {recentLessons.length > 0 ? recentLessons.map(l => (
              <li key={l._id} className="flex justify-between">
                <span>{l.title}</span>
                <span className="opacity-60">{l.visibility}</span>
              </li>
            )) : <li className="opacity-60">No lessons found</li>}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
            <Link to={'manage-users'}> <button className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Manage Users</button></Link>
         
          <button className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Review Lessons</button>
          <button className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">View Reports</button>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

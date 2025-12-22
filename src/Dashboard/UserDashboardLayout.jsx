import { NavLink, Outlet, Link, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import {
  FaChartPie,
  FaPlus,
  FaBook,
  FaUsers,
  FaFlag,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "../Components/ui/Logo";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  /* ===========================
     🔐 ROLE BASED AUTO REDIRECT
     =========================== */
  useEffect(() => {
    if (!user) return;

    if (isAdmin && location.pathname === "/dashboard") {
      navigate("/dashboard/admin", { replace: true });
    }

    if (!isAdmin && location.pathname.startsWith("/dashboard/admin")) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isAdmin, location.pathname, navigate]);

  /* ===========================
     STYLES
     =========================== */
  const baseLink =
    "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors rounded-md";
  const activeLink = "font-semibold underline";
  const inactiveLink = "hover:underline";

  const wrapperClass =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-50 text-gray-900";

  const sidebarClass =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-300";

  const contentClass =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-300";

  const hoverClass =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  return (
    <div className={`min-h-screen ${wrapperClass}`}>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
        <button onClick={() => setSidebarOpen(true)}>
          <FaBars size={20} />
        </button>
        <Logo />
      </div>

      <div className="flex min-h-screen md:p-10">
        {/* ===== OVERLAY (mobile) ===== */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed md:static z-50
            w-[280px] md:w-[320px]
            h-full md:h-auto
            flex flex-col border
            transform transition-transform duration-300
            ${sidebarClass}
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          {/* CLOSE BTN (mobile) */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* LOGO */}
          <div className="px-8 py-6 border-b">
            <Logo />
            <p className="text-xs opacity-60 mt-2 tracking-wide">
              DASHBOARD PANEL
            </p>
          </div>

          {/* USER INFO */}
          <div className="px-8 py-6 border-b">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs opacity-60 break-all">{user?.email}</p>
            <p className="text-xs mt-2 uppercase tracking-wide opacity-70">
              {isAdmin ? "ADMIN" : "USER"}
            </p>
          </div>

          {/* NAV LINKS */}
          <nav className="flex-1 py-4 space-y-1">
            {isAdmin ? (
              <>
                <NavLink to="/dashboard/admin" end className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaChartPie /> Admin Overview
                </NavLink>

                <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaUsers /> Manage Users
                </NavLink>

                <NavLink to="/dashboard/admin/manage-lesson" className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaBook /> Manage Lessons
                </NavLink>

                <NavLink to="/dashboard/admin/reported-lessons" className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaFlag /> Reports
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" end className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaChartPie /> Overview
                </NavLink>

                <NavLink to="/dashboard/add-lesson/user" className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaPlus /> Add Lesson
                </NavLink>

                <NavLink to="/dashboard/my-lessons/user" className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaBook /> My Lessons
                </NavLink>

                <NavLink to="/dashboard/profile/user" className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink} ${hoverClass}`
                }>
                  <FaUser /> Profile
                </NavLink>
              </>
            )}
          </nav>

          {/* FOOTER */}
          <div className="border-t p-6 space-y-3">
            <Link to="/" className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md ${hoverClass}`}>
              <FaHome /> Back to Home
            </Link>

            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 px-4 py-2 text-sm w-full rounded-md ${hoverClass}`}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={logout}
              className={`flex items-center gap-3 px-4 py-2 text-sm text-red-600 rounded-md ${hoverClass}`}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* ================= CONTENT ================= */}
        <main
          className={`flex-1 p-4 md:p-10 md:ml-8 rounded-md shadow-sm border ${contentClass}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

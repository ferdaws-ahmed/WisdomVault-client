import { NavLink, Outlet, Link, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
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
} from "react-icons/fa";
import Logo from "../Components/ui/Logo";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  /* ===========================
     🔐 ROLE BASED AUTO REDIRECT
     =========================== */
  useEffect(() => {
    if (!user) return;

    // Admin → user dashboard block
    if (isAdmin && location.pathname === "/dashboard") {
      navigate("/dashboard/admin", { replace: true });
    }

    // User → admin dashboard block
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
      <div className="flex min-h-screen p-6 md:p-10">
        
        {/* ================= SIDEBAR ================= */}
        <aside className={`w-[320px] flex flex-col border ${sidebarClass}`}>
          
          {/* LOGO */}
          <div
            className={`px-8 py-6 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <Logo />
            <p className="text-xs opacity-60 mt-2 tracking-wide">
              DASHBOARD PANEL
            </p>
          </div>

          {/* USER INFO */}
          <div
            className={`px-8 py-6 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs opacity-60">{user?.email}</p>
            <p className="text-xs mt-2 uppercase tracking-wide opacity-70">
              {isAdmin ? "ADMIN" : "USER"}
            </p>
          </div>

          {/* NAV LINKS */}
          <nav className="flex-1 py-4 space-y-1">
            {isAdmin ? (
              <>
                <NavLink
                  to="/dashboard/admin"
                  end
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaChartPie /> Admin Overview
                </NavLink>

                <NavLink
                  to="/dashboard/admin/manage-users"
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaUsers /> Manage Users
                </NavLink>

                <NavLink
                  to="/dashboard/admin/manage-lesson"
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaBook /> Manage Lessons
                </NavLink>

                <NavLink
                  to="/dashboard/admin/reported-lessons"
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaFlag /> Reports
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaChartPie /> Overview
                </NavLink>

                <NavLink
                  to="/dashboard/add-lesson"
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaPlus /> Add Lesson
                </NavLink>

                <NavLink
                  to="/dashboard/my-lessons"
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaBook /> My Lessons
                </NavLink>

                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeLink : inactiveLink
                    } ${hoverClass}`
                  }
                >
                  <FaUser /> Profile
                </NavLink>
              </>
            )}
          </nav>

          {/* FOOTER */}
          <div
            className={`border-t p-6 space-y-3 ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md ${hoverClass}`}
            >
              <FaHome /> Back to Home
            </Link>

            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 px-4 py-2 text-sm w-full text-left rounded-md ${hoverClass}`}
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
          className={`flex-1 ml-8 p-6 md:p-10 rounded-md shadow-sm border ${contentClass}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

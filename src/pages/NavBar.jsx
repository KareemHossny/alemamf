import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from "../axios";
import { toast } from "react-toastify";

const NavBar = ({onLogout}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/user/logout", {}, { withCredentials: true });
      if (onLogout) onLogout(); 
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("فشل تسجيل الخروج");
    }
  };

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-white/95 shadow fixed top-0 left-0 z-50 border-b border-blue-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="overflow-hidden rounded-lg border border-blue-400 shadow-md bg-white flex items-center justify-center"
            style={{
              width: "60px",
              height: "60px",
              boxSizing: "content-box",
              background: "#fff",
            }}
          >
            <img
              src="/OIP (4).webp"
              alt="Logo"
              className="object-cover w-full h-full scale-90"
              style={{
                filter: "none",
                background: "#fff",
                pointerEvents: "none",
                display: "block",
              }}
              draggable="false"
            />
          </div>
          <div className="flex flex-col">
            <span
              className="font-bold text-blue-900 text-lg md:text-xl tracking-wide"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            >
              قسم/ الصيانة والتشغيل
            </span>
            <span className="text-xs text-blue-500 font-semibold tracking-wider">
              Engineering Projects
            </span>
          </div>
        </Link>
        {/* Hamburger for mobile */}
        <button
          onClick={handleToggle}
          className="sm:hidden text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-2 transition ml-2"
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Nav Links */}
        <div
          className={`
            flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto
            ${menuOpen ? 'flex absolute top-full left-0 w-full bg-white/95 border-b border-blue-200 shadow-md py-4 px-4 animate-fadeIn' : 'hidden'}
            sm:flex sm:static sm:bg-transparent sm:shadow-none sm:py-0 sm:px-0
          `}
        >
          <Link
            to="/UpdateProjects"
            className="w-full sm:w-auto text-purple-800 bg-purple-50 hover:bg-purple-100 hover:text-purple-900 font-semibold px-4 py-2 rounded-md transition-all duration-150 text-center mb-2 sm:mb-0 border border-purple-200"
            onClick={() => setMenuOpen(false)}
          >
            تعديل مشروع
          </Link>
          <Link
            to="/Projects"
            className="w-full sm:w-auto text-blue-800 bg-blue-50 hover:bg-blue-100 hover:text-blue-900 font-semibold px-4 py-2 rounded-md transition-all duration-150 text-center mb-2 sm:mb-0 border border-blue-200"
            onClick={() => setMenuOpen(false)}
          >
            اضافه لمشروع
          </Link>
          <Link
            to="/AddProject"
            className="w-full sm:w-auto text-green-800 bg-green-50 hover:bg-green-100 hover:text-green-900 font-semibold px-4 py-2 rounded-md transition-all duration-150 text-center mb-2 sm:mb-0 border border-green-200"
            onClick={() => setMenuOpen(false)}
          >
            مشروع جديد
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="w-full sm:w-auto text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800 font-semibold px-4 py-2 rounded-md transition-all duration-150 text-center border border-red-200"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar
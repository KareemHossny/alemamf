import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import SearchBar from "../update/SearchBar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/projects");
        setProjects(data.projects);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on search query (name, location, engineer, description)
  const filteredProjects = projects.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(query) ||
      p.location?.toLowerCase().includes(query) ||
      p.engineer?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    );
  });

  // Use filteredProjects if searching, otherwise all projects
  const displayProjects = searchQuery ? filteredProjects : projects;

  return (
    <div
      className="w-full max-w-6xl px-2 sm:px-6 py-4 sm:py-10 flex flex-col items-center justify-center mx-auto min-h-[calc(100vh-60px)]"
      style={{
        borderRadius: "1.7rem",
        margin: "auto",
        width: "100%",
        maxWidth: "100vw",
        overflow: "visible",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <span
        className="block w-full  rounded-xl shadow-md py-4 mb-10 sm:mb-14"
        style={{
          border: "1.5px solid #c7e0fa",
          boxShadow: "0 4px 24px 0 rgba(59,130,246,0.10)",
          background:
            "linear-gradient(90deg, rgba(191,219,254,0.45) 0%, rgba(219,234,254,0.60) 35%, rgba(239,246,255,0.50) 65%, rgba(191,219,254,0.45) 100%)",
          backdropFilter: "blur(1.5px) saturate(120%)",
          WebkitBackdropFilter: "blur(1.5px) saturate(120%)",
        }}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 text-center drop-shadow-xl tracking-wider"
          style={{
            fontFamily: "'Tajawal', 'Cairo', sans-serif",
            letterSpacing: "0.04em",
            textShadow: "0 2px 12px rgba(30,41,59,0.13)",
          }}
        >
          قائمة المشاريع
        </h2>
      </span>
      <div className="w-full max-w-2xl mb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {searchQuery && (
        <div className="w-full mb-8">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-50 via-blue-50 to-sky-100 border border-blue-200 shadow-sm"
            style={{
              fontFamily: "'Tajawal', 'Cairo', sans-serif",
              color: "#0369a1",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            <svg
              className="w-5 h-5 text-sky-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <span>
              نتائج البحث عن:{" "}
              <span className="font-bold text-sky-700">{searchQuery}</span>
              {displayProjects.length === 0 && (
                <span className="ml-2 text-gray-400 font-normal">لا توجد نتائج مطابقة</span>
              )}
            </span>
          </div>
        </div>
      )}

      <div className="w-full grid gap-7 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayProjects.map((p) => (
          <div
            key={p._id}
            className="relative rounded-3xl shadow-2xl border border-blue-200 hover:shadow-blue-400 hover:scale-[1.040] transition-all duration-100 flex flex-col justify-between p-6 sm:p-8 md:p-10 group bg-white/70"
            style={{
              minHeight: "340px",
              background: "rgba(245,250,255,0.50)",
              border: "1.8px solid #bae6fd",
              boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
              transition: "box-shadow 0.2s, transform 0.2s",
              backdropFilter: "blur(3.5px) saturate(120%)",
              WebkitBackdropFilter: "blur(3.5px) saturate(120%)",
            }}
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h3
                className="text-2xl sm:text-2.5xl md:text-[1.7rem] font-extrabold text-sky-900 mb-4 text-center truncate w-full"
                style={{
                  fontFamily: "'Tajawal', 'Cairo', sans-serif",
                  textShadow: "0 2px 10px rgba(30,41,59,0.10)",
                  letterSpacing: "0.02em",
                }}
                title={p.name}
              >
                {p.name}
                <hr className="font-extrabold mt-4"/>

              </h3>
              <div className="flex flex-col gap-2 items-center justify-center mb-6 w-full">
                <div className="flex flex-row items-center gap-2 w-auto">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-100/90 shadow mb-0">
                    <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span className="font-bold truncate max-w-[120px] text-gray-800 text-center">{p.engineer}</span>
                </div>
              </div>
              <div
                className="rounded-xl px-5 py-2.5 text-sky-800 text-sm sm:text-base text-center mb-5 min-h-[48px] sm:min-h-[56px] border border-blue-100 shadow w-full"
                style={{
                  background: "rgba(245,250,255,0.92)",
                  color: "#0369a1",
                  fontFamily: "'Tajawal', 'Cairo', sans-serif",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  fontWeight: 500,
                }}
              >
                {p.description ? (
                  <span className="line-clamp-2 text-gray-700 text-center w-full block font-semibold italic">{p.description}</span>
                ) : (
                  <span className="italic text-gray-400 text-center w-full block">لا يوجد وصف للمشروع</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => navigate(`/add-worker/${p._id}`)}
                className="w-full bg-gradient-to-r from-green-200 via-green-100 to-green-200 hover:from-green-300 hover:to-green-200 text-green-900 font-extrabold py-2.5 rounded-xl shadow transition-all duration-150 text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                style={{
                  fontFamily: "'Tajawal', 'Cairo', sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>إضافة عامل</span>
              </button>
              <button
                onClick={() => navigate(`/add-monthly/${p._id}`)}
                className="w-full bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 hover:from-blue-300 hover:to-blue-200 text-blue-900 font-extrabold py-2.5 rounded-xl shadow transition-all duration-150 text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                style={{
                  fontFamily: "'Tajawal', 'Cairo', sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>إضافة بيانات العمال الشهرية</span>
              </button>
              <button
                onClick={() => navigate(`/monthly-project/${p._id}`)}
                className="w-full bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 hover:from-purple-300 hover:to-purple-200 text-purple-900 font-extrabold py-2.5 rounded-xl shadow transition-all duration-150 text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{
                  fontFamily: "'Tajawal', 'Cairo', sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v4H3V3zm0 6h18v12H3V9zm6 3v6m6-6v6" />
                </svg>
                <span>إضافة بيانات المشروع الشهرية</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {displayProjects.length === 0 && (
        <div className="text-center text-sky-400 mt-24 sm:mt-32 text-xl sm:text-2xl font-semibold animate-pulse select-none">
          لا توجد مشاريع حالياً.
        </div>
      )}
    </div>
  );
};

export default Projects;

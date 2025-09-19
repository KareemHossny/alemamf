import React, { useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import API from "../axios";
import SearchBar from "../update/SearchBar";

const OpeningProjects = () => {
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
        className="block w-full rounded-xl shadow-md py-4 mb-10 sm:mb-14"
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
          المشاريع الحالية
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
          <Link
            key={p._id}
            to={`/project/${p._id}`}
            style={{
              minHeight: "320px",
              background:
                "rgba(245,250,255,0.50)",
              border: "1.8px solid #bae6fd",
              boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
              transition: "box-shadow 0.2s, transform 0.2s",
              backdropFilter: "blur(3.5px) saturate(120%)",
              WebkitBackdropFilter: "blur(3.5px) saturate(120%)",
              textDecoration: "none",
              color: "inherit",
            }}
            className="relative rounded-3xl shadow-2xl border border-blue-200 hover:shadow-blue-400 hover:scale-[1.045] transition-all duration-200 flex flex-col justify-between p-6 sm:p-8 md:p-10 group bg-white/80 backdrop-blur-md"
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-full flex flex-col items-center mb-6 relative">
                <h3
                  className="text-2xl sm:text-[1.5rem] md:text-[1.7rem] font-extrabold text-sky-900 text-center truncate w-full z-10"
                  style={{
                    fontFamily: "'Tajawal', 'Cairo', sans-serif",
                    textShadow: "0 2px 10px rgba(30,41,59,0.10)",
                    letterSpacing: "0.02em",
                    marginBottom: "18px",
                  }}
                  title={p.name}
                >
                  {p.name}
                  <hr className="font-extrabold mt-4"/>
                </h3>
              </div>
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
            <div
              aria-label={`تفاصيل المشروع: ${p.name}`}
              className="mt-auto w-full bg-gradient-to-r from-blue-900 via-sky-900 to-blue-900 hover:from-blue-800 hover:to-sky-800 text-white font-extrabold py-3 sm:py-3.5 rounded-2xl shadow-xl transition-transform duration-150 flex items-center justify-center gap-2 text-lg sm:text-xl tracking-wide group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300 border border-sky-200 focus-visible:ring-4 focus-visible:ring-sky-400"
              style={{
                fontFamily: "'Tajawal', 'Cairo', sans-serif",
                boxShadow: "0 4px 18px 0 rgba(30,41,59,0.15)",
                border: "1.5px solid #bae6fd",
                backdropFilter: "blur(1px)",
                WebkitBackdropFilter: "blur(1px)",
                marginTop: "1.2rem",
                cursor: "pointer",
              }}
              tabIndex={0}
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h6m0 0v6m0-6l-8.5 8.5a2.121 2.121 0 01-3 0l-2-2a2.121 2.121 0 013-3L19 7z" />
              </svg>
              <span className="truncate">تفاصيل المشروع</span>
            </div>
          </Link>
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

export default OpeningProjects;

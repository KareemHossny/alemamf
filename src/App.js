import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import API from "./axios";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import OpeningProjects from "./pages/OpeningProjects";
import AddWorker from "./pages/AddWorker";
import AddMonthlyData from "./pages/AddMonthlyData";
import ProjectDetails from "./pages/ProjectDetails";
import MonthlyProjects from "./pages/MonthlyProjects";
import NavBar from "./pages/NavBar";
import UpdateProject from "./pages/UpdateProject";
import ProjectsData from "./update/ProjectsData";
import WorkerData from "./update/WorkerData";
import MonthlyProjectsData from "./update/MonthlyProjectsData";
import MonthlyWorkerData from "./update/MonthlyWorkerData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = لسه مش معروف
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/user/check", { withCredentials: true });
        setIsLoggedIn(res.data.isLoggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white/80">
        <div className="relative">
          <div
            className="overflow-hidden rounded-2xl border-2 border-blue-400 shadow-lg bg-white flex items-center justify-center"
            style={{
              width: "110px",
              height: "110px",
              background: "#fff",
              boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
              margin: "auto",
              position: "relative",
            }}
          >
            {/* Subtle glowing ring */}
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: "0 0 32px 8px #38bdf8, 0 0 0 0 #fff",
                opacity: 0.18,
                zIndex: 1,
              }}
            />
            {/* Animated border ring */}
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-ring"
              style={{
                border: "3px solid #38bdf8",
                opacity: 0.22,
                zIndex: 2,
              }}
            />
            <img
              src="/OIP (4).webp"
              alt="Logo"
              className="object-cover w-[90px] h-[90px] scale-90 animate-spin-bounce"
              style={{
                filter: "none",
                background: "#fff",
                pointerEvents: "none",
                display: "block",
                zIndex: 3,
                borderRadius: "1rem",
              }}
              draggable="false"
            />
          </div>
        </div>
        <style>
          {`
            @keyframes spin-bounce {
              0% { transform: scale(0.95) rotate(0deg);}
              10% { transform: scale(1.05) rotate(36deg);}
              20% { transform: scale(1.08) rotate(72deg);}
              30% { transform: scale(1.1) rotate(108deg);}
              40% { transform: scale(1.08) rotate(144deg);}
              50% { transform: scale(1.05) rotate(180deg);}
              60% { transform: scale(1.08) rotate(216deg);}
              70% { transform: scale(1.1) rotate(252deg);}
              80% { transform: scale(1.08) rotate(288deg);}
              90% { transform: scale(1.05) rotate(324deg);}
              100% { transform: scale(0.95) rotate(360deg);}
            }
            .animate-spin-bounce {
              animation: spin-bounce 0.7s cubic-bezier(0.4,0,0.2,1) 1;
            }
            @keyframes pulse-ring {
              0% { box-shadow: 0 0 0 0 #38bdf8, 0 0 32px 8px #38bdf8;}
              70% { box-shadow: 0 0 0 12px rgba(56,189,248,0);}
              100% { box-shadow: 0 0 0 0 rgba(56,189,248,0);}
            }
            .animate-pulse-ring {
              animation: pulse-ring 0.7s cubic-bezier(0.4,0,0.2,1) infinite;
            }
          `}
        </style>
      </div>
    );
  }
  // Use the new background image and enhance the effect
  const backgroundImageUrl = isLoggedIn? 'photo_2025-09-15_04-00-21.jpg' : 'photo_2025-09-16_07-07-14.jpg'

  const containerClass =
    "min-h-screen flex flex-col items-center justify-start pt-0 sm:pt-8";

  return (
    <Router>
{isLoggedIn && <NavBar onLogout={() => setIsLoggedIn(false)} />}
        <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{
          ...(isLoggedIn
            ? {
                top: "70px", // push down below NavBar 
                right: "0px",
                left: "unset",
              }
            : {
                top: "10px",
                right: "0px",
                left: "unset",
              }),
          fontSize: "1.25rem", // bigger font
          fontWeight: "bold",  // bolder font
        }}
        toastStyle={{
          marginTop: "0.5rem"
        }}
      />
      <div
        className={containerClass}
        style={{
          paddingTop: isLoggedIn ? 60 : 0,
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            width: "100vw",
            maxWidth: "100vw",
            height: "100vh",
            pointerEvents: "none",
            backgroundImage: `
              linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(200,220,255,0.10) 100%),
              radial-gradient(ellipse at 80% 10%, rgba(59,130,246,0.10) 0%, rgba(255,255,255,0.00) 70%),
              url(${backgroundImageUrl})
            `,
            backgroundSize: "100% 100%", // Zoom out 
            backgroundPosition: isLoggedIn ? "center 80px, 80% 10%, center 80px" : "center, 80% 10%, center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(1) saturate(1.28) contrast(1.18) blur(0.5px)",
            transition: "background-image 0.5s, background-size 0.5s, filter 0.5s",
            willChange: "background-image, background-size, filter",
            opacity: 1,
            // animation removed
            overflowX: "hidden",
          }}
        />
        <div
          className="w-full max-w-5xl px-2 sm:px-6 py-4 sm:py-8 shadow-2xl flex flex-col items-center justify-center"
          style={{
            background: "rgba(245,250,255,0.10)",
            boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)",
            backdropFilter: "blur(3.5px) saturate(130%)",
            WebkitBackdropFilter: "blur(3.5px) saturate(130%)",
            margin: "auto",
            zIndex: 1,
            width: "100%",
            maxWidth: "100vw",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 60px)",
          }}
        >
          <Routes>
            <Route
              path="/login"
              element={                
                  <Login onLogin={() => setIsLoggedIn(true)} />
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <OpeningProjects />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/projects"
              element={
                isLoggedIn ? (
                  <Projects />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/AddProject"
              element={
                isLoggedIn ? (
                  <AddProject />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/UpdateProjects"
              element={
                isLoggedIn ? (
                  <UpdateProject />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-worker/:projectId"
              element={
                isLoggedIn ? (
                  <AddWorker />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-monthly/:projectId"
              element={
                isLoggedIn ? (
                  <AddMonthlyData />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/project/:projectId"
              element={
                isLoggedIn ? (
                  <ProjectDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/monthly-project/:projectId"
              element={
                isLoggedIn ? (
                  <MonthlyProjects />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/update-project/:projectId"
              element={
                isLoggedIn ? (
                  <ProjectsData />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/update-worker/:projectId"
              element={
                isLoggedIn ? (
                  <WorkerData />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/update-worker-monthly/:projectId"
              element={
                isLoggedIn ? (
                  <MonthlyWorkerData />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/update-project-monthly/:projectId"
              element={
                isLoggedIn ? (
                  <MonthlyProjectsData />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

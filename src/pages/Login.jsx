import React, { useState } from "react";
import API from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await API.post(
        "/user/AlEmam-User",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("تم تسجيل الدخول بنجاح");

        if (onLogin) onLogin();
          navigate("/");
      } else {
        toast.error(res.data.message || "فشل تسجيل الدخول");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطأ في الخادم أو الشبكة");
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div
      className="w-full flex items-center justify-center min-h-[calc(100vh-60px)] py-8 px-2"
      style={{
        borderRadius: "1.7rem",
        margin: "auto",
        width: "100%",
        maxWidth: "100vw",
        overflow: "visible",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <div
        className="w-full max-w-md bg-white/70 rounded-3xl shadow-2xl border border-blue-200 p-6 sm:p-10 flex flex-col items-center"
        style={{
          background: "rgba(245,250,255,0.50)",
          border: "1.8px solid #bae6fd",
          boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
          backdropFilter: "blur(3.5px) saturate(120%)",
          WebkitBackdropFilter: "blur(3.5px) saturate(120%)",
        }}
      >
        <div className="flex flex-col items-center mb-8 w-full">
          <img
            src="/OIP (4).webp"
            alt="Logo"
            className="w-20 h-20 rounded-lg border border-blue-400 shadow-md mb-3"
            draggable="false"
          />
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-blue-900 text-center drop-shadow-xl tracking-wider"
            style={{
              fontFamily: "'Tajawal', 'Cairo', sans-serif",
              letterSpacing: "0.04em",
              textShadow: "0 2px 12px rgba(30,41,59,0.13)",
            }}
          >
            تسجيل الدخول
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label
              className="block text-sky-800 font-semibold mb-2"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل بريدك الإلكتروني"
              autoComplete="username"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>
          <div>
            <label
              className="block text-sky-800 font-semibold mb-2"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            >
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل كلمة المرور"
              autoComplete="current-password"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-gradient-to-r from-blue-900 via-sky-900 to-blue-900 hover:from-blue-800 hover:to-sky-800 text-white font-extrabold py-3 sm:py-3.5 rounded-2xl shadow-2xl transition-all duration-150 flex items-center justify-center gap-2 text-lg sm:text-xl tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-700 border border-blue-900 ${
              submitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{
              fontFamily: "'Tajawal', 'Cairo', sans-serif",
              boxShadow: "0 4px 18px 0 rgba(30,41,59,0.15)",
              border: "1.5px solid #bae6fd",
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
              marginTop: "1.2rem",
            }}
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {submitting ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

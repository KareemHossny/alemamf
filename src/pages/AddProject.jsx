import React, { useState } from "react";
import API from "../axios";
import { toast } from "react-toastify";

const AddProject = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    engineer: "",
    clientName: "",
    clientPhone: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/projects", {
        name: form.name,
        location: form.location,
        engineer: form.engineer,
        client: {
          name: form.clientName,
          phone: form.clientPhone,
        },
        description: form.description,
      });

      if (res.data.success) {
        toast.success(" تم إضافة المشروع بنجاح!", {
        });
        setForm({
          name: "",
          location: "",
          engineer: "",
          clientName: "",
          clientPhone: "",
          description: "",
        });
      } else {
        toast.error(" فشل في إضافة المشروع", {
          position: "top-center",
          autoClose: 3500,
          style: { fontFamily: "'Tajawal', 'Cairo', sans-serif", fontWeight: 600, fontSize: "1.1rem" },
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ خطأ في الخادم", {
        position: "top-center",
        autoClose: 3500,
        style: { fontFamily: "'Tajawal', 'Cairo', sans-serif", fontWeight: 600, fontSize: "1.1rem" },
      });
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
      {/* ToastContainer removed, now handled in App */}
      <div
        className="w-full max-w-2xl bg-white/70 rounded-3xl shadow-2xl border border-blue-200 p-6 sm:p-10 flex flex-col items-center"
        style={{
          background: "rgba(245,250,255,0.50)",
          border: "1.8px solid #bae6fd",
          boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
          backdropFilter: "blur(3.5px) saturate(120%)",
          WebkitBackdropFilter: "blur(3.5px) saturate(120%)",
        }}
      >
        <span
          className="block w-full rounded-xl shadow-md py-4 mb-10"
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
            إضافة مشروع جديد
          </h2>
        </span>
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6"
        >
          <div>
            <label className="block text-sky-800 font-semibold mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
              اسم المشروع
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل اسم المشروع"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sky-800 font-semibold mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
              الموقع
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل موقع المشروع"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sky-800 font-semibold mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
              المهندس المسؤول
            </label>
            <input
              type="text"
              name="engineer"
              value={form.engineer}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل اسم المهندس"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sky-800 font-semibold mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
              اسم الاستشاري
            </label>
            <input
              type="text"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل اسم الاستشاري"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sky-800 font-semibold mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
              هاتف الاستشاري
            </label>
            <input
              type="text"
              name="clientPhone"
              value={form.clientPhone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow"
              placeholder="ادخل رقم هاتف الاستشاري"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sky-800 font-semibold mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
              مجال العمل
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:ring-2 focus:ring-sky-300 focus:outline-none bg-blue-50/80 text-blue-900 font-medium transition shadow resize-y"
              placeholder="ادخل مجال العمل"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-900 via-sky-900 to-blue-900 hover:from-blue-800 hover:to-sky-800 text-white font-extrabold py-3 sm:py-3.5 rounded-2xl shadow-2xl transition-all duration-150 flex items-center justify-center gap-2 text-lg sm:text-xl tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-700 border border-blue-900"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            إضافة المشروع
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;

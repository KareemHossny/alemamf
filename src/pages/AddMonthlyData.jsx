import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";
import { toast } from "react-toastify";

const AddMonthlyData = () => {
  const { projectId } = useParams();
  const [workers, setWorkers] = useState([]);
  const [formData, setFormData] = useState({
    workerId: "",
    month: "",
    extraHours: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // جلب العمال للمشروع عشان نختار العامل
    const fetchWorkers = async () => {
      try {
        const { data } = await API.get(`/workers/${projectId}`);
        setWorkers(data.workers);
      } catch (err) {
        console.error("Error fetching workers", err);
        toast.error("فشل في جلب العمال");
      }
    };
    fetchWorkers();
  }, [projectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/monthly-data", { ...formData, projectId });
      toast.success("تم إضافة البيانات الشهرية بنجاح");
      setFormData({
        workerId: "",
        month: "",
        extraHours: "",
      });
    } catch (err) {
      console.error("Error adding monthly data", err);
      toast.error("فشل في إضافة البيانات الشهرية");
    } finally {
      setLoading(false);
    }
  };

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
          إضافة بيانات شهرية للعامل
        </h2>
      </span>
      <div
        className="w-full max-w-2xl mx-auto  rounded-2xl shadow-2xl border border-blue-200 p-6 sm:p-10"
        style={{
          background: "rgba(245,250,255,0.50)",
          border: "1.8px solid #bae6fd",
          boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
          transition: "box-shadow 0.2s, transform 0.2s",
          backdropFilter: "blur(3.5px) saturate(120%)",
          WebkitBackdropFilter: "blur(3.5px) saturate(120%)",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-blue-800 font-semibold mb-2">
              اسم العامل
            </label>
            <select
              name="workerId"
              value={formData.workerId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            >
              <option value="">-- اختر العامل --</option>
              {workers.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">
              الشهر
            </label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">
              ساعات العمل الإضافية
            </label>
            <input
              type="number"
              name="extraHours"
              value={formData.extraHours}
              onChange={handleChange}
              min={0}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
              placeholder="ادخل عدد الساعات الإضافية"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-400 via-green-300 to-green-400 hover:from-green-500 hover:to-green-400 text-green-900 font-extrabold py-3 rounded-xl shadow transition-all duration-150 flex items-center justify-center gap-2 text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-green-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{
              fontFamily: "'Tajawal', 'Cairo', sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {loading ? "جاري الإضافة..." : "إضافة البيانات الشهرية"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMonthlyData;

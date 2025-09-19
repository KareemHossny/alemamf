import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";
import { toast } from "react-toastify";

const MonthlyProjects = () => {
  const { projectId } = useParams();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [form, setForm] = useState({ amount: "", description: "", type: "expenses" });
  const [loading, setLoading] = useState(false);

  // إضافة Transaction جديد فقط
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/projects/transaction", {
        projectId,
        month: `${month}-01`,
        type: form.type, // expenses | materialsCost | clientPayment
        amount: Number(form.amount),
        description: form.description,
      });
      setForm({ amount: "", description: "", type: "expenses" }); // reset form
      toast.success("تم إضافة المعاملة بنجاح ");
    } catch (err) {
      toast.error("فشل في إضافة المعاملة ");
      console.error("Error adding transaction", err);
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
          إضافة بيانات شهرية للمشروع
        </h2>
      </span>
      <div className="w-full max-w-2xl mx-auto  rounded-2xl shadow-2xl border border-blue-200 p-6 sm:p-10" style={{              background: "rgba(245,250,255,0.50)",
              border: "1.8px solid #bae6fd",
              boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
              transition: "box-shadow 0.2s, transform 0.2s",
              backdropFilter: "blur(3.5px) saturate(120%)",
              WebkitBackdropFilter: "blur(3.5px) saturate(120%)"}}>
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <label className="block text-blue-800 font-semibold text-lg">
            اختر الشهر:
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition w-48"
          />
        </div>
        <form onSubmit={handleAddTransaction} className="space-y-7">
          <h3
            className="text-2xl font-bold text-blue-800 mb-4 text-center"
            style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
          >
            إضافة معاملة
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-blue-800 font-semibold mb-2">
                نوع المعاملة
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
              >
                <option value="expenses">مصروفات</option>
                <option value="materialsCost">مواد</option>
                <option value="clientPayment">دفعة من العميل</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-blue-800 font-semibold mb-2">
                المبلغ
              </label>
              <input
                type="number"
                placeholder="ادخل المبلغ"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
                min="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">
              الوصف (اختياري)
            </label>
            <input
              type="text"
              placeholder="ادخل وصف المعاملة"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-400 via-green-300 to-green-400 hover:from-green-500 hover:to-green-400 text-green-900 font-extrabold py-3 rounded-xl shadow transition-all duration-150 flex items-center justify-center gap-2 text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-green-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif", letterSpacing: "0.01em" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {loading ? "جاري الإضافة..." : "إضافة المعاملة"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MonthlyProjects;

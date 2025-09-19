import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";
import { toast } from "react-toastify";

const MonthlyWorkerData = () => {
  const { projectId } = useParams();
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // جلب العمال
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const { data } = await API.get(`/workers/${projectId}`);
        setWorkers(data.workers || []);
      } catch (err) {
        console.error("Error fetching workers", err);
        toast.error("فشل في جلب العمال");
        setWorkers([]);
      }
    };
    if (projectId) fetchWorkers();
  }, [projectId]);

  // جلب بيانات العامل
  const fetchMonthlyData = async (workerId) => {
    if (!workerId) {
      setMonthlyData([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.get(`/monthly-data/${workerId}`);
      setMonthlyData(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Error fetching monthly worker data", err);
      toast.error("فشل في جلب بيانات العامل");
      setMonthlyData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    let monthValue = item.month;
    if (monthValue) {
      const dateObj = new Date(monthValue);
      if (!isNaN(dateObj.getTime())) {
        monthValue = dateObj.toISOString().slice(0, 7);
      }
    }
    setEditItem({ ...item, month: monthValue });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let monthToSend = editItem.month;
      const { data } = await API.put(`/monthly-data/${editItem._id}`, {
        month: monthToSend,
        extraHours: editItem.extraHours,
        baseSalary: editItem.baseSalary,
      });

      toast.success(data.message || "تم تعديل البيانات بنجاح");
      setEditItem(null);
      fetchMonthlyData(selectedWorker);
    } catch (err) {
      toast.error(" فشل تعديل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    setLoading(true);
    try {
      const { data } = await API.delete(`/monthly-data/${id}`);
      toast.success(data.message || "تم حذف البيانات بنجاح");
      fetchMonthlyData(selectedWorker);
    } catch (err) {
      toast.error(" فشل الحذف");
    } finally {
      setLoading(false);
    }
  };

  const displayMonth = (month) => {
    if (!month) return "";
    const dateObj = new Date(month);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().slice(0, 7);
    }
    if (/^\d{4}-\d{2}$/.test(month)) return month;
    return month;
  };

  return (
    <div
      className="w-full max-w-6xl px-2 sm:px-6  flex flex-col items-center justify-center mx-auto min-h-[calc(100vh-60px)]"
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
          تعديل بيانات العامل الشهرية
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
        <div className="flex flex-col items-center justify-center mb-8">
          <label className="block text-blue-800 font-semibold text-lg mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
            اختر العامل:
          </label>
          <select
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            value={selectedWorker}
            onChange={(e) => {
              setSelectedWorker(e.target.value);
              fetchMonthlyData(e.target.value);
            }}
            disabled={loading}
          >
            <option value="">-- اختر العامل --</option>
            {workers.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="flex justify-center items-center my-6 text-blue-700 font-bold text-lg">
            جاري التحميل...
          </div>
        )}

        {/* عرض بيانات العامل */}
        {monthlyData.length > 0 && !loading && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">البيانات الشهرية</h3>
            <ul>
              {monthlyData.map((d) => (
                <li
                  key={d._id}
                  className="flex justify-between items-center border border-blue-100 rounded-lg p-2 mb-2 bg-blue-50"
                >
                  <span className="text-blue-900 font-semibold">
                    {displayMonth(d.month)} - {d.extraHours} ساعة إضافية
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(d)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded shadow"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded shadow"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* نافذة التعديل */}
        {editItem && (
          <div
            className="mt-8 p-6 border border-blue-200 rounded-2xl bg-blue-50 shadow-xl"
            style={{
              maxWidth: "480px",
              margin: "2rem auto 0 auto",
              fontFamily: "'Tajawal', 'Cairo', sans-serif",
            }}
          >
            <h3 className="font-bold text-xl text-blue-900 mb-4 text-center">
              تعديل البيانات الشهرية
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-blue-800 font-semibold mb-2">
                  الشهر
                </label>
                <input
                  type="month"
                  value={editItem.month || ""}
                  onChange={(e) => setEditItem({ ...editItem, month: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
                />
              </div>
              <div>
                <label className="block text-blue-800 font-semibold mb-2">
                  ساعات العمل الإضافية
                </label>
                <input
                  type="number"
                  value={editItem.extraHours}
                  onChange={(e) => setEditItem({ ...editItem, extraHours: e.target.value })}
                  min={0}
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
                  placeholder="ادخل عدد الساعات الإضافية"
                />
              </div>
              <div className="flex gap-3 mt-6">
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
                  {loading ? "جاري الحفظ..." : "حفظ التعديل"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white font-extrabold py-3 rounded-xl shadow transition-all duration-150 flex items-center justify-center gap-2 text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-300"
                  style={{
                    fontFamily: "'Tajawal', 'Cairo', sans-serif",
                    letterSpacing: "0.01em",
                  }}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyWorkerData;

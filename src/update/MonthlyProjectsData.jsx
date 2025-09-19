
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";
import { toast } from "react-toastify";

const MonthlyProjectsData = () => {
  const { projectId } = useParams();
  const [month, setMonth] = useState("");
  const [projectData, setProjectData] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to update editItem state for controlled inputs
  const handleEditItemChange = (field, value) => {
    setEditItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchProjectData = async (selectedMonth) => {
    if (!projectId || !selectedMonth) return;
    setLoading(true);
    try {
      const { data } = await API.get(`/projects/${projectId}/${selectedMonth}-01`);
      setProjectData(data);
    } catch (err) {
      console.error("Error fetching project data", err);
      toast.error("فشل في جلب بيانات المشروع");
      setProjectData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data automatically when month changes
  useEffect(() => {
    if (month) {
      fetchProjectData(month);
    } else {
      setProjectData(null);
    }
    // eslint-disable-next-line
  }, [month, projectId]);

  const handleEdit = (item, itemType) => {
    setEditItem({ ...item }); // clone to avoid direct mutation
    setType(itemType);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await API.put(`/projects/monthly/${editItem._id}`, {
        amount: editItem.amount,
        description: editItem.description,
        date: editItem.date,
      });

      toast.success(data.message || "تم تعديل البيانات بنجاح");
      setEditItem(null);
      fetchProjectData(month);
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
      const { data } = await API.delete(`/projects/monthly/${id}`);
      toast.success(data.message || "تم حذف البيانات بنجاح");
      fetchProjectData(month);
    } catch (err) {
      toast.error(" فشل الحذف");
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
          تعديل بيانات المشروع الشهرية
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
            اختر الشهر:
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            disabled={loading}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center my-6 text-blue-700 font-bold text-lg">
            جاري التحميل...
          </div>
        )}

        {projectData && !loading && (
          <div className="mt-6">
            {/* مصاريف */}
            <h3 className="text-lg font-bold text-blue-900 mb-2">المصاريف</h3>
            <ul>
              {(projectData.monthlyData?.expenses || []).map((e) => (
                <li
                  key={e._id}
                  className="flex justify-between items-center border border-blue-100 rounded-lg p-2 mb-2 bg-blue-50"
                >
                  <span className="text-blue-900 font-semibold">
                    {e.amount} - {e.description || "بدون وصف"} (
                    {new Date(e.date).toLocaleDateString()})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(e, "المصاريف")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded shadow"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded shadow"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* المواد */}
            <h3 className="text-lg font-bold text-blue-900 mt-6 mb-2">المواد</h3>
            <ul>
              {(projectData.monthlyData?.materialsCost || []).map((m) => (
                <li
                  key={m._id}
                  className="flex justify-between items-center border border-blue-100 rounded-lg p-2 mb-2 bg-blue-50"
                >
                  <span className="text-blue-900 font-semibold">
                    {m.amount} - {m.description || "بدون وصف"} (
                    {new Date(m.date).toLocaleDateString()})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(m, "المواد")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded shadow"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded shadow"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* دفعات العميل */}
            <h3 className="text-lg font-bold text-blue-900 mt-6 mb-2">دفعات العميل</h3>
            <ul>
              {(projectData.monthlyData?.clientPayment || []).map((c) => (
                <li
                  key={c._id}
                  className="flex justify-between items-center border border-blue-100 rounded-lg p-2 mb-2 bg-blue-50"
                >
                  <span className="text-blue-900 font-semibold">
                    {c.amount} - {c.description || "بدون وصف"} (
                    {new Date(c.date).toLocaleDateString()})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(c, "دفعات العميل")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded shadow"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
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
              تعديل البيانات ({type})
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
                  المبلغ
                </label>
                <input
                  type="number"
                  value={editItem.amount}
                  onChange={(e) =>
                    handleEditItemChange("amount", Number(e.target.value))
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
                  placeholder="ادخل المبلغ"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-blue-800 font-semibold mb-2">
                  الوصف
                </label>
                <input
                  type="text"
                  value={editItem.description || ""}
                  onChange={(e) =>
                    handleEditItemChange("description", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
                  placeholder="ادخل الوصف"
                />
              </div>
              <div>
                <label className="block text-blue-800 font-semibold mb-2">
                  التاريخ
                </label>
                <input
                  type="date"
                  value={
                    editItem.date
                      ? new Date(editItem.date).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    handleEditItemChange("date", e.target.value)
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
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

export default MonthlyProjectsData;

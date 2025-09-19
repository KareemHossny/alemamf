import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";
import { toast } from "react-toastify";

const WorkerData = () => {
  const { projectId } = useParams();
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    baseSalary: "",
  });
  const [loading, setLoading] = useState(false);

  // جلب العمال الخاصة بالمشروع
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const { data } = await API.get(`/workers/${projectId}`);
        if (data.success) {
          setWorkers(data.workers);
        }
      } catch (err) {
        toast.error("فشل في جلب العمال");
        setWorkers([]);
      }
    };
    if (projectId) fetchWorkers();
  }, [projectId]);

  // تحديث بيانات العامل المختار
  useEffect(() => {
    if (selectedWorker) {
      const worker = workers.find((w) => w._id === selectedWorker);
      if (worker) {
        setFormData({
          name: worker.name,
          baseSalary: worker.baseSalary,
        });
      }
    }
  }, [selectedWorker, workers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWorker) {
      toast.error(" اختر عامل لتعديله.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.put(`/workers/${selectedWorker}`, formData);
      if (data.success) {
        toast.success("تم تعديل بيانات العامل بنجاح.");
        // تحديث بيانات العامل في القائمة
        setWorkers((prev) =>
          prev.map((w) =>
            w._id === selectedWorker
              ? { ...w, name: formData.name, baseSalary: formData.baseSalary }
              : w
          )
        );
      } else {
        toast.error(data.message || " حدث خطأ أثناء التعديل.");
      }
    } catch (err) {
      toast.error(" فشل الاتصال بالسيرفر.");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedWorker) {
      toast.error(" اختر عامل لحذفه.");
      return;
    }
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا العامل؟")) return;

    setLoading(true);
    try {
      const { data } = await API.delete(`/workers/${selectedWorker}`);
      if (data.success) {
        toast.success(" تم حذف العامل بنجاح.");
        setWorkers((prev) => prev.filter((w) => w._id !== selectedWorker));
        setSelectedWorker("");
        setFormData({ name: "", baseSalary: "" });
      } else {
        toast.error(data.message || " حدث خطأ أثناء الحذف.");
      }
    } catch (err) {
      toast.error(" فشل الاتصال بالسيرفر.");
    }
    setLoading(false);
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
          تعديل بيانات عامل
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
        <div className="mb-8">
          <label className="block text-blue-800 font-semibold text-lg mb-2" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
            اختر العامل:
          </label>
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            disabled={loading}
          >
            <option value="">-- اختر عامل --</option>
            {workers.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {selectedWorker && (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-blue-800 font-semibold mb-2">
                اسم العامل
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-2">
                المرتب الأساسي
              </label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900 font-medium transition"
                required
              />
            </div>

            <div className="flex gap-4 mt-6">
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
                {loading ? "جاري التحديث..." : "تحديث"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="w-full bg-red-400 hover:bg-red-500 text-white font-extrabold py-3 rounded-xl shadow transition-all duration-150 flex items-center justify-center gap-2 text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-red-300"
                style={{
                  fontFamily: "'Tajawal', 'Cairo', sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                حذف العامل
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WorkerData;

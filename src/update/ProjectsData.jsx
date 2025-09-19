import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../axios";
import { toast } from "react-toastify";

const ProjectsData = ({ initialData, onSuccess }) => {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    engineer: initialData?.engineer || "",
    clientName: initialData?.client?.name || "",
    clientPhone: initialData?.client?.phone || "",
    description: initialData?.description || "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) {
      toast.error("لم يتم العثور على رقم المشروع.");
      return;
    }
    setLoading(true);

    try {
      const payload = {
        ...(formData.name && { name: formData.name }),
        ...(formData.location && { location: formData.location }),
        ...(formData.engineer && { engineer: formData.engineer }),
        ...(formData.clientName || formData.clientPhone
          ? { client: { name: formData.clientName, phone: formData.clientPhone } }
          : {}),
        ...(formData.description && { description: formData.description }),
      };

      const { data } = await API.put(`/projects/${projectId}`, payload);

      if (data.success) {
        toast.success("تم تحديث بيانات المشروع بنجاح.");
        setTimeout(() => {
          navigate("/");
        }, 1800);
        if (onSuccess) onSuccess(data.project);
      } else {
        toast.error(data.message || "حدث خطأ أثناء التحديث.");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء التحديث.");
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
          تعديل بيانات المشروع
        </h2>
      </span>
      <div
        className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border border-blue-200 p-6 sm:p-10"
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
          {/* اسم المشروع */}
          <div>
            <label className="block text-blue-800 font-semibold mb-2" htmlFor="name">
              اسم المشروع
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>

          {/* الموقع */}
          <div>
            <label className="block text-blue-800 font-semibold mb-2" htmlFor="location">
              الموقع
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>

          {/* المهندس */}
          <div>
            <label className="block text-blue-800 font-semibold mb-2" htmlFor="engineer">
              المهندس المسؤول
            </label>
            <input
              type="text"
              id="engineer"
              name="engineer"
              value={formData.engineer}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>

          {/* اسم الاستشاري */}
          <div>
            <label className="block text-blue-800 font-semibold mb-2" htmlFor="clientName">
              اسم الاستشاري
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>

          {/* هاتف الاستشاري */}
          <div>
            <label className="block text-blue-800 font-semibold mb-2" htmlFor="clientPhone">
              هاتف الاستشاري
            </label>
            <input
              type="text"
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
            />
          </div>

          {/* مجال العمل */}
          <div>
            <label className="block text-blue-800 font-semibold mb-2" htmlFor="description">
              مجال العمل
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-900 font-medium transition"
              rows={3}
            />
          </div>

          {/* زر التحديث */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 hover:from-blue-500 hover:to-blue-400 text-blue-900 font-extrabold py-3 rounded-xl shadow transition-all duration-150 flex items-center justify-center gap-2 text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{
              fontFamily: "'Tajawal', 'Cairo', sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {loading ? "جاري التحديث..." : "تحديث"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectsData;

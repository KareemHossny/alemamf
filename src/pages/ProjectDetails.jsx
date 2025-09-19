import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [month, setMonth] = useState("");
  const [project, setProject] = useState(null);
  const [workersData, setWorkersData] = useState(null);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await API.get(`/projects/${projectId}`);
        setProject(data.project);
      } catch (err) {
        console.error("Error fetching project", err);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (!month) {
      setWorkersData(null);
      setProjectData(null);
      return;
    }

    const fetchWorkersData = async () => {
      try {
        const { data } = await API.get(`/project-workers/${projectId}/${month}`);
        setWorkersData(data);
      } catch (err) {
        console.error("Error fetching workers data", err);
        setWorkersData(null);
      }
    };

    const fetchProjectData = async () => {
      try {
        const { data } = await API.get(`/projects/${projectId}/${month}-01`);
        setProjectData(data);
      } catch (err) {
        console.error("Error fetching project data", err);
        setProjectData(null);
      }
    };

    fetchWorkersData();
    fetchProjectData();
  }, [month, projectId]);

  const getSafe = (obj, path, defaultValue) => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? defaultValue;
  };

  return (
    <div className="min-h-screen  py-8 px-2">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-8 md:p-12"
      style={{background: "rgba(245,250,255,0.50)",
      border: "1.8px solid #bae6fd",
      boxShadow: "0 10px 36px 0 rgba(30,41,59,0.13)",
      transition: "box-shadow 0.2s, transform 0.2s",
      backdropFilter: "blur(3.5px) saturate(120%)",
      WebkitBackdropFilter: "blur(3.5px) saturate(120%)"}}>
        {project ? (
          <>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-10 text-center drop-shadow-xl tracking-wider"
              style={{
                fontFamily: "'Tajawal', 'Cairo', sans-serif",
                letterSpacing: "0.045em",
                textShadow: "0 2px 16px rgba(30,41,59,0.14)",
              }}
            >
              <span className="inline-block bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 px-6 py-2 rounded-2xl shadow text-gray-700">
              {project.name}  <span className="text-blue-800"> :تفاصيل المشروع</span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-blue-800 font-semibold bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl px-5 py-4 shadow border border-blue-100">
                  <span className="bg-blue-100 rounded-full p-2 shadow">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span>
                    <span className="font-bold text-blue-900">الموقع:</span>{" "}
                    <span className="text-gray-700">{project.location}</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-blue-800 font-semibold bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl px-5 py-4 shadow border border-blue-100">
                  <span className="bg-blue-100 rounded-full p-2 shadow">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span>
                    <span className="font-bold text-blue-900">المهندس:</span>{" "}
                    <span className="text-gray-700">{project.engineer}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-blue-800 font-semibold bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl px-5 py-4 shadow border border-blue-100">
                  <span className="bg-blue-100 rounded-full p-2 shadow">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v4" />
                    </svg>
                  </span>
                  <span>
                    <span className="font-bold text-blue-900">الاستشاري:</span>{" "}
                    <span className="text-gray-700">{project.client.name}</span>
                    <span className="mx-2 text-gray-400 font-normal">|</span>
                    <span className="text-gray-700">{project.client.phone}</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-blue-800 font-semibold bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl px-5 py-4 shadow border border-blue-100">
                  <span className="bg-blue-100 rounded-full p-2 shadow">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2.2" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
                    </svg>
                  </span>
                  <span>
                    <span className="font-bold text-blue-900">مجال العمل:</span>{" "}
                    <span className="text-gray-700">{project.description}</span>
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-10 border-blue-100" />

            <h3
              className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 text-center"
              style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
            >
              البيانات الشهرية
            </h3>
            <div className="mb-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <label className="block text-blue-800 font-semibold text-lg">
                اختر الشهر:
              </label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="px-4 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-gray-700 font-medium transition w-56 shadow"
              />
            </div>

            {/* بيانات العمال */}
            {workersData && (
              <div className="mb-12">
                <h4
                  className="text-xl md:text-2xl font-bold text-purple-700 mb-4 text-center"
                  style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
                >
                  بيانات العمال
                </h4>
                <div className="overflow-x-auto rounded-2xl shadow-lg border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100">
                  <table className="min-w-full bg-transparent text-blue-900 text-center text-base">
                    <thead>
                      <tr className="bg-blue-100 text-blue-800 font-semibold">
                        <th className="py-3 px-4">الاسم</th>
                        <th className="py-3 px-4">الراتب الأساسي</th>
                        <th className="py-3 px-4">ساعات إضافية</th>
                        <th className="py-3 px-4">أجر الإضافي</th>
                        <th className="py-3 px-4">إجمالي الراتب</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workersData.workers.map((w) => (
                        <tr key={w.workerId} className="hover:bg-blue-50 transition">
                          <td className="py-2 px-4 text-gray-700">{w.name}</td>
                          <td className="py-2 px-4 text-gray-700">{w.baseSalary}</td>
                          <td className="py-2 px-4 text-gray-700">{w.extraHours}</td>
                          <td className="py-2 px-4 text-gray-700">{Number(w.overtimePay).toFixed(2)}</td>
                          <td className="py-2 px-4 text-gray-700">{Number(w.totalSalary).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-lg font-semibold text-blue-800 text-right pr-2">
                  <span>إجمالي الرواتب:</span>{" "}
                  <span className="text-green-700">{Number(workersData.totalPayroll).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* بيانات المشروع */}
            {projectData && (
              <div className="mb-8">
                <h4
                  className="text-xl md:text-2xl font-bold text-green-700 mb-4 text-center"
                  style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
                >
                  بيانات المشروع الشهرية
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 rounded-2xl p-6 text-center shadow">
                    <div className="text-blue-800 font-semibold mb-2">إجمالي المصروفات</div>
                    <div className="text-3xl font-bold text-gray-700">
                      {getSafe(projectData, ["totals", "expenses"], 0)} <span className="text-base">EGP</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 rounded-2xl p-6 text-center shadow">
                    <div className="text-blue-800 font-semibold mb-2">إجمالي المواد</div>
                    <div className="text-3xl font-bold text-gray-700">
                      {getSafe(projectData, ["totals", "materialsCost"], 0)} <span className="text-base">EGP</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 rounded-2xl p-6 text-center shadow">
                    <div className="text-blue-800 font-semibold mb-2">دفعات العميل</div>
                    <div className="text-3xl font-bold text-gray-700">
                      {getSafe(projectData, ["totals", "clientPayment"], 0)} <span className="text-base">EGP</span>
                    </div>
                  </div>
                </div>

                <h5 className="text-lg font-bold text-blue-800 mb-3 mt-8 text-center">المعاملات</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <h6 className="text-base font-semibold text-blue-700 mb-2 text-center">المصروفات</h6>
                    <ul className="space-y-3">
                      {(getSafe(projectData, ["monthlyData", "expenses"], []) || []).length === 0 && (
                        <li className="text-blue-400 text-sm text-center">لا يوجد مصروفات لهذا الشهر</li>
                      )}
                      {(getSafe(projectData, ["monthlyData", "expenses"], []) || []).map((e, i) => (
                        <li key={i} className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 flex flex-col sm:flex-row sm:items-center gap-2 shadow-sm">
                          <span className="font-bold text-gray-700">{e.amount} EGP</span>
                          <span className="text-gray-600">{e.description || "بدون وصف"}</span>
                          <span className="text-blue-400 text-xs ml-auto">{new Date(e.date).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-base font-semibold text-blue-700 mb-2 text-center">المواد</h6>
                    <ul className="space-y-3">
                      {(getSafe(projectData, ["monthlyData", "materialsCost"], []) || []).length === 0 && (
                        <li className="text-blue-400 text-sm text-center">لا يوجد مواد لهذا الشهر</li>
                      )}
                      {(getSafe(projectData, ["monthlyData", "materialsCost"], []) || []).map((m, i) => (
                        <li key={i} className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 flex flex-col sm:flex-row sm:items-center gap-2 shadow-sm">
                          <span className="font-bold text-gray-700">{m.amount} EGP</span>
                          <span className="text-gray-600">{m.description || "بدون وصف"}</span>
                          <span className="text-blue-400 text-xs ml-auto">{new Date(m.date).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-base font-semibold text-blue-700 mb-2 text-center">دفعات العميل</h6>
                    <ul className="space-y-3">
                      {(getSafe(projectData, ["monthlyData", "clientPayment"], []) || []).length === 0 && (
                        <li className="text-blue-400 text-sm text-center">لا يوجد دفعات لهذا الشهر</li>
                      )}
                      {(getSafe(projectData, ["monthlyData", "clientPayment"], []) || []).map((c, i) => (
                        <li key={i} className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 flex flex-col sm:flex-row sm:items-center gap-2 shadow-sm">
                          <span className="font-bold text-gray-700">{c.amount} EGP</span>
                          <span className="text-gray-600">{c.description || "بدون وصف"}</span>
                          <span className="text-blue-400 text-xs ml-auto">{new Date(c.date).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-blue-400 text-2xl font-semibold animate-pulse mb-2">
              جاري تحميل تفاصيل المشروع...
            </div>
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mt-2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;

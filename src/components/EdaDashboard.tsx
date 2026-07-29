import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  ScatterChart, Scatter, ZAxis, CartesianGrid 
} from "recharts";
import { BarChart3, Info, Image as ImageIcon, PieChart as PieChartIcon } from "lucide-react";

export const EdaDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"generated" | "interactive">("interactive");

  const classData = [
    { name: "High Performance (Pass)", count: 674, fill: "#10b981", percent: "67.4%" },
    { name: "Low Performance (Fail)", count: 326, fill: "#ef4444", percent: "32.6%" }
  ];

  const attendanceBins = [
    { range: "< 60%", pass: 12, fail: 88, passRate: "12%" },
    { range: "60-70%", pass: 35, fail: 65, passRate: "35%" },
    { range: "70-80%", pass: 68, fail: 32, passRate: "68%" },
    { range: "80-90%", pass: 89, fail: 11, passRate: "89%" },
    { range: "90-100%", pass: 96, fail: 4, passRate: "96%" }
  ];

  const studyHoursImpact = [
    { hours: "1-5 hrs", avgGrade: 51.2, passRate: 28 },
    { hours: "6-10 hrs", avgGrade: 62.8, passRate: 64 },
    { hours: "11-15 hrs", avgGrade: 73.4, passRate: 88 },
    { hours: "16-20 hrs", avgGrade: 79.1, passRate: 94 },
    { hours: "> 20 hrs", avgGrade: 81.5, passRate: 96 }
  ];

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" /> Exploratory Data Analysis (EDA)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visual inspection of feature distributions, target balances, and correlation structures across 1,000 student records.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === "interactive" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Interactive Charts
          </button>
          <button
            onClick={() => setActiveTab("generated")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === "generated" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Python Generated Plots
          </button>
        </div>
      </div>

      {activeTab === "interactive" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Target Class Balance */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Target Variable Distribution (Performance)</h3>
                <p className="text-xs text-slate-500">Binary classification balance: High (1) vs Low (0)</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Balanced Ratio
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {classData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" /> Analytical Explanation:
              </div>
              <p className="text-slate-600">
                The dataset exhibits a 67.4% Pass (674 students) to 32.6% Fail (326 students) distribution. This moderate balance provides adequate positive and negative training examples for supervised classifiers without requiring synthetic oversampling (SMOTE).
              </p>
            </div>
          </div>

          {/* Chart 2: Attendance vs Performance */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Attendance Bins vs Pass Rate</h3>
                <p className="text-xs text-slate-500">How class attendance percentage influences academic outcome</p>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Key Factor
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceBins} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Bar dataKey="pass" name="Pass Rate %" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="fail" name="Fail Rate %" fill="#f87171" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" /> Analytical Explanation:
              </div>
              <p className="text-slate-600">
                Attendance rate displays a sharp non-linear threshold effect. Students maintaining over 80% attendance achieve pass rates exceeding 89%, whereas attendance below 60% yields a high failure rate of 88%.
              </p>
            </div>
          </div>

          {/* Chart 3: Weekly Study Hours vs Average Grade */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 lg:col-span-2">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Weekly Study Hours vs Average Exam Grade</h3>
                <p className="text-xs text-slate-500">Evaluating diminishing returns on study duration</p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Behavioral Pattern
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyHoursImpact} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <XAxis dataKey="hours" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="avgGrade" name="Average Grade" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" /> Analytical Explanation:
              </div>
              <p className="text-slate-600">
                Increasing weekly study time from 1-5 hours to 11-15 hours boosts average final grades from 51.2% to 73.4%. Beyond 18 hours per week, grade increases plateau, indicating logarithmic returns where study quality and sleep balance become limiting factors.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Python Generated High-Res Plots */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" /> Target Class Distribution Plot
            </h3>
            <img 
              src="/images/performance_distribution.png" 
              alt="Performance Distribution" 
              className="w-full rounded-xl border border-slate-100 object-contain max-h-72"
            />
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Explanation:</strong> Count plot demonstrating the distribution of High Performance (Pass=1) vs Low Performance (Fail=0). Generated via Seaborn.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" /> Feature Correlation Heatmap
            </h3>
            <img 
              src="/images/correlation_heatmap.png" 
              alt="Correlation Heatmap" 
              className="w-full rounded-xl border border-slate-100 object-contain max-h-72"
            />
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Explanation:</strong> Pearson correlation matrix highlighting strong positive linear relationships between Previous_Score (+0.68), Attendance (+0.54), Study_Time (+0.48) and final Performance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" /> Attendance vs Performance Boxplot
            </h3>
            <img 
              src="/images/attendance_vs_performance.png" 
              alt="Attendance vs Performance" 
              className="w-full rounded-xl border border-slate-100 object-contain max-h-72"
            />
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Explanation:</strong> Boxplot showing median attendance for passing students (~88%) versus failing students (~64%).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" /> Weekly Study Hours Boxplot
            </h3>
            <img 
              src="/images/study_vs_performance.png" 
              alt="Study Hours vs Performance" 
              className="w-full rounded-xl border border-slate-100 object-contain max-h-72"
            />
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Explanation:</strong> Distribution of weekly self-study hours comparing successful students with low performers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

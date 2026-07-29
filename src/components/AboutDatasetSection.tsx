import React from "react";
import { Database, Target, Layers, Cpu, Check, FileSpreadsheet } from "lucide-react";
import { NavTab } from "./Navbar";

interface AboutDatasetProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutDatasetSection: React.FC<AboutDatasetProps> = ({ onNavigate }) => {
  const cards = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      title: "Total Features",
      value: "13 Attributes",
      desc: "Demographic, academic, behavioral, lifestyle, and environmental features."
    },
    {
      icon: <Target className="w-5 h-5 text-emerald-600" />,
      title: "Target Variable",
      value: "Performance Status",
      desc: "Binary classification target: High Performance (Pass) vs Low Performance (Fail)."
    },
    {
      icon: <Database className="w-5 h-5 text-purple-600" />,
      title: "Dataset Source",
      value: "UCI ML Repository",
      desc: "1,000 student records derived from standard benchmark educational datasets."
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-600" />,
      title: "Problem Type",
      value: "Binary Classification",
      desc: "Supervised Learning task utilizing Stratified 80/20 train-test splitting."
    }
  ];

  return (
    <section className="py-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Info Cards */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 inline-block">
              Dataset Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              About the Student Dataset
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
              The underlying dataset contains comprehensive attributes tracking student demographics, study habits, lecture attendance, exam scores, and home support mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-left space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    {c.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">{c.title}</span>
                </div>
                <div className="text-base font-extrabold text-slate-900">{c.value}</div>
                <p className="text-[11px] text-slate-500 leading-normal">{c.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => onNavigate("dataset")}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Browse Full Dataset Table</span>
            </button>
          </div>
        </div>

        {/* Right Side Feature Matrix Illustration */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50 to-slate-100 p-6 rounded-2xl border border-slate-200/80 space-y-4 text-left">
          <div className="flex justify-between items-center text-xs font-bold text-slate-900 border-b border-slate-200/80 pb-3">
            <span>Feature Breakdown (13 Variables)</span>
            <span className="text-indigo-600 font-mono text-[11px]">1,000 Rows</span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            {[
              { name: "Gender", type: "Categorical (Male, Female)", icon: true },
              { name: "Age", type: "Numerical (15 - 22 years)", icon: true },
              { name: "Study Time", type: "Numerical (hours/week)", icon: true },
              { name: "Attendance (%)", type: "Numerical (0 - 100%)", icon: true },
              { name: "Previous Score (%)", type: "Numerical (0 - 100)", icon: true },
              { name: "Sleep Hours", type: "Numerical (hours/day)", icon: true },
              { name: "Parent Education", type: "Ordinal (High School to PhD)", icon: true },
              { name: "Family Support", type: "Binary (Yes / No)", icon: true },
              { name: "Internet Access", type: "Binary (Yes / No)", icon: true },
              { name: "Extra Activities", type: "Binary (Yes / No)", icon: true },
            ].map((f, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white border border-slate-200/60 text-[11px]">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600" />
                  {f.name}
                </span>
                <span className="text-slate-500 font-mono">{f.type}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

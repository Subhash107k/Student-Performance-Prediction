import React from "react";
import { Download, FileCode, Database, Presentation, BookOpen, FileText, Package, CheckCircle2 } from "lucide-react";

export const DownloadHub: React.FC = () => {
  const files = [
    {
      name: "student_performance.csv",
      path: "/api/download/student_performance.csv",
      category: "Dataset",
      desc: "1,000 student records featuring 12 attributes (demographic, academic, behavioral).",
      icon: <Database className="w-5 h-5 text-emerald-600" />
    },
    {
      name: "train.py",
      path: "/api/download/train.py",
      category: "Python Script",
      desc: "Complete end-to-end ML pipeline script (Preprocessing, 6 Models, Plotting, Model Saving).",
      icon: <FileCode className="w-5 h-5 text-blue-600" />
    },
    {
      name: "predict.py",
      path: "/api/download/predict.py",
      category: "Python CLI",
      desc: "CLI utility for predicting student performance on custom user inputs.",
      icon: <FileCode className="w-5 h-5 text-indigo-600" />
    },
    {
      name: "notebook.ipynb",
      path: "/api/download/notebook.ipynb",
      category: "Jupyter Notebook",
      desc: "Step-by-step Jupyter Notebook walkthrough suitable for college submission.",
      icon: <BookOpen className="w-5 h-5 text-amber-600" />
    },
    {
      name: "presentation.pptx",
      path: "/api/download/presentation.pptx",
      category: "PowerPoint Deck",
      desc: "12-slide presentation deck formatted for project defense and faculty reviews.",
      icon: <Presentation className="w-5 h-5 text-rose-600" />
    },
    {
      name: "student_performance_model.pkl",
      path: "/api/download/student_performance_model.pkl",
      category: "Model Binary",
      desc: "Serialized Joblib binary containing the trained Random Forest model & StandardScaler.",
      icon: <Package className="w-5 h-5 text-purple-600" />
    },
    {
      name: "requirements.txt",
      path: "/api/download/requirements.txt",
      category: "Configuration",
      desc: "List of required Python libraries (pandas, scikit-learn, seaborn, python-pptx).",
      icon: <FileText className="w-5 h-5 text-slate-600" />
    },
    {
      name: "README.md",
      path: "/api/download/README.md",
      category: "Documentation",
      desc: "Project overview, folder structure, benchmark comparison table, and setup guide.",
      icon: <FileText className="w-5 h-5 text-teal-600" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Download className="w-6 h-6 text-emerald-600" /> Project Deliverables & Downloads
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Download all source files, models, datasets, reports, and presentation slides required for college microproject submission.
          </p>
        </div>
        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All 8 Deliverables Ready
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {files.map((f, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                {f.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 text-sm">{f.name}</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                    {f.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>

            <a
              href={f.path}
              download
              className="w-full py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" /> Download {f.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

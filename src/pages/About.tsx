import React from "react";
import { BookOpen, Target, Layers, Cpu, Download, CheckCircle2, FileCode, Presentation, FileSpreadsheet, ArrowRight, Sparkles } from "lucide-react";

interface AboutProps {
  onShowToast: (msg: string) => void;
}

export const About: React.FC<AboutProps> = ({ onShowToast }) => {
  const workflowSteps = [
    {
      step: "01",
      title: "Data Collection",
      desc: "Aggregating 1,000 student records containing demographic, academic, and lifestyle variables."
    },
    {
      step: "02",
      title: "Data Preprocessing",
      desc: "Handling missing values, standard scaling numerical features, and target binary encoding."
    },
    {
      step: "03",
      title: "Feature Engineering",
      desc: "Creating study efficiency ratios and feature correlation analysis to eliminate redundancy."
    },
    {
      step: "04",
      title: "Model Training & Tuning",
      desc: "Training 6 algorithms with 5-Fold Stratified Cross-Validation and Hyperparameter GridSearch."
    },
    {
      step: "05",
      title: "Deployment & Inference",
      desc: "Serving real-time Random Forest predictions through a modern SaaS React & FastAPI stack."
    },
    {
      step: "06",
      title: "Data Sources",
      desc: "Powered by comprehensive student demographic, academic, and behavioral datasets."
    }
  ];

  const technologies = [
    { name: "Python 3.10", category: "Backend ML Language", color: "bg-amber-50 text-amber-800 border-amber-200" },
    { name: "Scikit-Learn", category: "ML Algorithm Library", color: "bg-orange-50 text-orange-800 border-orange-200" },
    { name: "Pandas & NumPy", category: "Data Wrangling", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { name: "React 19 & Vite", category: "Frontend Web Stack", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    { name: "Tailwind CSS v4", category: "UI & Modern Design", color: "bg-cyan-50 text-cyan-800 border-cyan-200" },
    { name: "Recharts", category: "Data Visualizations", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { name: "FastAPI", category: "Backend API Server", color: "bg-teal-50 text-teal-800 border-teal-200" },
  ];

  const projectDownloads = [
    { name: "student_performance.csv", label: "Dataset CSV File", icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> },
    { name: "notebook.ipynb", label: "Jupyter Notebook EDA", icon: <FileCode className="w-4 h-4 text-amber-600" /> },
    { name: "presentation.pptx", label: "Defense Slide Deck", icon: <Presentation className="w-4 h-4 text-purple-600" /> },
    { name: "train.py", label: "Model Training Script", icon: <FileCode className="w-4 h-4 text-indigo-600" /> },
    { name: "student_performance_model.pkl", label: "Trained Model Binary", icon: <Cpu className="w-4 h-4 text-cyan-600" /> },
  ];

  const handleDownload = (filename: string, label: string) => {
    onShowToast(`Downloading ${label}...`);
    window.location.href = `/api/download/${filename}`;
  };

  return (
    <div className="py-4 space-y-10 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" /> College Microproject Documentation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          About the Student Performance Microproject
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive project documentation covering the problem formulation, machine learning engineering pipeline, algorithm comparison, and downloadable source code artifacts.
        </p>
      </div>

      {/* Grid: Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Problem Statement Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Problem Statement</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Academic underperformance and unexpected student course failures pose significant challenges to educational institutions. Traditional manual evaluations often identify struggling students too late in the academic term.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
            By leveraging Machine Learning on early behavioral markers (study hours, attendance, previous scores, family support), institutions can automate early risk detection and provide timely academic intervention.
          </p>
        </div>

        {/* Project Objectives Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Project Objectives</h3>
          <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Collect and preprocess student demographic and academic performance metrics.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Perform Exploratory Data Analysis (EDA) to discover feature importance weights.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Train & compare 6 classification algorithms (Random Forest, SVM, LR, DT, NB, KNN).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Deploy a modern SaaS React web dashboard for instant real-time predictions.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Machine Learning Pipeline Diagram */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" /> Machine Learning Pipeline Architecture
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            End-to-End Data Science & Software Engineering Workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflowSteps.map((wf, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative">
              <div className="text-xs font-black text-indigo-600 font-mono">{wf.step}</div>
              <div className="font-extrabold text-slate-900 text-sm">{wf.title}</div>
              <p className="text-[11px] text-slate-500 leading-normal">{wf.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" /> Technologies & Frameworks
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Built with modern data science tools and full-stack web technologies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${tech.color} space-y-1`}>
              <div className="font-extrabold text-sm">{tech.name}</div>
              <div className="text-[11px] opacity-80 font-medium">{tech.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Project Source Artifacts */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" /> Project Artifacts & Submissions
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Download source code, Jupyter notebook, PowerPoint presentation, and dataset files.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projectDownloads.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleDownload(item.name, item.label)}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-left transition hover:border-indigo-400/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.name}</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

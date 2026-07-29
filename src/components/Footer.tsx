import React from "react";
import { GraduationCap, Github, Sparkles, BookOpen, Layers } from "lucide-react";
import { NavTab } from "./Navbar";

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenGithub: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenGithub }) => {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white pt-12 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                Student Performance Prediction ML
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              An end-to-end Machine Learning Microproject predicting student academic outcomes using demographic, academic, and behavioral features with Scikit-Learn models.
            </p>
          </div>

          {/* Page Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Project Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
              <button onClick={() => onNavigate("home")} className="text-left hover:text-indigo-600 transition">
                Home Overview
              </button>
              <button onClick={() => onNavigate("predict")} className="text-left hover:text-indigo-600 transition">
                Live Predictor
              </button>
              <button onClick={() => onNavigate("analytics")} className="text-left hover:text-indigo-600 transition">
                Model Analytics
              </button>
              <button onClick={() => onNavigate("dataset")} className="text-left hover:text-indigo-600 transition">
                Dataset Table
              </button>
              <button onClick={() => onNavigate("about")} className="text-left hover:text-indigo-600 transition">
                Project Documentation
              </button>
            </div>
          </div>

          {/* Tech Badges */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Technology Stack
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
              <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">Python 3.10</span>
              <span className="px-2.5 py-1 bg-indigo-50 rounded-md text-indigo-700">Scikit-Learn</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">Pandas & NumPy</span>
              <span className="px-2.5 py-1 bg-purple-50 rounded-md text-purple-700">React + Vite</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">Tailwind CSS</span>
              <span className="px-2.5 py-1 bg-emerald-50 rounded-md text-emerald-700">Recharts</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Machine Learning Microproject Submission. All rights reserved.</p>

          <button
            onClick={onOpenGithub}
            className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 font-semibold transition"
          >
            <Github className="w-4 h-4" />
            <span>View Source Repository</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

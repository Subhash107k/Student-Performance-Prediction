import React from "react";
import { Award, AlertTriangle, RotateCcw, Download, BarChart2, CheckCircle2, TrendingUp, Sparkles, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { NavTab } from "./Navbar";

export interface PredictionResult {
  status: "High Performance" | "Low Performance";
  probability: number;
  estimatedGrade: number;
  studyEfficiency: number;
  recommendations: string[];
  inputs: {
    gender: string;
    age: number;
    studyTimeHours: number;
    attendancePercentage: number;
    previousScore: number;
    parentEducation: string;
    familySupport: string;
    internetAccess: string;
    extraActivities: string;
    sleepHours: number;
    hoursStudied: number;
    assignmentsCompleted: number;
    participationLevel: string;
  };
}

interface ResultCardProps {
  result: PredictionResult;
  onReset: () => void;
  onNavigate: (tab: NavTab) => void;
  onShowToast: (msg: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onReset,
  onNavigate,
  onShowToast,
}) => {
  const isHigh = result.status === "High Performance";

  const handleDownloadReport = () => {
    onShowToast("Generated academic risk assessment report download.");
    window.location.href = "/api/download/README.md";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl space-y-8 max-w-4xl mx-auto text-left"
    >
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md">
        <div className="flex items-center gap-5">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              isHigh
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
            }`}
          >
            {isHigh ? <Award className="w-9 h-9" /> : <AlertTriangle className="w-9 h-9" />}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
              Prediction Outcome
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5 ${
                isHigh ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isHigh ? "🟢 High Performance (Pass)" : "🔴 Low Performance (Risk)"}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isHigh
                ? "Student exhibits high academic discipline and probability of passing final exams."
                : "Student requires academic counseling and early intervention to reduce failure risk."}
            </p>
          </div>
        </div>

        {/* Confidence Percentage Badge */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[160px]">
          <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            Model Confidence
          </div>
          <div className="text-3xl font-black text-white mt-1">{result.probability}%</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-0.5">Random Forest ML</div>
        </div>
      </div>

      {/* Confidence Progress Bar */}
      <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Confidence Level Bar
          </span>
          <span className="font-mono text-indigo-700 font-extrabold">{result.probability}% Confidence</span>
        </div>

        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.probability}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isHigh
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : "bg-gradient-to-r from-amber-500 to-rose-500"
            }`}
          />
        </div>
      </div>

      {/* Feature Importance Chips & Contributing Factors */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" /> Primary Contributing Factors
        </h3>
        
        <div className="flex flex-wrap gap-2.5">
          <div className="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold flex items-center gap-2">
            <span className="font-bold text-indigo-600">Previous Score:</span> {result.inputs.previousScore}%
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold flex items-center gap-2">
            <span className="font-bold text-indigo-600">Attendance:</span> {result.inputs.attendancePercentage}%
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-900 text-xs font-semibold flex items-center gap-2">
            <span className="font-bold text-purple-600">Study Time:</span> {result.inputs.studyTimeHours} hrs/wk
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-semibold flex items-center gap-2">
            <span className="font-bold text-emerald-600">Sleep Hours:</span> {result.inputs.sleepHours} hrs/day
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2">
            <span className="font-bold text-slate-600">Family Support:</span> {result.inputs.familySupport}
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2">
            <span className="font-bold text-slate-600">Assignments:</span> {result.inputs.assignmentsCompleted}%
          </div>
        </div>
      </div>

      {/* Model Recommendations */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
        <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-700" /> Actionable Insights & Recommendations
        </h4>
        <ul className="space-y-2 text-xs text-amber-950 font-medium">
          {result.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-md shadow-indigo-500/20 active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Predict Again</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("analytics")}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs flex items-center gap-2 transition shadow-2xs"
          >
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            <span>View Analytics</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-2xs"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Report</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

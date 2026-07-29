import React from "react";
import { Sparkles, ArrowRight, Database, CheckCircle2, TrendingUp, BrainCircuit, Users, Award } from "lucide-react";
import { motion } from "motion/react";
import { NavTab } from "./Navbar";

interface HeroProps {
  onNavigate: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-indigo-50/50 via-slate-50 to-white rounded-3xl border border-slate-200/80 shadow-2xs">
      {/* Decorative Gradient Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Machine Learning & Predictive Analytics Pipeline</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Predict Student Performance with{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Machine Learning
              </span>
            </h1>

            {/* Description */}
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              This application uses machine learning algorithms to predict student academic performance based on various factors like study time, attendance, previous scores, sleep hours, and family support.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate("predict")}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-98"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("dataset")}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-sm flex items-center gap-2 transition shadow-2xs hover:border-slate-300"
              >
                <Database className="w-4 h-4 text-indigo-600" />
                <span>Explore Dataset</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">1,000 Records</span>
                  <span className="text-[11px] text-slate-500">Benchmark Data</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">94.5% Accuracy</span>
                  <span className="text-[11px] text-slate-500">Random Forest</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Instant Results</span>
                  <span className="text-[11px] text-slate-500">Real-Time ML</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Illustration & Floating Cards Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative bg-gradient-to-tr from-indigo-600/10 via-purple-500/10 to-blue-500/10 p-6 sm:p-8 rounded-3xl border border-indigo-100 backdrop-blur-xs shadow-xl">
              
              {/* Graphic Illustration Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-6">
                
                {/* Illustration Banner */}
                <div className="relative bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-xl p-6 text-white overflow-hidden shadow-inner flex flex-col items-center text-center">
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold backdrop-blur-xs">
                    ML Model v1.0
                  </div>

                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3 shadow-lg">
                    <BrainCircuit className="w-8 h-8 text-indigo-200" />
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight">Student Success Predictor</h3>
                  <p className="text-xs text-indigo-100 mt-1 max-w-xs">
                    Supervised Classification Model evaluating academic and behavioral signals
                  </p>
                </div>

                {/* Key Metrics Mini Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
                    <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
                      <span>Total Students</span>
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 mt-1">1,000</div>
                    <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> 100% Validated
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-left">
                    <div className="flex items-center justify-between text-emerald-700 text-[11px] font-semibold">
                      <span>Model Accuracy</span>
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">94.5%</div>
                    <div className="text-[10px] font-medium text-emerald-700 mt-0.5">
                      Random Forest Classifier
                    </div>
                  </div>
                </div>

                {/* Top Features Importances Mini Bar */}
                <div className="space-y-2 pt-1 border-t border-slate-100 text-left">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Top Feature Drivers</span>
                    <span className="text-indigo-600 text-[11px]">Weights</span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span>Previous Score</span>
                        <span className="font-mono font-bold">28%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: "28%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span>Study Time (hrs)</span>
                        <span className="font-mono font-bold">22%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: "22%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span>Attendance (%)</span>
                        <span className="font-mono font-bold">18%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: "18%" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Glassmorphism Badge 1 - Top Left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg flex items-center gap-3 text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  92%
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Pass Rate Confidence</div>
                  <div className="text-[10px] text-slate-500">Real-time Inference</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-3 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Scikit-Learn Backend</div>
                  <div className="text-[10px] text-slate-400">6 Classification Models</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

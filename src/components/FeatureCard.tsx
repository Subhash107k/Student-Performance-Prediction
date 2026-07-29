import React from "react";
import { BarChart3, BrainCircuit, LineChart, Zap } from "lucide-react";
import { motion } from "motion/react";

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50 border-indigo-100",
      title: "Data Analysis",
      description: "Comprehensive exploratory data analysis and visualization of student academic, behavioral, and lifestyle attributes."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50 border-purple-100",
      title: "Machine Learning Prediction",
      description: "6 classification algorithms evaluated with cross-validation to select the highest-performing Random Forest model."
    },
    {
      icon: <LineChart className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
      title: "Performance Insights",
      description: "Actionable feature importance factors and tailored counseling advice for early academic interventions."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50 border-amber-100",
      title: "Fast Prediction",
      description: "Instant real-time predictions with confidence percentages and instant downloadable technical reports."
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 inline-block">
          Core Capabilities
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Everything You Need for Student Risk Analytics
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Designed with clean software engineering principles and validated Machine Learning algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all text-left flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-xl ${feat.bg} border flex items-center justify-center shrink-0`}>
                {feat.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{feat.title}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

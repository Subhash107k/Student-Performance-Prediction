import React, { useState, useEffect } from "react";
import { GitCompare, Trophy, Award, BarChart, CheckCircle, HelpCircle } from "lucide-react";
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface ModelMetrics {
  Accuracy: number;
  Precision: number;
  Recall: number;
  F1: number;
  "ROC-AUC": number;
  CV_Mean?: number;
}

interface FeatureImp {
  feature: string;
  importance: number;
}

export const ModelComparison: React.FC = () => {
  const [data, setData] = useState<{
    best_model: string;
    metrics: Record<string, ModelMetrics>;
    feature_importances: FeatureImp[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/project-data")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        Loading evaluation metrics...
      </div>
    );
  }

  const modelNames = Object.keys(data.metrics);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-indigo-900/50 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <Trophy className="w-4 h-4" /> Classification Benchmark & Evaluation
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Machine Learning Model Comparison</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Evaluating 6 distinct supervised learning algorithms on 200 hold-out test samples with 5-fold cross validation.
            </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-amber-300 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Best Model Selected</div>
              <div className="text-base font-extrabold text-white">{data.best_model}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Comparison Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-indigo-600" /> Model Performance Metrics
          </h3>
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
            Test Set: 200 Samples
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 uppercase font-bold text-[11px] border-b border-slate-200">
                <th className="py-3 px-4">Model Algorithm</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1 Score</th>
                <th className="py-3 px-4">ROC-AUC</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modelNames.map((name) => {
                const m = data.metrics[name];
                const isBest = name === data.best_model;
                return (
                  <tr
                    key={name}
                    className={`transition hover:bg-slate-50/80 ${
                      isBest ? "bg-emerald-50/50 font-bold text-slate-900" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                      {isBest && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {name}
                    </td>
                    <td className={`py-3.5 px-4 ${isBest ? "text-emerald-700 font-extrabold" : ""}`}>
                      {(m.Accuracy * 100).toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4">{(m.Precision * 100).toFixed(2)}%</td>
                    <td className="py-3.5 px-4">{(m.Recall * 100).toFixed(2)}%</td>
                    <td className="py-3.5 px-4">{m.F1.toFixed(3)}</td>
                    <td className="py-3.5 px-4">{m["ROC-AUC"].toFixed(3)}</td>
                    <td className="py-3.5 px-4">
                      {isBest ? (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Primary Model
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Evaluated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Importance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-emerald-600" /> Random Forest Feature Importance
            </h3>
            <p className="text-xs text-slate-500">Relative contribution of features in splitting decision trees</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                layout="vertical"
                data={data.feature_importances}
                margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
              >
                <XAxis type="number" domain={[0, 0.5]} />
                <YAxis dataKey="feature" type="category" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: any) => [`${(Number(val) * 100).toFixed(2)}%`, "Importance"]} />
                <Bar dataKey="importance" fill="#10b981" radius={[0, 6, 6, 0]}>
                  {data.feature_importances.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index < 3 ? "#059669" : index < 6 ? "#10b981" : "#6ee7b7"}
                    />
                  ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong>Key Insight:</strong> Previous Exam Score (32.4%) and Attendance Percentage (26.1%) account for over 58% of total predictive power in student outcome classification.
          </div>
        </div>

        {/* Plots Visualizer */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Confusion Matrix & ROC Curve</h3>
            <p className="text-xs text-slate-500">Validation metrics for model confidence</p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">Confusion Matrix (Best Model)</span>
              <img
                src="/images/confusion_matrix.png"
                alt="Confusion Matrix"
                className="w-full h-44 rounded-xl border border-slate-200 object-contain bg-slate-50"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">ROC Curve Comparison</span>
              <img
                src="/images/roc_curve.png"
                alt="ROC Curve"
                className="w-full h-44 rounded-xl border border-slate-200 object-contain bg-slate-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

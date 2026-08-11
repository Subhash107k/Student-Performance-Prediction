import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Cpu,
  Award,
  Zap,
} from "lucide-react";
import { fetchAnalytics } from "../services/api";

interface AnalyticsResponse {
  overview: {
    totalSamples?: number;
    bestModel?: string;
    bestAccuracy?: number;
  };
  modelMetrics: Array<{
    model: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1: number;
    rocAuc: number;
    isBest?: boolean;
  }>;
  featureImportances: Array<{
    feature: string;
    importance: number;
    percentage: number;
  }>;
  performanceDistribution: Array<{
    name: string;
    value: number;
    color: string;
    percentage: number;
  }>;
  studyHoursDistribution: Array<{ hours: string; avgScore: number }>;
  attendanceDistribution: Array<{ range: string; count: number }>;
  correlationMatrix: Array<{ feature: string; finalScore: number }>;
}

export const AnalyticsCharts: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const data = await fetchAnalytics();
        setAnalytics(data as unknown as AnalyticsResponse);
      } catch (error) {
        setAnalytics(null);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const modelMetrics = useMemo(
    () => analytics?.modelMetrics ?? [],
    [analytics],
  );
  const featureImportances = useMemo(
    () => analytics?.featureImportances ?? [],
    [analytics],
  );
  const performanceDistribution = useMemo(
    () => analytics?.performanceDistribution ?? [],
    [analytics],
  );
  const studyHoursDistribution = useMemo(
    () => analytics?.studyHoursDistribution ?? [],
    [analytics],
  );
  const attendanceDistribution = useMemo(
    () => analytics?.attendanceDistribution ?? [],
    [analytics],
  );
  const correlationMatrix = useMemo(
    () => analytics?.correlationMatrix ?? [],
    [analytics],
  );

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading analytics from the backend...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-2">
            <Cpu className="w-3.5 h-3.5" /> Machine Learning Analytics Dashboard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Exploratory Data Analysis & Model Metrics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Visual analysis of model performance benchmarks, feature importance
            weights, study habit correlations, and target class balance.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
          <Award className="w-10 h-10 text-emerald-400" />
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">
              Top Model
            </div>
            <div className="text-lg font-extrabold text-white">
              {analytics?.overview?.bestModel ?? "Training"}
            </div>
            <div className="text-xs font-bold text-emerald-400">
              {analytics?.overview?.bestAccuracy ?? 0}% Accuracy
            </div>
          </div>
        </div>
      </div>

      {/* Grid 1: Model Comparison & Feature Importances */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Model Comparison Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" /> Classifier
                Performance Benchmark
              </h3>
              <p className="text-xs text-slate-500">
                Evaluation across 6 Supervised Machine Learning Algorithms (%)
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              6 Models
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={modelMetrics}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="model"
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <YAxis
                  domain={[75, 100]}
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px",
                    border: "none",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
                <Bar
                  dataKey="accuracy"
                  name="Accuracy (%)"
                  fill="#4F46E5"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="f1"
                  name="F1 Score (%)"
                  fill="#8B5CF6"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="rocAuc"
                  name="ROC-AUC (%)"
                  fill="#10B981"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importances Bar Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" /> Feature
                Importance Weights
              </h3>
              <p className="text-xs text-slate-500">
                Random Forest Gini Impurity Importance (%)
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={featureImportances.map((item) => ({
                  feature: item.feature,
                  percentage: item.percentage,
                }))}
                margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  type="number"
                  domain={[0, 30]}
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <YAxis
                  dataKey="feature"
                  type="category"
                  tick={{ fontSize: 10, fill: "#334155" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="percentage"
                  name="Importance Weight (%)"
                  fill="#6366F1"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid 2: Performance Donut & Study Hours Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Target Performance Class Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-600" /> Performance Class
              Distribution
            </h3>
            <p className="text-xs text-slate-500">
              1,000 Total Student Dataset Proportion
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px",
                    border: "none",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs font-bold pt-2 border-t border-slate-100">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80 text-emerald-900">
              {performanceDistribution[0]?.value ?? 0} High Performance (
              {performanceDistribution[0]?.percentage ?? 0}%)
            </div>
            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200/80 text-rose-900">
              {performanceDistribution[1]?.value ?? 0} Low Performance (
              {performanceDistribution[1]?.percentage ?? 0}%)
            </div>
          </div>
        </div>

        {/* Study Hours Distribution vs Avg Final Score Area Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" /> Study Hours vs Average
              Final Grade
            </h3>
            <p className="text-xs text-slate-500">
              Correlating weekly study hours against student exam grade
              trajectory
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={studyHoursDistribution}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorAvgScore"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="hours"
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px",
                    border: "none",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgScore"
                  name="Avg Final Score (%)"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAvgScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid 3: Correlation Matrix */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base">
            Feature Correlation Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Pearson Correlation Coefficients between primary academic predictors
            and final performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {correlationMatrix.map((row, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2"
            >
              <div className="font-bold text-slate-900 text-xs flex justify-between">
                <span>{row.feature}</span>
                <span className="font-mono text-indigo-600 font-extrabold">
                  {row.finalScore.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${Math.abs(row.finalScore) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Correlation with Final Grade outcome
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

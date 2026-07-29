import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { fetchDatasetPreview, fetchDatasetSummary } from "../services/api";

interface DatasetRow {
  id: string;
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
  finalGrade: number;
  performance: string;
}

interface DatasetTableProps {
  onShowToast: (msg: string) => void;
}

export const DatasetTable: React.FC<DatasetTableProps> = ({ onShowToast }) => {
  const [rows, setRows] = useState<DatasetRow[]>([]);
  const [summary, setSummary] = useState<{
    rows: number;
    columns: number;
    missing_values: Record<string, number>;
    feature_names: string[];
    target_variable: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPerformance, setFilterPerformance] = useState<
    "All" | "High Performance" | "Low Performance"
  >("All");
  const [sortField, setSortField] = useState<keyof DatasetRow>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [summaryData, previewData] = await Promise.all([
          fetchDatasetSummary(),
          fetchDatasetPreview(200, 0),
        ]);
        setSummary(summaryData);
        setRows((previewData.rows as DatasetRow[]) || []);
      } catch (error) {
        onShowToast("Unable to load dataset from the backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [onShowToast]);

  const filteredData = useMemo(() => {
    return rows.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parentEducation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.performance.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterPerformance === "All" || item.performance === filterPerformance;
      return matchesSearch && matchesFilter;
    });
  }, [rows, searchTerm, filterPerformance]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
      return sortDirection === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filteredData, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage]);

  const handleSort = (field: keyof DatasetRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDownloadCSV = () => {
    onShowToast("Downloading dataset CSV file (student_performance.csv)...");
    window.location.href = "/api/download/student_performance.csv";
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Dataset Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Records</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {summary?.rows ?? "—"}
          </div>
          <p className="text-[11px] text-slate-500">
            Loaded from the live backend dataset
          </p>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-800">
            <span>High Performance (Pass)</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950">
            {
              rows.filter((row) => row.performance === "High Performance")
                .length
            }{" "}
            Records
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">
            Live pass rate from the training data
          </p>
        </div>

        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-800">
            <span>Low Performance (Risk)</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-950">
            {rows.filter((row) => row.performance === "Low Performance").length}{" "}
            Records
          </div>
          <p className="text-[11px] text-rose-700 font-medium">
            Current high-risk student count
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Avg Attendance</span>
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {rows.length
              ? `${(rows.reduce((sum, row) => sum + row.attendancePercentage, 0) / rows.length).toFixed(1)}%`
              : "—"}
          </div>
          <p className="text-[11px] text-slate-500">
            Across all loaded student samples
          </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 space-y-6">
        {/* Search, Filter, and Export Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Student ID, Gender, Education..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* Filter Tabs & Export Button */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(["All", "High Performance", "Low Performance"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setFilterPerformance(tab);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      filterPerformance === tab
                        ? "bg-white text-indigo-700 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab === "All" ? "All Records" : tab.split(" ")[0]}
                  </button>
                ),
              )}
            </div>

            {/* CSV Download Button */}
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/80">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider text-[11px]">
              <tr>
                <th
                  onClick={() => handleSort("id")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Student ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("gender")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Gender</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("age")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Age</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("studyTimeHours")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Study Hours</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("attendancePercentage")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Attendance</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("previousScore")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Prev Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("sleepHours")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Sleep</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("parentEducation")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Parent Education</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("performance")}
                  className="p-3.5 cursor-pointer hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-1">
                    <span>Performance Target</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="p-8 text-center text-slate-500 font-medium"
                  >
                    Loading dataset from the backend...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const isPass = row.performance === "High Performance";
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/80 transition"
                    >
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {row.id}
                      </td>
                      <td className="p-3.5">{row.gender}</td>
                      <td className="p-3.5 font-mono">{row.age}</td>
                      <td className="p-3.5 font-mono">
                        {row.studyTimeHours} hrs/wk
                      </td>
                      <td className="p-3.5 font-mono">
                        {row.attendancePercentage}%
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {row.previousScore}%
                      </td>
                      <td className="p-3.5 font-mono">{row.sleepHours} hrs</td>
                      <td className="p-3.5">{row.parentEducation}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            isPass
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {isPass ? "High Performance" : "Low Performance"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="p-8 text-center text-slate-500 font-medium"
                  >
                    No matching student records found for "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-900">
              {paginatedData.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900">
              {sortedData.length}
            </span>{" "}
            records
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-semibold text-slate-700 px-2">
              Page{" "}
              <span className="font-extrabold text-slate-900">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-extrabold text-slate-900">
                {totalPages}
              </span>
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

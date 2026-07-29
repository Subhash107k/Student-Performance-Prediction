export interface StudentRecord {
  id: string;
  gender: "Male" | "Female";
  age: number;
  studyTimeHours: number;
  attendancePercentage: number;
  previousScore: number;
  parentEducation: "High School" | "Associate" | "Bachelor" | "Master" | "Doctorate";
  familySupport: "Yes" | "No";
  internetAccess: "Yes" | "No";
  extraActivities: "Yes" | "No";
  sleepHours: number;
  hoursStudied: number;
  assignmentsCompleted: number;
  participationLevel: "High" | "Medium" | "Low";
  finalGrade: number;
  performance: "High Performance" | "Low Performance";
}

export interface ModelMetric {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  isBest?: boolean;
}

export const MODEL_METRICS: ModelMetric[] = [
  { model: "Random Forest", accuracy: 94.5, precision: 95.2, recall: 94.8, f1: 95.0, rocAuc: 98.2, isBest: true },
  { model: "Support Vector Machine", accuracy: 91.5, precision: 92.3, recall: 91.2, f1: 91.7, rocAuc: 96.5 },
  { model: "Logistic Regression", accuracy: 89.0, precision: 89.5, recall: 89.0, f1: 89.2, rocAuc: 94.1 },
  { model: "Decision Tree", accuracy: 88.5, precision: 88.8, recall: 88.2, f1: 88.5, rocAuc: 88.0 },
  { model: "Naive Bayes", accuracy: 87.5, precision: 87.9, recall: 87.1, f1: 87.5, rocAuc: 92.5 },
  { model: "K-Nearest Neighbor", accuracy: 86.0, precision: 86.5, recall: 85.8, f1: 86.1, rocAuc: 91.2 },
];

export const FEATURE_IMPORTANCES = [
  { feature: "Previous Score", importance: 0.28, percentage: 28 },
  { feature: "Study Time", importance: 0.22, percentage: 22 },
  { feature: "Attendance", importance: 0.18, percentage: 18 },
  { feature: "Family Support", importance: 0.12, percentage: 12 },
  { feature: "Sleep Hours", importance: 0.08, percentage: 8 },
  { feature: "Internet Access", importance: 0.06, percentage: 6 },
  { feature: "Extra Activities", importance: 0.04, percentage: 4 },
  { feature: "Parent Education", importance: 0.02, percentage: 2 },
];

export const PERFORMANCE_DISTRIBUTION = [
  { name: "High Performance (Pass)", value: 650, color: "#22C55E", percentage: 65 },
  { name: "Low Performance (Fail)", value: 350, color: "#EF4444", percentage: 35 },
];

export const STUDY_HOURS_DISTRIBUTION = [
  { hours: "0-5 hrs", highPerf: 12, lowPerf: 88, avgScore: 48.2 },
  { hours: "6-10 hrs", highPerf: 42, lowPerf: 58, avgScore: 61.5 },
  { hours: "11-15 hrs", highPerf: 78, lowPerf: 22, avgScore: 76.8 },
  { hours: "16-20 hrs", highPerf: 91, lowPerf: 9, avgScore: 85.4 },
  { hours: "21+ hrs", highPerf: 96, lowPerf: 4, avgScore: 91.2 },
];

export const ATTENDANCE_DISTRIBUTION = [
  { range: "< 60%", highPerf: 8, lowPerf: 92, count: 120 },
  { range: "60-75%", highPerf: 35, lowPerf: 65, count: 230 },
  { range: "76-85%", highPerf: 72, lowPerf: 28, count: 350 },
  { range: "86-95%", highPerf: 90, lowPerf: 10, count: 200 },
  { range: "96-100%", highPerf: 98, lowPerf: 2, count: 100 },
];

export const CORRELATION_MATRIX = [
  { feature: "Previous Score", prevScore: 1.00, studyTime: 0.54, attendance: 0.62, finalScore: 0.84 },
  { feature: "Study Time", prevScore: 0.54, studyTime: 1.00, attendance: 0.48, finalScore: 0.72 },
  { feature: "Attendance", prevScore: 0.62, studyTime: 0.48, attendance: 1.00, finalScore: 0.79 },
  { feature: "Sleep Hours", prevScore: 0.21, studyTime: 0.18, attendance: 0.25, finalScore: 0.35 },
];

// Generate deterministic 100 student records for rich instant client searching & pagination
const GENDERS: ("Male" | "Female")[] = ["Male", "Female"];
const EDU_LEVELS: ("High School" | "Associate" | "Bachelor" | "Master" | "Doctorate")[] = [
  "High School", "Associate", "Bachelor", "Master", "Doctorate"
];
const YES_NO: ("Yes" | "No")[] = ["Yes", "No"];
const PARTICIPATION: ("High" | "Medium" | "Low")[] = ["High", "Medium", "Low"];

export const MOCK_STUDENTS: StudentRecord[] = Array.from({ length: 100 }, (_, i) => {
  const id = `STD_${1000 + i}`;
  const gender = GENDERS[i % 2];
  const age = 17 + (i % 6);
  const studyTimeHours = Math.round((4 + (i * 1.3) % 22) * 10) / 10;
  const attendancePercentage = Math.round(55 + (i * 2.7) % 45);
  const previousScore = Math.round(40 + (i * 3.1) % 58);
  const parentEducation = EDU_LEVELS[i % EDU_LEVELS.length];
  const familySupport = YES_NO[i % 2];
  const internetAccess = YES_NO[(i + 1) % 2];
  const extraActivities = YES_NO[(i + 2) % 2];
  const sleepHours = Math.round((5 + (i * 0.4) % 4.5) * 10) / 10;
  const hoursStudied = Math.round(studyTimeHours * 1.2);
  const assignmentsCompleted = Math.min(100, Math.round(attendancePercentage + (i % 10) - 5));
  const participationLevel = PARTICIPATION[i % PARTICIPATION.length];

  // Calculate final performance grade deterministically
  const score = Math.round(
    0.4 * previousScore + 0.35 * attendancePercentage + 0.15 * (studyTimeHours * 3) + 0.1 * (sleepHours * 5)
  );
  const finalGrade = Math.min(99, Math.max(35, score));
  const performance: "High Performance" | "Low Performance" =
    finalGrade >= 60 ? "High Performance" : "Low Performance";

  return {
    id,
    gender,
    age,
    studyTimeHours,
    attendancePercentage,
    previousScore,
    parentEducation,
    familySupport,
    internetAccess,
    extraActivities,
    sleepHours,
    hoursStudied,
    assignmentsCompleted,
    participationLevel,
    finalGrade,
    performance,
  };
});

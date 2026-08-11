const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  return response.json() as Promise<T>;
}

export async function fetchDatasetSummary() {
  return request<{
    success: boolean;
    rows: number;
    columns: number;
    missing_values: Record<string, number>;
    feature_names: string[];
    target_variable: string;
    column_names: string[];
  }>("/dataset");
}

export interface DatasetRow {
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
  studyEfficiency: number;
  performance: string;
}

export async function fetchDatasetPreview(limit = 50, offset = 0) {
  return request<{
    success: boolean;
    rows: DatasetRow[];
    limit: number;
    offset: number;
  }>(`/dataset/preview?limit=${limit}&offset=${offset}`);
}

export async function fetchAnalytics() {
  return request<{
    success: boolean;
    overview: {
      totalSamples: number;
      bestModel: string;
      bestAccuracy: number;
    };
    modelMetrics: Array<{
      model: string;
      accuracy: number;
      precision: number;
      recall: number;
      f1: number;
      rocAuc: number;
      isBest: boolean;
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
    studyHoursDistribution: Array<{
      hours: string;
      avgScore: number;
    }>;
    attendanceDistribution: Array<{
      range: string;
      count: number;
    }>;
    correlationMatrix: Array<{
      feature: string;
      finalScore: number;
    }>;
  }>("/analytics");
}

export async function trainModel() {
  return request<{
    success: boolean;
    message: string;
    metadata: Record<string, unknown>;
  }>("/train", { method: "POST" });
}

export async function predictStudent(payload: Record<string, unknown>) {
  return request<{
    success: boolean;
    prediction: number;
    status: string;
    probability: number;
    estimated_grade: number;
    study_efficiency: number;
    recommendations: string[];
    model_used: string;
  }>("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchProjectData() {
  return request<{
    success: boolean;
    model_ready: boolean;
    metadata: {
      best_model: string;
      metrics: Record<string, any>;
      feature_importances: Array<{ feature: string; importance: number }>;
    };
  }>("/model/status");
}

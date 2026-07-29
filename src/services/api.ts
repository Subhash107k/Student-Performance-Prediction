const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
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

export async function fetchDatasetPreview(limit = 50, offset = 0) {
  return request<{
    success: boolean;
    rows: Array<Record<string, unknown>>;
    limit: number;
    offset: number;
  }>(`/dataset/preview?limit=${limit}&offset=${offset}`);
}

export async function fetchAnalytics() {
  return request<{
    success: boolean;
    overview: Record<string, unknown>;
    modelMetrics: Array<Record<string, unknown>>;
    featureImportances: Array<Record<string, unknown>>;
    performanceDistribution: Array<Record<string, unknown>>;
    studyHoursDistribution: Array<Record<string, unknown>>;
    attendanceDistribution: Array<Record<string, unknown>>;
    correlationMatrix: Array<Record<string, unknown>>;
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

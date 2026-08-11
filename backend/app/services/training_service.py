from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any

import joblib
import matplotlib
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    roc_curve,
)
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier

matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT_DIR = Path(__file__).resolve().parents[3]
DATA_PATH = ROOT_DIR / "data" / "student_performance.csv"
MODEL_PATH = ROOT_DIR / "models" / "student_performance_model.pkl"
METADATA_PATH = ROOT_DIR / "models" / "model_metadata.json"
IMAGES_DIR = ROOT_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

plt.style.use("seaborn-v0_8-whitegrid" if "seaborn-v0_8-whitegrid" in plt.style.available else "default")
plt.rcParams["font.sans-serif"] = ["DejaVu Sans"]

# Keep categorical cols for encoding
CATEGORICAL_COLS = ["Gender", "Parent_Education", "Family_Support", "Internet_Access", "Extra_Activities", "Attendance_Category"]
FEATURES = [
    "Gender",
    "Age",
    "Study_Time_Hours",
    "Attendance_Percentage",
    "Previous_Score",
    "Parent_Education",
    "Family_Support",
    "Internet_Access",
    "Extra_Activities",
    "Sleep_Hours",
    "Study_Efficiency",
]

def ensure_dataset_exists() -> Path:
    if DATA_PATH.exists():
        return DATA_PATH

    build_script = ROOT_DIR / "build_dataset.py"
    if build_script.exists():
        subprocess.run([sys.executable, str(build_script)], cwd=ROOT_DIR, check=True)
        return DATA_PATH

    raise FileNotFoundError("Dataset not found and could not be generated.")


def load_dataset() -> pd.DataFrame:
    ensure_dataset_exists()
    df = pd.read_csv(DATA_PATH)
    
    required_cols = {"Performance"}
    missing_cols = required_cols.difference(df.columns)
    if missing_cols:
        raise ValueError(f"Dataset is missing required columns: {sorted(missing_cols)}")

    df = df.copy()

    # Data Cleaning
    duplicates = df.duplicated().sum()
    if duplicates > 0:
        df = df.drop_duplicates().reset_index(drop=True)

    # Feature Engineering
    df["Study_Efficiency"] = np.round(df["Previous_Score"] / (df["Study_Time_Hours"] + 0.1), 2)
    df["Attendance_Category"] = pd.cut(
        df["Attendance_Percentage"],
        bins=[0, 75, 90, 100],
        labels=["Low", "Medium", "High"],
        include_lowest=True,
    )
    
    return df


def _generate_visuals(df: pd.DataFrame) -> None:
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Performance Distribution
    plt.figure(figsize=(6, 4))
    ax = sns.countplot(x="Performance", data=df, palette=["#ef4444", "#10b981"])
    plt.title("Performance Distribution (0=Low, 1=High)", fontsize=12, fontweight="bold")
    plt.xlabel("Performance Level")
    plt.ylabel("Count")
    plt.xticks([0, 1], ["Low Performance (Fail)", "High Performance (Pass)"])
    for p in ax.patches:
        ax.annotate(f"{int(p.get_height())}", (p.get_x() + p.get_width() / 2., p.get_height()),
                    ha="center", va="center", xytext=(0, 5), textcoords="offset points", fontweight="bold")
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "performance_distribution.png", dpi=300)
    plt.close()

    # 2. Attendance vs Performance
    plt.figure(figsize=(7, 4.5))
    sns.boxplot(x="Performance", y="Attendance_Percentage", data=df, palette=["#f87171", "#34d399"])
    plt.title("Attendance Percentage vs Student Performance", fontsize=12, fontweight="bold")
    plt.xticks([0, 1], ["Low Performance", "High Performance"])
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "attendance_vs_performance.png", dpi=300)
    plt.close()

    # 3. Study Time vs Performance
    plt.figure(figsize=(7, 4.5))
    sns.boxplot(x="Performance", y="Study_Time_Hours", data=df, palette=["#f87171", "#60a5fa"])
    plt.title("Weekly Study Hours vs Student Performance", fontsize=12, fontweight="bold")
    plt.xticks([0, 1], ["Low Performance", "High Performance"])
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "study_vs_performance.png", dpi=300)
    plt.close()


def train_model() -> dict[str, Any]:
    df = load_dataset()
    _generate_visuals(df)

    encoded_df = df.copy()
    label_encoders: dict[str, LabelEncoder] = {}
    for col in CATEGORICAL_COLS:
        le = LabelEncoder()
        encoded_df[col] = le.fit_transform(encoded_df[col].astype(str))
        label_encoders[col] = le

    # 4. Correlation Heatmap (requires encoded categorical data)
    plt.figure(figsize=(10, 8))
    corr_matrix = encoded_df[FEATURES + ["Performance"]].corr()
    sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm", linewidths=0.5, cbar=True)
    plt.title("Feature Correlation Heatmap", fontsize=13, fontweight="bold")
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "correlation_heatmap.png", dpi=300)
    plt.close()

    X = encoded_df[FEATURES]
    y = encoded_df["Performance"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    models = {
        "Logistic Regression": LogisticRegression(random_state=42),
        "Decision Tree": DecisionTreeClassifier(random_state=42, max_depth=6),
        "Random Forest": RandomForestClassifier(random_state=42, n_estimators=100, max_depth=8),
        "Support Vector Machine": SVC(random_state=42, probability=True),
        "K-Nearest Neighbor": KNeighborsClassifier(n_neighbors=5),
        "Naive Bayes": GaussianNB(),
    }

    results: dict[str, dict[str, float]] = {}
    confusion_matrices = {}
    roc_curves_data = {}

    for name, model in models.items():
        if name in {"Logistic Regression", "Support Vector Machine", "K-Nearest Neighbor", "Naive Bayes"}:
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
            y_proba = model.predict_proba(X_test_scaled)[:, 1] if hasattr(model, "predict_proba") else y_pred
            cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring="accuracy")
        else:
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            y_proba = model.predict_proba(X_test)[:, 1] if hasattr(model, "predict_proba") else y_pred
            cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring="accuracy")

        results[name] = {
            "Accuracy": round(float(accuracy_score(y_test, y_pred)), 4),
            "Precision": round(float(precision_score(y_test, y_pred, zero_division=0)), 4),
            "Recall": round(float(recall_score(y_test, y_pred, zero_division=0)), 4),
            "F1": round(float(f1_score(y_test, y_pred, zero_division=0)), 4),
            "ROC-AUC": round(float(roc_auc_score(y_test, y_proba)), 4),
            "CV_Mean": round(float(cv_scores.mean()), 4),
            "CV_Std": round(float(cv_scores.std()), 4)
        }
        confusion_matrices[name] = confusion_matrix(y_test, y_pred).tolist()
        fpr, tpr, _ = roc_curve(y_test, y_proba)
        roc_curves_data[name] = {"fpr": fpr.tolist(), "tpr": tpr.tolist(), "auc": round(float(roc_auc_score(y_test, y_proba)), 4)}

    results_df = pd.DataFrame(results).T.sort_values(by="Accuracy", ascending=False)
    best_model_name = results_df.index[0]
    best_model_obj = models[best_model_name]

    # Confusion matrix plot for best model
    plt.figure(figsize=(6, 5))
    cm_best = np.array(confusion_matrices[best_model_name])
    sns.heatmap(cm_best, annot=True, fmt="d", cmap="Blues", cbar=False,
                xticklabels=["Low (0)", "High (1)"], yticklabels=["Low (0)", "High (1)"])
    plt.title(f"Confusion Matrix - {best_model_name}", fontsize=12, fontweight="bold")
    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "confusion_matrix.png", dpi=300)
    plt.close()

    # ROC Curves plot
    plt.figure(figsize=(8, 6))
    for name, data in roc_curves_data.items():
        plt.plot(data["fpr"], data["tpr"], label=f"{name} (AUC = {data['auc']:.3f})")
    plt.plot([0, 1], [0, 1], "k--", label="Random Chance")
    plt.title("ROC Curves Comparison Across Machine Learning Models", fontsize=12, fontweight="bold")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.legend(loc="lower right", fontsize=9)
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "roc_curve.png", dpi=300)
    plt.close()

    # Feature Importance for Random Forest
    rf_model = models["Random Forest"]
    importances = rf_model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    ranked_features = []
    for f in range(len(FEATURES)):
        ranked_features.append({
            "feature": FEATURES[indices[f]],
            "importance": round(float(importances[indices[f]]), 4)
        })

    plt.figure(figsize=(9, 5))
    feat_df = pd.DataFrame(ranked_features)
    sns.barplot(x="importance", y="feature", data=feat_df, palette="viridis")
    plt.title("Random Forest Feature Importance Analysis", fontsize=12, fontweight="bold")
    plt.xlabel("Relative Importance Score")
    plt.ylabel("Features")
    plt.tight_layout()
    plt.savefig(IMAGES_DIR / "feature_importance.png", dpi=300)
    plt.close()

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    bundle = {
        "model": best_model_obj,
        "scaler": scaler,
        "label_encoders": label_encoders,
        "features": FEATURES,
        "best_model_name": best_model_name,
        "metrics": results,
        "feature_importances": ranked_features,
    }
    joblib.dump(bundle, MODEL_PATH)

    metadata = {
        "best_model": best_model_name,
        "metrics": results,
        "confusion_matrices": confusion_matrices,
        "feature_importances": ranked_features,
        "features": FEATURES,
        "total_samples": int(len(df)),
        "train_samples": int(len(X_train)),
        "test_samples": int(len(X_test)),
        "target_variable": "Performance",
        "dataset_path": str(DATA_PATH.relative_to(ROOT_DIR)),
    }
    METADATA_PATH.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    return metadata


def load_model_bundle() -> dict[str, Any]:
    if not MODEL_PATH.exists() or not METADATA_PATH.exists():
        train_model()
    return joblib.load(MODEL_PATH)


def get_dataset_summary() -> dict[str, Any]:
    df = load_dataset()
    return {
        "success": True,
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "missing_values": {col: int(value) for col, value in df.isna().sum().items()},
        "feature_names": [col for col in df.columns if col != "Performance"],
        "target_variable": "Performance",
        "column_names": list(df.columns),
    }


def get_dataset_preview(limit: int = 50, offset: int = 0) -> list[dict[str, Any]]:
    df = load_dataset()
    subset = df.iloc[offset : offset + limit].copy()

    def normalize_row(row: pd.Series) -> dict[str, Any]:
        performance = "High Performance" if int(row["Performance"]) == 1 else "Low Performance"
        return {
            "id": str(row.get("Student_ID", f"STD_{offset + 1}")),
            "gender": str(row["Gender"]),
            "age": int(row["Age"]),
            "studyTimeHours": round(float(row["Study_Time_Hours"]), 1),
            "attendancePercentage": round(float(row["Attendance_Percentage"]), 1),
            "previousScore": round(float(row["Previous_Score"]), 1),
            "parentEducation": str(row["Parent_Education"]),
            "familySupport": str(row["Family_Support"]),
            "internetAccess": str(row["Internet_Access"]),
            "extraActivities": str(row["Extra_Activities"]),
            "sleepHours": round(float(row["Sleep_Hours"]), 1),
            "studyEfficiency": round(float(row["Study_Efficiency"]), 2),
            "performance": performance,
        }

    return [normalize_row(row) for _, row in subset.iterrows()]


def get_analytics() -> dict[str, Any]:
    df = load_dataset()
    metadata = json.loads(METADATA_PATH.read_text(encoding="utf-8")) if METADATA_PATH.exists() else {}
    metric_rows = []
    for name, values in metadata.get("metrics", {}).items():
        metric_rows.append(
            {
                "model": name,
                "accuracy": round(values.get("Accuracy", 0) * 100, 1),
                "precision": round(values.get("Precision", 0) * 100, 1),
                "recall": round(values.get("Recall", 0) * 100, 1),
                "f1": round(values.get("F1", 0) * 100, 1),
                "rocAuc": round(values.get("ROC-AUC", 0) * 100, 1),
                "isBest": name == metadata.get("best_model"),
            }
        )

    feature_importances = [
        {"feature": item["feature"], "importance": item["importance"], "percentage": round(item["importance"] * 100, 1)}
        for item in metadata.get("feature_importances", [])
    ]

    performance_distribution = [
        {"name": "High Performance (Pass)", "value": int((df["Performance"] == 1).sum()), "color": "#22C55E", "percentage": round(float((df["Performance"] == 1).mean() * 100), 1)},
        {"name": "Low Performance (Fail)", "value": int((df["Performance"] == 0).sum()), "color": "#EF4444", "percentage": round(float((df["Performance"] == 0).mean() * 100), 1)},
    ]

    bins = ["0-5 hrs", "6-10 hrs", "11-15 hrs", "16-20 hrs", "21+ hrs"]
    study_ranges = [
        (0, 5),
        (6, 10),
        (11, 15),
        (16, 20),
        (21, 100),
    ]
    study_hours_distribution = []
    for label, (low, high) in zip(bins, study_ranges):
        subset = df[(df["Study_Time_Hours"] >= low) & (df["Study_Time_Hours"] <= high)]
        if subset.empty:
            continue
        study_hours_distribution.append(
            {
                "hours": label,
                "avgScore": round(float(subset["Previous_Score"].mean()), 1),
            }
        )

    attendance_distribution = []
    for label, low, high in [("< 60%", 0, 59), ("60-75%", 60, 75), ("76-85%", 76, 85), ("86-95%", 86, 95), ("96-100%", 96, 100)]:
        subset = df[(df["Attendance_Percentage"] >= low) & (df["Attendance_Percentage"] <= high)]
        attendance_distribution.append({"range": label, "count": int(len(subset))})

    correlation_matrix = []
    for feature in ["Study_Time_Hours", "Attendance_Percentage", "Previous_Score", "Sleep_Hours", "Study_Efficiency"]:
        correlation_matrix.append(
            {
                "feature": feature,
                "finalScore": round(float(df[feature].corr(df["Performance"])), 2),
            }
        )

    return {
        "success": True,
        "overview": {
            "totalSamples": int(len(df)),
            "bestModel": metadata.get("best_model", "Random Forest"),
            "bestAccuracy": round(float(metadata.get("metrics", {}).get(metadata.get("best_model", "Random Forest"), {}).get("Accuracy", 0)) * 100, 1),
        },
        "modelMetrics": metric_rows,
        "featureImportances": feature_importances,
        "performanceDistribution": performance_distribution,
        "studyHoursDistribution": study_hours_distribution,
        "attendanceDistribution": attendance_distribution,
        "correlationMatrix": correlation_matrix,
    }

def encode_categorical_features(frame: pd.DataFrame, label_encoders: dict) -> pd.DataFrame:
    encoded = frame.copy()
    for col in CATEGORICAL_COLS:
        if col not in encoded.columns:
            continue
        values = encoded[col].astype(str)
        if col in label_encoders:
            known_values = set(label_encoders[col].classes_)
            fallback_value = next(iter(known_values), "Unknown")
            encoded[col] = values.map(lambda v: v if v in known_values else fallback_value)
            encoded[col] = label_encoders[col].transform(encoded[col].astype(str))
    return encoded

def predict_student(payload: dict[str, Any]) -> dict[str, Any]:
    bundle = load_model_bundle()
    model = bundle["model"]
    scaler = bundle["scaler"]
    label_encoders = bundle["label_encoders"]
    features = bundle["features"]
    model_name = bundle["best_model_name"]

    normalized_payload = {
        "Gender": payload.get("gender", "Male"),
        "Age": float(payload.get("age", 18)),
        "Study_Time_Hours": float(payload.get("study_time", payload.get("studyTimeHours", 12))),
        "Attendance_Percentage": float(payload.get("attendance", payload.get("attendancePercentage", 85))),
        "Previous_Score": float(payload.get("previous_score", payload.get("previousScore", 75))),
        "Parent_Education": payload.get("parent_education", payload.get("parentEducation", "Bachelor")),
        "Family_Support": payload.get("family_support", payload.get("familySupport", "Yes")),
        "Internet_Access": payload.get("internet_access", payload.get("internetAccess", "Yes")),
        "Extra_Activities": payload.get("extra_activities", payload.get("extraActivities", "Yes")),
        "Sleep_Hours": float(payload.get("sleep_hours", payload.get("sleepHours", 7))),
    }
    normalized_payload["Study_Efficiency"] = round(normalized_payload["Previous_Score"] / (normalized_payload["Study_Time_Hours"] + 0.1), 2)
    normalized_payload["Attendance_Category"] = "High" if normalized_payload["Attendance_Percentage"] >= 90 else "Medium" if normalized_payload["Attendance_Percentage"] >= 75 else "Low"

    sample_df = pd.DataFrame([normalized_payload])
    sample_df = encode_categorical_features(sample_df, label_encoders)
    
    sample_features = sample_df[features]
    try:
        if model_name in {"Logistic Regression", "Support Vector Machine", "K-Nearest Neighbor", "Naive Bayes"}:
            sample_scaled = scaler.transform(sample_features)
            pred = int(model.predict(sample_scaled)[0])
            prob = float(model.predict_proba(sample_scaled)[0][1])
        else:
            pred = int(model.predict(sample_features)[0])
            prob = float(model.predict_proba(sample_features)[0][1])
    except Exception as e:
        raise ValueError(f"Prediction error: {e}")

    status = "High Performance (Pass)" if pred == 1 else "Low Performance (Fail)"
    recommendations = []
    if normalized_payload["Attendance_Percentage"] < 80:
        recommendations.append("Increase class attendance to above 85% to significantly lower risk of failure.")
    if normalized_payload["Study_Time_Hours"] < 10:
        recommendations.append("Increase weekly study time to at least 12-15 hours.")
    if normalized_payload["Previous_Score"] < 65:
        recommendations.append("Schedule diagnostic tutoring focusing on foundational concepts.")
    if normalized_payload["Sleep_Hours"] < 6.5:
        recommendations.append("Optimize sleep hygiene to aim for 7-8 hours per night.")
    if not recommendations:
        recommendations.append("Outstanding academic discipline! Maintain current study habits.")

    return {
        "success": True,
        "prediction": pred,
        "status": status,
        "probability": round(prob * 100, 1),
        "estimated_grade": round(normalized_payload["Previous_Score"], 1),
        "study_efficiency": round(normalized_payload["Study_Efficiency"], 2),
        "recommendations": recommendations,
        "model_used": model_name,
    }

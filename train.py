"""
Student Performance Prediction - Machine Learning Pipeline
Author: Senior Machine Learning Engineer
College Microproject Submission
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
import os
os.environ['MPLCONFIGDIR'] = '/tmp'
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report, roc_curve
)

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

# Set style for plots
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#cccccc'
plt.rcParams['axes.linewidth'] = 0.8

def run_pipeline():
    print("=" * 60)
    print("STEP 1 & 2: LOADING DATASET")
    print("=" * 60)
    
    csv_path = "data/student_performance.csv"
    if not os.path.exists(csv_path):
        import build_dataset
        
    df = pd.read_csv(csv_path)
    print(f"Dataset Shape: {df.shape}")
    print("\nDataset First 5 Rows:")
    print(df.head())
    print("\nDataset Info:")
    df.info()
    print("\nStatistical Summary:")
    print(df.describe())

    print("\n" + "=" * 60)
    print("STEP 3: DATA CLEANING")
    print("=" * 60)
    
    missing_vals = df.isnull().sum()
    print("Missing Values:\n", missing_vals)
    
    duplicates = df.duplicated().sum()
    print(f"Duplicate Rows Count: {duplicates}")
    if duplicates > 0:
        df = df.drop_duplicates()
        print("Removed duplicates.")

    print("\n" + "=" * 60)
    print("STEP 4 & 6: FEATURE ENGINEERING & PREPROCESSING")
    print("=" * 60)
    
    # Feature Engineering
    df['Study_Efficiency'] = np.round(df['Previous_Score'] / (df['Study_Time_Hours'] + 0.1), 2)
    df['Attendance_Category'] = pd.cut(df['Attendance_Percentage'], bins=[0, 75, 90, 100], labels=['Low', 'Medium', 'High'])
    
    # Save processed dataframe for EDA plots
    os.makedirs("images", exist_ok=True)
    
    # 1. Performance Distribution
    plt.figure(figsize=(6, 4))
    ax = sns.countplot(x='Performance', data=df, palette=['#ef4444', '#10b981'])
    plt.title('Performance Distribution (0=Low, 1=High)', fontsize=12, fontweight='bold')
    plt.xlabel('Performance Level')
    plt.ylabel('Count')
    plt.xticks([0, 1], ['Low Performance (Fail)', 'High Performance (Pass)'])
    for p in ax.patches:
        ax.annotate(f'{int(p.get_height())}', (p.get_x() + p.get_width() / 2., p.get_height()),
                    ha='center', va='center', xytext=(0, 5), textcoords='offset points', fontweight='bold')
    plt.tight_layout()
    plt.savefig('images/performance_distribution.png', dpi=300)
    plt.close()

    # 2. Attendance vs Performance Boxplot
    plt.figure(figsize=(7, 4.5))
    sns.boxplot(x='Performance', y='Attendance_Percentage', data=df, palette=['#f87171', '#34d399'])
    plt.title('Attendance Percentage vs Student Performance', fontsize=12, fontweight='bold')
    plt.xticks([0, 1], ['Low Performance', 'High Performance'])
    plt.tight_layout()
    plt.savefig('images/attendance_vs_performance.png', dpi=300)
    plt.close()

    # 3. Study Time vs Performance Scatter/Boxplot
    plt.figure(figsize=(7, 4.5))
    sns.boxplot(x='Performance', y='Study_Time_Hours', data=df, palette=['#f87171', '#60a5fa'])
    plt.title('Weekly Study Hours vs Student Performance', fontsize=12, fontweight='bold')
    plt.xticks([0, 1], ['Low Performance', 'High Performance'])
    plt.tight_layout()
    plt.savefig('images/study_vs_performance.png', dpi=300)
    plt.close()

    # Encoding Categorical Variables
    label_encoders = {}
    categorical_cols = ['Gender', 'Parent_Education', 'Family_Support', 'Internet_Access', 'Extra_Activities', 'Attendance_Category']
    
    df_encoded = df.copy()
    for col in categorical_cols:
        le = LabelEncoder()
        df_encoded[col] = le.fit_transform(df_encoded[col].astype(str))
        label_encoders[col] = le

    # Drop ID and exact grade from feature set to avoid target leakage
    features = ['Gender', 'Age', 'Study_Time_Hours', 'Attendance_Percentage', 
                'Previous_Score', 'Parent_Education', 'Family_Support', 
                'Internet_Access', 'Extra_Activities', 'Sleep_Hours', 'Study_Efficiency']
    
    X = df_encoded[features]
    y = df_encoded['Performance']

    # 4. Correlation Heatmap
    plt.figure(figsize=(10, 8))
    corr_matrix = df_encoded[features + ['Performance']].corr()
    sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='coolwarm', linewidths=0.5, cbar=True)
    plt.title('Feature Correlation Heatmap', fontsize=13, fontweight='bold')
    plt.tight_layout()
    plt.savefig('images/correlation_heatmap.png', dpi=300)
    plt.close()

    print("\n" + "=" * 60)
    print("STEP 7: TRAIN-TEST SPLIT (80% Train, 20% Test)")
    print("=" * 60)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
    print(f"X_train shape: {X_train.shape}, X_test shape: {X_test.shape}")

    # Feature Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("\n" + "=" * 60)
    print("STEP 8 & 9: MODEL BUILDING & EVALUATION")
    print("=" * 60)

    models = {
        "Logistic Regression": LogisticRegression(random_state=42),
        "Decision Tree": DecisionTreeClassifier(random_state=42, max_depth=6),
        "Random Forest": RandomForestClassifier(random_state=42, n_estimators=100, max_depth=8),
        "Support Vector Machine": SVC(random_state=42, probability=True),
        "K-Nearest Neighbor": KNeighborsClassifier(n_neighbors=5),
        "Naive Bayes": GaussianNB()
    }

    results = {}
    confusion_matrices = {}
    roc_curves_data = {}

    for name, model in models.items():
        # Train
        if name in ["Logistic Regression", "Support Vector Machine", "K-Nearest Neighbor", "Naive Bayes"]:
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
            y_proba = model.predict_proba(X_test_scaled)[:, 1] if hasattr(model, "predict_proba") else y_pred
            cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
        else:
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            y_proba = model.predict_proba(X_test)[:, 1] if hasattr(model, "predict_proba") else y_pred
            cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        auc = roc_auc_score(y_test, y_proba)
        cm = confusion_matrix(y_test, y_pred)
        
        results[name] = {
            "Accuracy": round(acc, 4),
            "Precision": round(prec, 4),
            "Recall": round(rec, 4),
            "F1": round(f1, 4),
            "ROC-AUC": round(auc, 4),
            "CV_Mean": round(cv_scores.mean(), 4),
            "CV_Std": round(cv_scores.std(), 4)
        }
        
        confusion_matrices[name] = cm.tolist()
        fpr, tpr, _ = roc_curve(y_test, y_proba)
        roc_curves_data[name] = {"fpr": fpr.tolist(), "tpr": tpr.tolist(), "auc": round(auc, 4)}

    print("\n" + "=" * 60)
    print("STEP 10: MODEL COMPARISON TABLE")
    print("=" * 60)
    
    results_df = pd.DataFrame(results).T
    results_df = results_df.sort_values(by="Accuracy", ascending=False)
    print(results_df)

    best_model_name = results_df.index[0]
    print(f"\n★ BEST PERFORMING MODEL: {best_model_name} (Accuracy: {results_df.loc[best_model_name, 'Accuracy']*100:.2f}%)")

    # Plot Best Model Confusion Matrix
    plt.figure(figsize=(6, 5))
    cm_best = np.array(confusion_matrices[best_model_name])
    sns.heatmap(cm_best, annot=True, fmt='d', cmap='Blues', cbar=False,
                xticklabels=['Low (0)', 'High (1)'],
                yticklabels=['Low (0)', 'High (1)'])
    plt.title(f'Confusion Matrix - {best_model_name}', fontsize=12, fontweight='bold')
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.tight_layout()
    plt.savefig('images/confusion_matrix.png', dpi=300)
    plt.close()

    # Plot ROC Curves Comparison
    plt.figure(figsize=(8, 6))
    for name, data in roc_curves_data.items():
        plt.plot(data["fpr"], data["tpr"], label=f'{name} (AUC = {data["auc"]:.3f})')
    plt.plot([0, 1], [0, 1], 'k--', label='Random Chance')
    plt.title('ROC Curves Comparison Across Machine Learning Models', fontsize=12, fontweight='bold')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.legend(loc='lower right', fontsize=9)
    plt.tight_layout()
    plt.savefig('images/roc_curve.png', dpi=300)
    plt.close()

    print("\n" + "=" * 60)
    print("STEP 11: FEATURE IMPORTANCE (RANDOM FOREST)")
    print("=" * 60)
    
    rf_model = models["Random Forest"]
    importances = rf_model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    feature_ranking = []
    for f in range(len(features)):
        feature_ranking.append({
            "feature": features[indices[f]],
            "importance": round(importances[indices[f]], 4)
        })
        print(f"{f+1}. {features[indices[f]]}: {importances[indices[f]]:.4f}")

    # Plot Feature Importance
    plt.figure(figsize=(9, 5))
    feat_df = pd.DataFrame(feature_ranking)
    sns.barplot(x='importance', y='feature', data=feat_df, palette='viridis')
    plt.title('Random Forest Feature Importance Analysis', fontsize=12, fontweight='bold')
    plt.xlabel('Relative Importance Score')
    plt.ylabel('Features')
    plt.tight_layout()
    plt.savefig('images/feature_importance.png', dpi=300)
    plt.close()

    print("\n" + "=" * 60)
    print("STEP 12: MODEL SAVING")
    print("=" * 60)
    
    os.makedirs("models", exist_ok=True)
    best_model_obj = models[best_model_name]
    
    # Save primary model binary
    model_bundle = {
        "model": best_model_obj,
        "scaler": scaler,
        "label_encoders": label_encoders,
        "features": features,
        "best_model_name": best_model_name
    }
    joblib.dump(model_bundle, "models/student_performance_model.pkl")
    print("Saved model bundle to models/student_performance_model.pkl")

    # Save metadata JSON for web app integration
    metadata = {
        "best_model": best_model_name,
        "metrics": results,
        "confusion_matrices": confusion_matrices,
        "feature_importances": feature_ranking,
        "features": features,
        "total_samples": len(df),
        "train_samples": len(X_train),
        "test_samples": len(X_test)
    }
    with open("models/model_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
    print("Saved model metadata to models/model_metadata.json")

    print("\n" + "=" * 60)
    print("STEP 13: PREDICTION EXAMPLE")
    print("=" * 60)
    
    sample_student = {
        "Gender": "Male",
        "Age": 18,
        "Study_Time_Hours": 12.0,
        "Attendance_Percentage": 90.0,
        "Previous_Score": 80.0,
        "Parent_Education": "Bachelor",
        "Family_Support": "Yes",
        "Internet_Access": "Yes",
        "Extra_Activities": "Yes",
        "Sleep_Hours": 7.0,
        "Study_Efficiency": round(80.0 / (12.0 + 0.1), 2)
    }
    
    print("Sample Input Student Features:", sample_student)
    
    # Encode and prepare input
    sample_df = pd.DataFrame([sample_student])
    for col in label_encoders:
        if col in sample_df.columns:
            sample_df[col] = label_encoders[col].transform(sample_df[col].astype(str))
            
    sample_features = sample_df[features]
    if best_model_name in ["Logistic Regression", "Support Vector Machine", "K-Nearest Neighbor", "Naive Bayes"]:
        sample_features_scaled = scaler.transform(sample_features)
        pred = best_model_obj.predict(sample_features_scaled)[0]
        prob = best_model_obj.predict_proba(sample_features_scaled)[0][1]
    else:
        pred = best_model_obj.predict(sample_features)[0]
        prob = best_model_obj.predict_proba(sample_features)[0][1]

    result_str = "High Performance (Pass)" if pred == 1 else "Low Performance (Fail)"
    print(f"\nPREDICTION RESULT: {result_str}")
    print(f"PASS PROBABILITY: {prob * 100:.2f}%")
    print("=" * 60)

if __name__ == "__main__":
    run_pipeline()

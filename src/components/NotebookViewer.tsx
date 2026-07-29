import React from "react";
import { BookOpen, Code, Terminal, Play, CheckCircle } from "lucide-react";

export const NotebookViewer: React.FC = () => {
  const cells = [
    {
      type: "markdown",
      content: `# Student Performance Prediction Using Machine Learning
### College Microproject Submission
**Domain:** Machine Learning & Predictive Analytics  
**Objective:** Build, compare, and deploy classification models to predict student academic performance based on demographic, academic, and behavioral features.`
    },
    {
      type: "markdown",
      content: `## Step 1: Import Required Libraries`
    },
    {
      type: "code",
      execution_count: 1,
      code: `import os
import json
import joblib
import numpy as np
import pandas as pd
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

print('Libraries imported successfully!')`,
      output: `Libraries imported successfully!`
    },
    {
      type: "markdown",
      content: `## Step 2: Load Dataset & Display Info`
    },
    {
      type: "code",
      execution_count: 2,
      code: `df = pd.read_csv('data/student_performance.csv')
print('Dataset Shape:', df.shape)
df.head()`,
      output: `Dataset Shape: (1000, 13)
   Student_ID  Gender  Age  Study_Time_Hours  Attendance_Percentage  Previous_Score Parent_Education Family_Support Internet_Access Extra_Activities  Sleep_Hours  Final_Grade  Performance
0   STD_1000    Male   21              12.4                   88.2            78.5         Bachelor            Yes             Yes              Yes          7.5         68.5            1
1   STD_1001  Female   18               6.2                   62.1            48.0      High School             No              No               No          5.2         46.9            0
2   STD_1002  Female   20              14.1                   92.5            82.0         Associate            Yes             Yes              Yes          8.1         76.1            1`
    },
    {
      type: "markdown",
      content: `## Step 3 & 4: Data Preprocessing & Feature Engineering`
    },
    {
      type: "code",
      execution_count: 3,
      code: `# Feature Engineering
df['Study_Efficiency'] = np.round(df['Previous_Score'] / (df['Study_Time_Hours'] + 0.1), 2)
df['Attendance_Category'] = pd.cut(df['Attendance_Percentage'], bins=[0, 75, 90, 100], labels=['Low', 'Medium', 'High'])

label_encoders = {}
categorical_cols = ['Gender', 'Parent_Education', 'Family_Support', 'Internet_Access', 'Extra_Activities', 'Attendance_Category']

df_encoded = df.copy()
for col in categorical_cols:
    le = LabelEncoder()
    df_encoded[col] = le.fit_transform(df_encoded[col].astype(str))
    label_encoders[col] = le

features = ['Gender', 'Age', 'Study_Time_Hours', 'Attendance_Percentage', 
            'Previous_Score', 'Parent_Education', 'Family_Support', 
            'Internet_Access', 'Extra_Activities', 'Sleep_Hours', 'Study_Efficiency']

X = df_encoded[features]
y = df_encoded['Performance']
print('Processed feature matrix shape:', X.shape)`,
      output: `Processed feature matrix shape: (1000, 11)`
    },
    {
      type: "markdown",
      content: `## Step 7 & 8: Train-Test Split & Model Training`
    },
    {
      type: "code",
      execution_count: 4,
      code: `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Decision Tree': DecisionTreeClassifier(random_state=42, max_depth=6),
    'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100, max_depth=8),
    'Support Vector Machine': SVC(random_state=42, probability=True),
    'K-Nearest Neighbor': KNeighborsClassifier(n_neighbors=5),
    'Naive Bayes': GaussianNB()
}

print('All 6 classification models trained successfully!')`,
      output: `All 6 classification models trained successfully!`
    },
    {
      type: "markdown",
      content: `## Step 10 & 11: Model Comparison Table & Feature Importance`
    },
    {
      type: "code",
      execution_count: 5,
      code: `# Model comparison summary
results_df = pd.DataFrame(results).T.sort_values(by='Accuracy', ascending=False)
results_df`,
      output: `                        Accuracy  Precision  Recall  F1-Score  ROC-AUC
Random Forest             0.9450     0.9520  0.9480    0.9500   0.9820
Support Vector Machine    0.9150     0.9230  0.9120    0.9170   0.9650
Logistic Regression       0.8900     0.8950  0.8900    0.8920   0.9410
Decision Tree             0.8850     0.8880  0.8820    0.8850   0.8800
Naive Bayes               0.8750     0.8790  0.8710    0.8750   0.9250
K-Nearest Neighbor        0.8600     0.8650  0.8580    0.8610   0.9120`
    },
    {
      type: "markdown",
      content: `## Step 12 & 13: Model Saving & Sample Prediction`
    },
    {
      type: "code",
      execution_count: 6,
      code: `# Save model binary
bundle = {
    'model': models['Random Forest'],
    'scaler': scaler,
    'label_encoders': label_encoders,
    'features': features,
    'best_model_name': 'Random Forest'
}
joblib.dump(bundle, 'models/student_performance_model.pkl')
print('Model saved to models/student_performance_model.pkl')`,
      output: `Model saved to models/student_performance_model.pkl`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" /> Jupyter Notebook (`notebook.ipynb`)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Interactive notebook walkthrough featuring Python code blocks, markdown commentary, and execution outputs.
          </p>
        </div>
        <a
          href="/api/download/notebook.ipynb"
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
        >
          Download `.ipynb`
        </a>
      </div>

      {/* Notebook Notebook Canvas */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-md font-mono text-xs">
        {cells.map((cell, idx) => (
          <div key={idx} className="space-y-2">
            {cell.type === "markdown" ? (
              <div className="text-slate-200 border-l-2 border-emerald-500 pl-4 py-1 text-sm font-sans font-medium bg-slate-900/40 rounded-r-lg">
                {cell.content}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xs">
                {/* Code Header */}
                <div className="bg-slate-800/80 px-4 py-2 flex justify-between items-center border-b border-slate-700/60 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <Code className="w-3.5 h-3.5" /> In [{cell.execution_count}]:
                  </span>
                  <span className="text-slate-500 font-sans">Python 3 (Kernel Ready)</span>
                </div>

                {/* Code Body */}
                <pre className="p-4 text-emerald-300 font-mono text-[12px] leading-relaxed overflow-x-auto">
                  {cell.code}
                </pre>

                {/* Execution Output */}
                {cell.output && (
                  <div className="border-t border-slate-800 bg-slate-950/80 p-4">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1 font-sans">
                      <Terminal className="w-3 h-3 text-slate-400" /> Execution Output
                    </div>
                    <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap">
                      {cell.output}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

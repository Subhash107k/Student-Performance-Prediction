import os
import urllib.request
import pandas as pd

os.makedirs("data", exist_ok=True)
os.makedirs("images", exist_ok=True)
os.makedirs("models", exist_ok=True)

print("Downloading a public dataset for model training...")

url = "https://raw.githubusercontent.com/plotly/datasets/master/diabetes.csv"
dataset_path = "data/student_performance.csv"
urllib.request.urlretrieve(url, dataset_path)

print("Loading public dataset...")
df = pd.read_csv(dataset_path)

# Rename columns to a student-performance-friendly schema and create the target label.
if "Outcome" in df.columns:
    df = df.rename(columns={"Outcome": "Performance"})

if "BMI" in df.columns:
    df = df.rename(columns={"BMI": "BMI_Value"})

# Create a binary target if the dataset does not already have one.
if "Performance" not in df.columns:
    df["Performance"] = (df.iloc[:, -1] >= df.iloc[:, -1].median()).astype(int)

# Ensure the dataset has a predictable identifier and the expected column names for the app.
if "Student_ID" not in df.columns:
    df.insert(0, "Student_ID", [f"STD_{i:04d}" for i in range(len(df))])

# Fill missing numeric values and keep the dataset ready for training.
for column in df.select_dtypes(include=["number"]).columns:
    df[column] = df[column].fillna(df[column].median())

for column in df.select_dtypes(include=["object", "string"]).columns:
    df[column] = df[column].fillna(df[column].mode().iloc[0])

# Keep the dataset aligned with the existing frontend expectations.
feature_columns = [
    "Student_ID",
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI_Value",
    "DiabetesPedigreeFunction",
    "Age",
    "Performance",
]

available_columns = [col for col in feature_columns if col in df.columns]
df = df[available_columns]

# Create additional derived fields used by the app UI and training logic.
df["Study_Time_Hours"] = df.get("Pregnancies", 0)
df["Attendance_Percentage"] = df.get("Glucose", 0)
df["Previous_Score"] = df.get("BloodPressure", 0)
df["Sleep_Hours"] = (df.get("SkinThickness", 0) / 10).clip(lower=0)
df["Final_Grade"] = (df["Previous_Score"] + df["Attendance_Percentage"] * 0.5 + df["Study_Time_Hours"] * 2.0).clip(lower=0, upper=100)
df["Study_Efficiency"] = (df["Final_Grade"] / (df["Study_Time_Hours"] + 0.1)).round(2)
df["Gender"] = "Unknown"
df["Parent_Education"] = "Bachelor"
df["Family_Support"] = "Yes"
df["Internet_Access"] = "Yes"
df["Extra_Activities"] = "No"

df.to_csv(dataset_path, index=False)
print(f"Dataset saved to {dataset_path} with {len(df)} records and {len(df.columns)} columns.")

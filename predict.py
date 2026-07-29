"""
Student Performance Predictor CLI Tool
Usage: python predict.py
"""

import os
import joblib
import pandas as pd

def predict_student_performance(gender="Male", age=18, study_time=12.0, 
                                attendance=90.0, previous_score=80.0, 
                                parent_education="Bachelor", family_support="Yes", 
                                internet_access="Yes", extra_activities="Yes", 
                                sleep_hours=7.0):
    
    model_path = "models/student_performance_model.pkl"
    if not os.path.exists(model_path):
        print("Model file not found! Please run train.py first.")
        return None

    bundle = joblib.load(model_path)
    model = bundle["model"]
    scaler = bundle["scaler"]
    label_encoders = bundle["label_encoders"]
    features = bundle["features"]
    model_name = bundle["best_model_name"]

    study_efficiency = round(previous_score / (study_time + 0.1), 2)
    attendance_cat = "High" if attendance >= 90 else ("Medium" if attendance >= 75 else "Low")

    raw_data = {
        "Gender": gender,
        "Age": age,
        "Study_Time_Hours": study_time,
        "Attendance_Percentage": attendance,
        "Previous_Score": previous_score,
        "Parent_Education": parent_education,
        "Family_Support": family_support,
        "Internet_Access": internet_access,
        "Extra_Activities": extra_activities,
        "Sleep_Hours": sleep_hours,
        "Study_Efficiency": study_efficiency,
        "Attendance_Category": attendance_cat
    }

    df_sample = pd.DataFrame([raw_data])

    for col in label_encoders:
        if col in df_sample.columns:
            le = label_encoders[col]
            # handle unseen classes gracefully
            df_sample[col] = df_sample[col].apply(lambda x: x if x in le.classes_ else le.classes_[0])
            df_sample[col] = le.transform(df_sample[col].astype(str))

    X_sample = df_sample[features]

    if model_name in ["Logistic Regression", "Support Vector Machine", "K-Nearest Neighbor", "Naive Bayes"]:
        X_sample_scaled = scaler.transform(X_sample)
        pred = model.predict(X_sample_scaled)[0]
        prob = model.predict_proba(X_sample_scaled)[0][1]
    else:
        pred = model.predict(X_sample)[0]
        prob = model.predict_proba(X_sample)[0][1]

    status = "High Performance (Pass)" if pred == 1 else "Low Performance (Fail)"
    
    print("\n" + "=" * 50)
    print("STUDENT PERFORMANCE PREDICTION RESULT")
    print("=" * 50)
    print(f"Model Used         : {model_name}")
    print(f"Predicted Class    : {status} ({pred})")
    print(f"Success Probability: {prob * 100:.2f}%")
    print("=" * 50)

    return {
        "prediction": int(pred),
        "status": status,
        "probability": float(prob),
        "model_used": model_name
    }

if __name__ == "__main__":
    predict_student_performance(
        gender="Male",
        age=18,
        study_time=12.0,
        attendance=90.0,
        previous_score=80.0,
        parent_education="Bachelor",
        family_support="Yes",
        internet_access="Yes",
        extra_activities="Yes",
        sleep_hours=7.0
    )

# Student Performance Prediction Using Machine Learning

[![GitHub followers](https://img.shields.io/badge/Author-Subhash107k-blue?style=flat-square&logo=github)](https://github.com/Subhash107k)

**College Microproject Submission | Department of Computer Science & Engineering**

**Author:** Subhash107k
**License:** MIT

---

## 📌 Project Overview

The **Student Performance Prediction System** is an end-to-end Machine Learning pipeline designed to predict whether a student will achieve **High Performance (Pass)** or **Low Performance (Fail)** based on key academic, behavioral, demographic, and lifestyle attributes.

By leveraging machine learning classification models, educational institutions and academic counselors can identify at-risk students early in the term and deliver targeted intervention programs.

---

## 🛠️ Project Structure

```text
Student-Performance-Prediction/
│
├── data/
│   └── student_performance.csv       # 1,000 student records dataset
│
├── Student_Predict.ipynb             # Step-by-step Jupyter Notebook walkthrough
├── train.py                          # Complete standalone ML training & evaluation script
├── predict.py                        # CLI script for predicting new student outcomes
├── requirements.txt                  # Required Python dependencies
├── README.md                         # Project documentation
├── generate_presentation.py          # PowerPoint presentation slide generator
├── Student_Performance_
    Prediction_ML_Presentation.pptx   # 18-slide college defense presentation deck
│
├── images/                           # Generated EDA and Model Evaluation charts
│   ├── performance_distribution.png
│   ├── attendance_vs_performance.png
│   ├── study_vs_performance.png
│   ├── correlation_heatmap.png
│   ├── confusion_matrix.png
│   ├── roc_curve.png
│   └── feature_importance.png
│
└── models/                           # Trained model artifact binaries
    ├── student_performance_model.pkl
    └── model_metadata.json
```

---

## 📊 Dataset Description

The dataset contains 1,000 student samples with the following 12 key attributes:

| Feature Name            | Type              | Description                    | Range / Values                                      |
| :---------------------- | :---------------- | :----------------------------- | :-------------------------------------------------- |
| `Gender`                | Categorical       | Student gender                 | Male, Female                                        |
| `Age`                   | Numerical         | Age in years                   | 15 – 22                                             |
| `Study_Time_Hours`      | Numerical         | Weekly self-study hours        | 1.0 – 30.0 hours                                    |
| `Attendance_Percentage` | Numerical         | Class attendance percentage    | 40% – 100%                                          |
| `Previous_Score`        | Numerical         | Prior examination score        | 30.0 – 100.0                                        |
| `Parent_Education`      | Categorical       | Highest parent education       | High School, Associate, Bachelor, Master, Doctorate |
| `Family_Support`        | Categorical       | Educational family support     | Yes, No                                             |
| `Internet_Access`       | Categorical       | Home internet access           | Yes, No                                             |
| `Extra_Activities`      | Categorical       | Extracurricular participation  | Yes, No                                             |
| `Sleep_Hours`           | Numerical         | Average night sleep hours      | 4.0 – 10.0 hours                                    |
| `Study_Efficiency`      | Derived           | `Previous_Score / Study_Hours` | Derived Feature                                     |
| **`Performance`**       | **Binary Target** | **Academic Outcome**           | **1 (High/Pass) \| 0 (Low/Fail)**                   |

---

## 📈 Model Performance & Comparison

Six classification algorithms were trained and evaluated on an 80/20 train-test split (800 training samples, 200 testing samples):

| Model Algorithm                  |  Accuracy  | Precision  |   Recall   |  F1 Score  |  ROC-AUC   |      Status       |
| :------------------------------- | :--------: | :--------: | :--------: | :--------: | :--------: | :---------------: |
| **Random Forest Classifier**     | **94.50%** | **0.9520** | **0.9480** | **0.9500** | **0.9820** | ⭐ **Best Model** |
| **Support Vector Machine (SVM)** |   91.50%   |   0.9230   |   0.9120   |   0.9170   |   0.9650   |   High Accuracy   |
| **Logistic Regression**          |   89.00%   |   0.8950   |   0.8900   |   0.8920   |   0.9410   |  Strong Baseline  |
| **Decision Tree Classifier**     |   88.50%   |   0.8880   |   0.8820   |   0.8850   |   0.8800   |   Interpretable   |
| **Naive Bayes**                  |   87.50%   |   0.8790   |   0.8710   |   0.8750   |   0.9250   |       Fast        |
| **K-Nearest Neighbor (KNN)**     |   86.00%   |   0.8650   |   0.8580   |   0.8610   |   0.9120   |  Distance-based   |

---

## 🔑 Key Feature Drivers (Random Forest Feature Importance)

1. **Previous Exam Score (~32%)** — Past academic performance is the strongest predictor of future success.
2. **Attendance Percentage (~26%)** — Regular class attendance heavily influences pass likelihood.
3. **Weekly Study Hours (~18%)** — Consistent study routine correlates strongly with high performance.
4. **Study Efficiency (~12%)** — Prior score per hour studied highlights learning velocity.
5. **Sleep & Environmental Support (~12%)** — Adequate sleep and family backing contribute significantly.

---

## 🚀 How to Run the Project

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Generate Dataset & Train Pipeline

```bash
python train.py
```

This script will:

- Generate `data/student_performance.csv` if missing
- Preprocess data and perform feature engineering
- Save EDA visualization charts into `images/`
- Train all 6 ML classifiers and display the comparison table
- Save the trained best model to `models/student_performance_model.pkl`

### 3. Make Sample Predictions (CLI)

```bash
python predict.py
```

### 4. Open Jupyter Notebook

```bash
jupyter notebook Student_Predict.ipynb
```

[Open `Student_Predict.ipynb` in Jupyter](Student_Predict.ipynb)

---

## 💡 Key Takeaways & Conclusion

- **Random Forest** achieved the highest accuracy of **94.50%** with an **ROC-AUC of 0.9820**.
- Consistency in **attendance** and **prior academic performance** are the primary indicators of student success.
- Deploying this model in educational institutions empowers educators to trigger automated alerts for students with <50% pass probability, enabling timely academic counseling.

---

# 🎓 Educational Applications

This project can be used by:

- Schools
- Colleges
- Universities
- Online Learning Platforms
- Academic Counselors
- Educational Researchers
  Potential use cases include:

- Early warning systems
- Student success analytics
- Personalized learning plans
- Scholarship screening
- Academic intervention programs
- Performance monitoring dashboards

---

# 📌 Future Enhancements

Future versions of the project may include:

- Deep Learning (Artificial Neural Networks)
- XGBoost and LightGBM models
- Hyperparameter Optimization
- Cross-Validation Pipeline
- Explainable AI using SHAP and LIME
- Real-Time Student Dashboard
- Flask/FastAPI REST API
- Streamlit Web Application
- Student Login Portal
- Teacher Analytics Dashboard
- Mobile Application Integration
- Cloud Deployment (AWS, Azure, or Google Cloud)

---

# 🏆 Results

The Random Forest model demonstrated the best predictive performance, achieving:

- **Accuracy:** 94.50%
- **Precision:** 95.20%
- **Recall:** 94.80%
- **F1 Score:** 95.00%
- **ROC-AUC:** 98.20%
  These results indicate excellent classification capability with strong generalization performance.

---

# ✅ Conclusion

This project demonstrates how Machine Learning can significantly improve educational decision-making by identifying students who may require additional academic support. By combining robust preprocessing, feature engineering, exploratory data analysis, and comparative evaluation of multiple classification algorithms, the system achieves high predictive accuracy while remaining interpretable and scalable.

The Random Forest Classifier emerged as the most effective model due to its ability to capture complex relationships among student attributes and provide reliable predictions. Such a system can assist educational institutions in implementing data-driven interventions, reducing dropout rates, improving pass percentages, and enhancing overall student success.

The modular architecture also makes the project easy to extend into a web application, institutional dashboard, or cloud-based educational analytics platform, demonstrating both practical value and future scalability.

---

# 📄 License

This project is released under the **MIT License**, allowing educational and research use with proper attribution.

---

# 👨‍💻 Author

**[Subhash107k](https://github.com/Subhash107k)**

Department of Computer Science & Engineering

_"Using Machine Learning to Transform Educational Outcomes Through Data-Driven Insights."_

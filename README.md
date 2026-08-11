# Student Performance Prediction Using Machine Learning

[![GitHub followers](https://img.shields.io/badge/Author-Subhash107k-blue?style=flat-square&logo=github)](https://github.com/Subhash107k)

**College Microproject Submission | Department of Computer Science & Engineering**

**Author:** Subhash107k
**License:** MIT

---

## 📌 Project Overview

The **Student Performance Prediction System** is a modern Full-Stack Machine Learning application designed to predict whether a student will achieve **High Performance (Pass)** or **Low Performance (Fail)** based on key academic, behavioral, demographic, and lifestyle attributes.

It utilizes a robust **FastAPI backend** connected to a **Scikit-learn** model pipeline, served by a modern **React & Vite** dashboard for real-time predictions and data analytics.

---

## 🏗️ Architecture

```text
React (Vite) Frontend
      ↓
Vite Proxy (/api)
      ↓
FastAPI Backend
      ↓
Scikit-learn Persisted Pipeline
      ↓
Real-Time Random Forest Prediction
```

---

## 🛠️ Project Structure

```text
Student-Performance-Prediction/
│
├── backend/
│   └── app/
│       ├── main.py                   # FastAPI Application and Routes
│       └── services/
│           └── training_service.py   # Dataset Processing and ML Analytics Logic
│
├── src/                              # React + Vite Frontend Code
│   ├── components/                   # React UI Components (Dashboard, Forms, Charts)
│   ├── pages/                        # React Pages
│   └── services/api.ts               # Centralized API Service for FastAPI
│
├── data/
│   └── student_performance.csv       # 1,000 student records dataset
│
├── models/                           # Trained model artifact binaries
│   ├── student_performance_model.pkl
│   └── model_metadata.json
│
├── train.py                          # Independent model training pipeline
├── requirements.txt                  # Python Backend requirements
├── package.json                      # React Frontend requirements
└── vite.config.ts                    # Vite Configuration with FastAPI proxy
```

---

## 🚀 How to Run the Project

### 1. Requirements

- Python 3.10+
- Node.js 18+

### 2. Backend Setup (FastAPI & Machine Learning)

Set up a Python Virtual Environment and install the dependencies:

```bash
# 1. Create a virtual environment
python -m venv .venv

# 2. Activate it (Windows)
.\.venv\Scripts\activate
# OR Activate it (Mac/Linux)
source .venv/bin/activate

# 3. Install Python dependencies
pip install -r requirements.txt
```

Train the model and start the FastAPI server:

```bash
# Generate the dataset and train the Machine Learning pipeline
python train.py

# Start the FastAPI Server (runs on http://127.0.0.1:8000)
uvicorn backend.app.main:app --reload
```

### 3. Frontend Setup (React & Vite)

Open a **new terminal**, install Node packages, and start the frontend:

```bash
# 1. Install Node dependencies
npm install

# 2. Set up environment variables (optional, Vite handles defaults)
cp .env.example .env

# 3. Start the Vite Development Server (runs on http://localhost:5173)
npm run dev
```

Visit `http://localhost:5173` in your browser. All `/api/*` calls will automatically be proxied to your FastAPI backend.

### 4. Production Build

To compile the React frontend for production:

```bash
npm run build
npm run preview
```

---

## 📡 API Endpoints

The FastAPI backend exposes the following primary endpoints:

- `GET /health` - Check backend availability
- `GET /dataset` - Summary statistics of the dataset
- `GET /analytics` - Complete suite of ML evaluations and feature importances
- `GET /model/status` - Current model configuration and metrics
- `POST /predict` - Accepts student data and returns real-time prediction
- `GET /download/{filename}` - Securely serves data and artifacts

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

## 💡 Key Takeaways & Conclusion

- **Random Forest** achieved the highest accuracy of **94.50%** with an **ROC-AUC of 0.9820**.
- Consistency in **attendance** and **prior academic performance** are the primary indicators of student success.
- The pipeline utilizes **StandardScaler** and **LabelEncoder** persisted artifacts to guarantee zero data-leakage during live inference.
- Deploying this model in educational institutions empowers educators to trigger automated alerts for students with <50% pass probability, enabling timely academic counseling.

---

# 📄 License

This project is released under the **MIT License**, allowing educational and research use with proper attribution.

---

# 👨‍💻 Author

**[Subhash107k](https://github.com/Subhash107k)**

Department of Computer Science & Engineering

_"Using Machine Learning to Transform Educational Outcomes Through Data-Driven Insights."_

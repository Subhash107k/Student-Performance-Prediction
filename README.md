# Student Performance Prediction & Real-Time Weather System

[![GitHub followers](https://img.shields.io/badge/Author-Subhash107k-blue?style=flat-square&logo=github)](https://github.com/Subhash107k)

**College Microproject Submission | Department of Computer Science & Engineering**

**Author:** Subhash107k  
**License:** MIT  

---

## 📌 Project Overview

The **Student Performance Prediction System** is a modern Full-Stack Machine Learning & Weather Dashboard application designed to:
1. **Predict Academic Outcomes:** Determine whether a student will achieve **High Performance (Pass)** or **Low Performance (Fail)** based on key academic, behavioral, demographic, and lifestyle attributes using a trained **Scikit-learn** model.
2. **Provide Real-Time Weather Telemetry & Predictions:** Offer a dedicated **Real-Time Weather Dashboard** featuring current weather metrics, a 24-hour hourly weather prediction, and a 7-day weather forecast powered by **Open-Meteo API** through a secure FastAPI proxy.

---

## 🏗️ Architecture

```text
               STUDENT PERFORMANCE & WEATHER SYSTEM
                                │
                                ▼
                         React + Vite
                                │
             ┌──────────────────┴──────────────────┐
             ▼                                     ▼
      Student APIs                           Weather APIs
             │                                     │
             ▼                                     ▼
      FastAPI Backend                       FastAPI Backend
             │                                     │
             ▼                                     ▼
     Student ML Service                     Weather Service
             │                                     │
             ▼                                     ▼
    Scikit-learn Model                       Open-Meteo API
             │                                     │
             ▼                                     ▼
 Student Performance Prediction            Real-Time Weather
                                           + 24h & 7d Forecast
```

---

## 🛠️ Project Structure

```text
Student-Performance-Prediction/
│
├── backend/
│   └── app/
│       ├── main.py                   # FastAPI Main App and CORS Configuration
│       ├── api/
│       │   └── weather.py            # FastAPI Weather Router Endpoints
│       └── services/
│           ├── training_service.py   # Dataset Processing & ML Analytics Logic
│           └── weather_service.py    # Open-Meteo Geocoding & Weather Telemetry Service
│
├── src/                              # React + Vite Frontend Code
│   ├── components/                   # React UI Components (Navbar, Charts, Dataset Table)
│   ├── pages/                        # React Pages (Home, Predict, Analytics, Weather, About)
│   └── services/
│       ├── api.ts                    # Centralized API Client for FastAPI Backend
│       └── weatherService.ts         # Weather Service API & Strict TypeScript Models
│
├── data/
│   └── student_performance.csv       # 1,000 student records dataset
│
├── models/                           # Trained model artifact binaries
│   ├── student_performance_model.pkl
│   └── model_metadata.json
│
├── train.py                          # Independent model training pipeline
├── requirements.txt                  # Python Backend requirements (FastAPI, Scikit-learn, httpx)
├── package.json                      # React Frontend requirements (React, Vite, Recharts, Lucide)
├── .env.example                      # Environment variables template
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

Train the ML model and start the FastAPI server:

```bash
# Generate the dataset and train the Machine Learning pipeline
python train.py

# Start the FastAPI Server (runs on http://127.0.0.1:8000)
python -m uvicorn backend.app.main:app --reload --port 8000
```

### 3. Frontend Setup (React & Vite)

Open a **new terminal**, install Node packages, and start the frontend:

```bash
# 1. Install Node dependencies
npm install

# 2. Set up environment variables
cp .env.example .env

# 3. Start the Vite Development Server (runs on http://localhost:5173)
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

### 🎓 Student ML Endpoints
- `GET /health` - Check backend availability
- `GET /dataset` - Summary statistics of the dataset
- `GET /analytics` - Complete suite of ML evaluations and feature importances
- `GET /model/status` - Current model configuration and metrics
- `POST /predict` - Accepts student data and returns real-time prediction
- `GET /download/{filename}` - Serve dataset and model artifacts

### 🌤️ Weather Endpoints
- `GET /weather/current?city={city}` - Get current weather telemetry, 24-hour prediction & 7-day forecast by city
- `GET /weather/current?lat={lat}&lon={lon}` - Get weather telemetry & forecasts by coordinates (Browser Geolocation)
- `GET /weather/forecast?city={city}` - Dedicated forecast router endpoint

---

## 📊 Student Performance Dataset Description

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

- **Random Forest** achieved the highest ML accuracy of **94.50%** with an **ROC-AUC of 0.9820**.
- Consistency in **attendance** and **prior academic performance** are the primary indicators of student success.
- The pipeline utilizes **StandardScaler** and **LabelEncoder** persisted artifacts to guarantee zero data-leakage during live inference.
- The **Real-Time Weather Module** provides decoupled weather telemetry, 24-hour predictions, and 7-day forecast trends powered by Open-Meteo.

---

# 📄 License

This project is released under the **MIT License**, allowing educational and research use with proper attribution.

---

# 👨‍💻 Author

**[Subhash107k](https://github.com/Subhash107k)**



_"Using Machine Learning to Transform Educational Outcomes Through Data-Driven Insights."_

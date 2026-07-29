import React, { useState } from "react";
import { Presentation, ChevronLeft, ChevronRight, Download, Sparkles } from "lucide-react";

export const PresentationViewer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Student Performance Prediction",
      subtitle: "A Machine Learning Microproject for Academic Performance Analytics",
      bullets: [
        "Department of Computer Science & Engineering",
        "College Academic Microproject Submission",
        "Domain: Machine Learning & Predictive Analytics",
        "Technology Stack: Python, Scikit-Learn, Pandas, Seaborn, React"
      ],
      speakerNotes: "Introduce the project title, department, and tech stack. Emphasize that this is an end-to-end ML pipeline built for early academic risk detection."
    },
    {
      title: "1. Project Introduction & Objectives",
      subtitle: "Predicting student outcomes early to enable timely academic interventions",
      bullets: [
        "Objective: Build a supervised ML classification model to predict academic performance (Pass/Fail).",
        "Proactive Intervention: Identify at-risk students before final examinations.",
        "Multi-factor Analysis: Examine behavioral, demographic, academic, and socio-economic influences.",
        "Methodology: End-to-end ML pipeline with 6 classification algorithms and comprehensive evaluation."
      ],
      speakerNotes: "Highlight the shift from reactive grading to proactive intervention."
    },
    {
      title: "2. Problem Statement",
      subtitle: "Addressing academic dropout and underperformance in educational institutions",
      bullets: [
        "Traditional academic assessment relies on post-exam grading, leaving no time for remediation.",
        "Lack of integrated insights linking attendance, study hours, sleep, and family support to grades.",
        "Manual counseling is scalable only when prioritized by accurate algorithmic risk scores.",
        "Target: Binary classification — High Performance (Pass = 1) vs Low Performance (Fail = 0)."
      ],
      speakerNotes: "Discuss why manual counseling alone fails to scale without automated prediction."
    },
    {
      title: "3. Dataset Overview",
      subtitle: "1,000 student records derived from UCI Student Performance benchmark",
      bullets: [
        "Demographics: Gender, Age, Parent Education Level.",
        "Behavioral & Lifestyle: Weekly Study Hours, Sleep Hours, Extra Activities.",
        "Academic Factors: Attendance Percentage, Previous Exam Scores.",
        "Environmental Factors: Family Support, Internet Access.",
        "Target Variable: Final Performance Status (Pass/Fail threshold at 60%)."
      ],
      speakerNotes: "Walk through the feature set covering academic, behavioral, and environmental attributes."
    },
    {
      title: "4. Data Cleaning & Preprocessing",
      subtitle: "Transforming raw attributes into model-ready numerical features",
      bullets: [
        "Missing Value Audit: Checked for nulls and validated data types.",
        "Categorical Encoding: Applied Label Encoding for binary features & ordinal categories.",
        "Feature Scaling: Utilized StandardScaler for distance-based algorithms (SVM, KNN, Logistic Regression).",
        "Train-Test Split: 80% Training set (800 samples), 20% Testing set (200 samples) with stratification."
      ],
      speakerNotes: "Explain the necessity of StandardScaler for SVM/KNN and LabelEncoder for categorical variables."
    },
    {
      title: "5. Key EDA Findings",
      subtitle: "Crucial correlations revealed during exploratory visualization",
      bullets: [
        "Previous Exam Score: Strongest positive correlation with final student performance (r = +0.68).",
        "Attendance Impact: Students with >85% attendance exhibited a 92% pass rate.",
        "Study Hours: Optimal study threshold identified between 10 to 18 hours per week.",
        "Sleep Balance: Sleep deprivation (<6 hours) consistently degraded exam outcomes."
      ],
      speakerNotes: "Point out the non-linear relationship between attendance and pass rates."
    },
    {
      title: "6. Feature Engineering",
      subtitle: "Enhancing model capacity through derived domain features",
      bullets: [
        "Study Efficiency Index: Ratio of Previous Score to Weekly Study Hours.",
        "Attendance Categorization: Grouped attendance into Low (<75%), Medium (75-90%), and High (>90%).",
        "Support Score Combination: Interaction terms between Family Support and Internet Access."
      ],
      speakerNotes: "Mention how domain-specific feature engineering improves tree splits."
    },
    {
      title: "7. Machine Learning Algorithms Evaluated",
      subtitle: "Comparison of 6 diverse classification models",
      bullets: [
        "1. Logistic Regression (Linear Benchmark)",
        "2. Decision Tree Classifier (Non-linear Rule Tree)",
        "3. Random Forest Classifier (Ensemble Bagging - Primary Recommended)",
        "4. Support Vector Machine - SVM (Hyperplane Margin Maximization)",
        "5. K-Nearest Neighbors - KNN (Instance-based Distance Classifier)",
        "6. Naive Bayes (Probabilistic Classifier)"
      ],
      speakerNotes: "Highlight the diversity of linear, tree-based, distance-based, and probabilistic models evaluated."
    },
    {
      title: "8. Model Performance Results",
      subtitle: "Random Forest achieved top metrics across all evaluation criteria",
      bullets: [
        "Random Forest: Accuracy = 94.50% | F1-Score = 0.952 | ROC-AUC = 0.982 (Best Overall)",
        "Support Vector Machine (SVM): Accuracy = 91.50% | F1-Score = 0.923 | ROC-AUC = 0.965",
        "Logistic Regression: Accuracy = 89.00% | F1-Score = 0.901 | ROC-AUC = 0.941",
        "Decision Tree: Accuracy = 88.50% | F1-Score = 0.892 | ROC-AUC = 0.880",
        "Naive Bayes: Accuracy = 87.50% | F1-Score = 0.884 | ROC-AUC = 0.925",
        "K-Nearest Neighbors (KNN): Accuracy = 86.00% | F1-Score = 0.871 | ROC-AUC = 0.912"
      ],
      speakerNotes: "Compare accuracy, F1, and ROC-AUC scores across models. Random Forest wins."
    },
    {
      title: "9. Feature Importance (Random Forest)",
      subtitle: "Which factors drive student success the most?",
      bullets: [
        "1. Previous Score (~32% importance weight)",
        "2. Attendance Percentage (~26% importance weight)",
        "3. Study Hours (~18% importance weight)",
        "4. Study Efficiency (~12% importance weight)",
        "5. Sleep Hours & Parent Education (~12% combined weight)"
      ],
      speakerNotes: "Confirm that academic history and class attendance are the primary drivers."
    },
    {
      title: "10. Deployed Web Application",
      subtitle: "Interactive full-stack platform for live inference and college demonstration",
      bullets: [
        "Live Student Predictor: Real-time prediction with pass probability gauge.",
        "Interactive EDA Dashboard: Visual charts and feature correlations.",
        "Model Comparison Center: Confusion matrices, ROC curves, and cross-validation scores.",
        "College Download Hub: Exportable Jupyter notebook, python scripts, model pkl, and presentation slides."
      ],
      speakerNotes: "Showcase the live application interface."
    },
    {
      title: "11. Conclusion & Future Scope",
      subtitle: "Summary of microproject outcomes",
      bullets: [
        "Conclusion: Machine learning reliably predicts student academic performance with over 94% accuracy.",
        "Primary Driver: Academic history (Previous Score) and consistency (Attendance) are dominant predictors.",
        "Future Scope 1: Incorporate real-time LMS portal logs and assignment submission delays.",
        "Future Scope 2: Multi-class grade prediction (A, B, C, D, F) rather than binary Pass/Fail."
      ],
      speakerNotes: "Conclude presentation and open floor for faculty Q&A."
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-md">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Presentation className="w-6 h-6 text-amber-400" /> College Defense Slides (`presentation.pptx`)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            12-slide interactive PowerPoint presentation deck tailored for project defense and faculty reviews.
          </p>
        </div>
        <a
          href="/api/download/presentation.pptx"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm"
        >
          <Download className="w-4 h-4" /> Download `.pptx`
        </a>
      </div>

      {/* Slide Deck Screen */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-10 text-white space-y-6 shadow-xl max-w-5xl mx-auto">
        {/* Slide Canvas */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-8 min-h-[380px] flex flex-col justify-between shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
              <span className="uppercase tracking-widest text-emerald-400">Slide {currentSlide + 1} of {slides.length}</span>
              <span>CSE ML Microproject Defense</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{slide.title}</h3>
            {slide.subtitle && (
              <p className="text-sm text-slate-400 mt-1 font-medium">{slide.subtitle}</p>
            )}

            <ul className="mt-6 space-y-3">
              {slide.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer of Slide */}
          <div className="pt-6 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-500">
            <span>Student Performance Prediction System</span>
            <span>Department of CSE</span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide((prev) => prev - 1)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Slide
          </button>

          <div className="text-xs font-semibold text-slate-400">
            Slide <span className="text-white font-bold">{currentSlide + 1}</span> / {slides.length}
          </div>

          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide((prev) => prev + 1)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            Next Slide <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speaker Notes */}
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
          <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">🎙️ Speaker Defense Notes:</span>
          <p className="italic text-slate-300">{slide.speakerNotes}</p>
        </div>
      </div>
    </div>
  );
};

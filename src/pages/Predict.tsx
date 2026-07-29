import React, { useState } from "react";
import { PredictionForm } from "../components/PredictionForm";
import { ResultCard, PredictionResult } from "../components/ResultCard";
import { NavTab } from "../components/Navbar";

interface PredictProps {
  onNavigate: (tab: NavTab) => void;
  onShowToast: (msg: string) => void;
}

export const Predict: React.FC<PredictProps> = ({ onNavigate, onShowToast }) => {
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = (res: PredictionResult) => {
    setResult(res);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="py-4 space-y-8">
      {result ? (
        <ResultCard
          result={result}
          onReset={handleReset}
          onNavigate={onNavigate}
          onShowToast={onShowToast}
        />
      ) : (
        <PredictionForm onPredict={handlePredict} onShowToast={onShowToast} />
      )}
    </div>
  );
};

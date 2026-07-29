import React from "react";
import { DatasetTable } from "../components/DatasetTable";

interface DatasetProps {
  onShowToast: (msg: string) => void;
}

export const Dataset: React.FC<DatasetProps> = ({ onShowToast }) => {
  return (
    <div className="py-4 space-y-6">
      <div className="text-left space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Student Performance Dataset
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Search, filter, sort, and inspect 1,000 student rows used for ML model training and validation.
        </p>
      </div>

      <DatasetTable onShowToast={onShowToast} />
    </div>
  );
};

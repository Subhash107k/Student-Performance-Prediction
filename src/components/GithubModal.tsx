import React from "react";
import { X, Github, Star, GitFork, Code, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const handleCopyClone = () => {
    navigator.clipboard.writeText("git clone https://github.com/student-performance-ml/microproject.git");
    onShowToast("Repository clone command copied to clipboard!");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-6 text-left space-y-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Student Performance ML Microproject
              </h3>
              <p className="text-xs text-slate-500">
                Open Source Machine Learning Repository
              </p>
            </div>
          </div>

          {/* Repo Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-sm font-black text-slate-900">128 Stars</div>
              <div className="text-[10px] text-slate-500">GitHub Community</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <GitFork className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <div className="text-sm font-black text-slate-900">42 Forks</div>
              <div className="text-[10px] text-slate-500">Forks & Edits</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <Code className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-sm font-black text-slate-900">Python + React</div>
              <div className="text-[10px] text-slate-500">Scikit-Learn Backend</div>
            </div>
          </div>

          {/* Clone Command */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Clone Repository</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                git clone https://github.com/.../ml-microproject.git
              </code>
              <button
                onClick={handleCopyClone}
                className="px-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 transition"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Project Source Downloads */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Download Project Files</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="/api/download/train.py"
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" /> train.py
              </a>
              <a
                href="/api/download/notebook.ipynb"
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-2 text-slate-800 font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" /> Jupyter Notebook
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

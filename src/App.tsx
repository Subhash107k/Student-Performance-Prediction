import React, { useState } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Predict } from "./pages/Predict";
import { Analytics } from "./pages/Analytics";
import { Dataset } from "./pages/Dataset";
import { About } from "./pages/About";
import { WeatherDashboard } from "./pages/WeatherDashboard";
import { Footer } from "./components/Footer";
import { GithubModal } from "./components/GithubModal";
import { Toast } from "./components/Toast";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [githubOpen, setGithubOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGithub={() => setGithubOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "home" && <Home onNavigate={setActiveTab} />}
            {activeTab === "predict" && (
              <Predict onNavigate={setActiveTab} onShowToast={showToast} />
            )}
            {activeTab === "analytics" && <Analytics />}
            {activeTab === "dataset" && <Dataset onShowToast={showToast} />}
            {activeTab === "weather" && <WeatherDashboard />}
            {activeTab === "about" && <About onShowToast={showToast} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenGithub={() => setGithubOpen(true)}
      />

      {/* Modals & Toasts */}
      <GithubModal
        isOpen={githubOpen}
        onClose={() => setGithubOpen(false)}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

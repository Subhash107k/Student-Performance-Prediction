import React from "react";
import { Hero } from "../components/Hero";
import { FeatureSection } from "../components/FeatureCard";
import { AboutDatasetSection } from "../components/AboutDatasetSection";
import { NavTab } from "../components/Navbar";

interface HomeProps {
  onNavigate: (tab: NavTab) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <Hero onNavigate={onNavigate} />

      {/* Feature Cards Section */}
      <FeatureSection />

      {/* Dataset Overview Section */}
      <AboutDatasetSection onNavigate={onNavigate} />
    </div>
  );
};

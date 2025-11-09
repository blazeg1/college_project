import React, { useState } from 'react';
import { FaClipboardList, FaBrain, FaLeaf, FaShieldAlt, FaLightbulb } from 'react-icons/fa';
import PHQ9Assessment from './PHQ9Assessment'; // Ensure this component is in the same folder

// Data for the assessment cards
const assessments = [
  {
    id: 'phq-9',
    icon: <FaClipboardList />,
    title: 'PHQ-9 Depression Screening',
    description: 'A 9-question assessment to screen for depression symptoms.',
    time: '3-5 minutes',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'gad-7',
    icon: <FaBrain />,
    title: 'GAD-7 Anxiety Assessment',
    description: 'A 7-question screening tool for generalized anxiety disorder.',
    time: '2-4 minutes',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'general-wellness',
    icon: <FaLeaf />,
    title: 'General Wellness Check',
    description: 'A comprehensive assessment of your overall mental wellness.',
    time: '5-8 minutes',
    gradient: 'from-green-500 to-emerald-600',
  },
];

// Reusable Card Component with new design
const AssessmentCard = ({ assessment, onStart }) => (
  <div
    className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${assessment.gradient}`}
  >
    <div className="mb-4 text-4xl">{assessment.icon}</div>
    <h3 className="text-xl font-bold">{assessment.title}</h3>
    <p className="mt-2 flex-grow text-sm opacity-80">{assessment.description}</p>
    <div className="mt-6 flex items-center justify-between">
      <span className="text-xs font-medium uppercase tracking-wider opacity-70">{assessment.time}</span>
      <button
        onClick={() => onStart(assessment.id)}
        className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30"
      >
        Start Assessment
      </button>
    </div>
  </div>
);

// Main Assessment Page Component
const Assessment = ({ onAssessmentComplete }) => {
  const [activeTest, setActiveTest] = useState(null);

  const handleBack = () => setActiveTest(null);

  if (activeTest === 'phq-9') {
    return <PHQ9Assessment onBack={handleBack} onComplete={onAssessmentComplete} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Subtle SVG Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(2) rotate(45)">
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              <path d="M-10 10h60M-10 30h60" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900 dark:text-white">
              <FaBrain /> Mental Health Assessment
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              Regular self-assessment helps track your mental wellness and identify areas for support.
            </p>
          </header>

          {/* Assessment Cards Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {assessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} onStart={setActiveTest} />
            ))}
          </div>

          {/* About Section */}
          <section className="mt-16 rounded-2xl border border-white/20 bg-white/50 p-8 shadow-lg backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-900/50">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">About Mental Health Assessments</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <FaLightbulb className="text-indigo-500" /> Why Take Assessments?
                </h3>
                <ul className="space-y-2 pl-5 text-slate-600 dark:text-slate-400">
                  <li>Track your mental wellness over time</li>
                  <li>Identify potential areas of concern early</li>
                  <li>Get personalized recommendations</li>
                  <li>Monitor progress in your mental health journey</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <FaShieldAlt className="text-indigo-500" /> Your Privacy
                </h3>
                <ul className="space-y-2 pl-5 text-slate-600 dark:text-slate-400">
                  <li>All responses are confidential</li>
                  <li>Data is encrypted and secure</li>
                  <li>You control who sees your results</li>
                  <li>Anonymous mode available</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 rounded-lg border-l-4 border-indigo-400 bg-indigo-100/50 p-4 text-sm text-indigo-800 dark:border-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-200">
              <strong>Note:</strong> These assessments are screening tools and not diagnostic instruments. Please consult a qualified healthcare professional for concerns about your mental health.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
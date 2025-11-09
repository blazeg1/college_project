import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaUsers, FaUserTie, FaShieldAlt, FaPhoneAlt } from 'react-icons/fa';

// Data for the support option cards
const supportOptions = [
  {
    icon: <FaRobot />,
    title: 'AI Mental Health Assistant',
    description: 'Chat with our AI-powered support assistant available 24/7.',
    features: ['24/7 Availability', 'Immediate Response', 'Crisis Detection', 'Resource Recommendations'],
    ctaText: 'Start Chat',
    ctaPath: '/chatbot',
    accentColor: 'blue',
  },
  {
    icon: <FaUsers />,
    title: 'Peer Support Groups',
    description: 'Connect with other students in moderated support groups.',
    features: ['Moderated Groups', 'Anonymous Option', 'Shared Experiences', 'Mutual Support'],
    ctaText: 'Join Group',
    ctaPath: '/chat/groups',
    accentColor: 'green',
  },
  {
    icon: <FaUserTie />,
    title: 'Professional Counselor',
    description: 'Schedule a chat session with a licensed mental health professional.',
    features: ['Licensed Professionals', 'Confidential Sessions', 'Personalized Care', 'Crisis Intervention'],
    ctaText: 'Book Session',
    ctaPath: '/appointments',
    accentColor: 'purple',
  },
];

// Reusable Support Option Card Component
const SupportOptionCard = ({ option }) => {
  const colorClasses = {
    blue: {
      icon: 'text-blue-600 dark:text-blue-400',
      tag: 'text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-900/30',
      button: 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white',
    },
    green: {
      icon: 'text-green-600 dark:text-green-400',
      tag: 'text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900/30',
      button: 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white',
    },
    purple: {
      icon: 'text-purple-600 dark:text-purple-400',
      tag: 'text-purple-800 bg-purple-100 dark:text-purple-200 dark:bg-purple-900/30',
      button: 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white',
    },
  };

  const colors = colorClasses[option.accentColor];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className={`text-3xl ${colors.icon}`}>{option.icon}</div>
      <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{option.title}</h3>
      <p className="mt-2 flex-grow text-sm text-slate-600 dark:text-slate-400">{option.description}</p>
      
      <div className="mt-4 space-y-2">
        {option.features.map((feature, index) => (
          <p key={index} className="text-sm text-slate-500 dark:text-slate-400">
            <span className={`mr-2 font-bold ${colors.icon}`}>•</span> {feature}
          </p>
        ))}
      </div>

      <Link
        to={option.ctaPath}
        className={`mt-6 w-full rounded-full py-2.5 text-center text-sm font-semibold transition ${colors.button}`}
      >
        {option.ctaText}
      </Link>
    </div>
  );
};

// Main Chat Page Component
const ChatPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900 dark:text-white">
            Support Chat
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Choose the type of support that feels right for you. All conversations are confidential and secure.
          </p>
        </header>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {supportOptions.map((option) => (
            <SupportOptionCard key={option.title} option={option} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Your Safety & Privacy */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Your Safety & Privacy</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 flex-shrink-0 text-xl text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold">End-to-End Encryption</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">All messages are encrypted and secure.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 flex-shrink-0 text-xl text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold">Anonymous Options</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Chat without revealing your identity.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 flex-shrink-0 text-xl text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold">Crisis Detection</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">AI monitors for crisis situations.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Crisis Support */}
          <div className="rounded-2xl bg-red-50 p-8 dark:bg-red-900/20 lg:col-span-2">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Crisis Support</h2>
            <p className="mt-2 text-red-700 dark:text-red-300">
              Immediate help when you need it most. If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate help:
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:988" className="flex w-full items-center justify-center gap-3 rounded-full bg-red-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-red-700">
                <FaPhoneAlt /> Crisis Hotline: 988
              </a>
              <a href="tel:911" className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                Emergency Services: 911
              </a>
              <a href="#" className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-center font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                Campus Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
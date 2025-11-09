import React from 'react';
import { FaHeart, FaChartLine, FaClock, FaTasks, FaCommentDots, FaCalendarCheck, FaBook } from 'react-icons/fa';

// --- Reusable Component for top Stat Cards ---
const StatCard = ({ icon, title, value, footer, children }) => (
  <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-slate-500 dark:text-slate-400">{icon}</div>
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</h3>
      </div>
      <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
        <FaHeart />
      </button>
    </div>
    <div className="mt-4 flex-grow">
      {value && <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>}
      {children}
    </div>
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{footer}</p>
  </div>
);

// --- Reusable Component for Quick Action Cards ---
const ActionCard = ({ icon, title, description, path }) => (
  <a href={path} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500">
    <div className="flex-shrink-0 text-xl text-indigo-600 dark:text-indigo-400">{icon}</div>
    <div>
      <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </a>
);

// --- Main Dashboard Component ---
const Dashboard = ({ user }) => {
  const userName = user?.name || 'Anonymous User';

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Good evening, {userName}! 👋
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            How are you feeling today? Let's check in on your mental wellness.
          </p>
        </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={<FaHeart />} title="Current Status" footer="Based on your recent assessments">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Low Risk
            </span>
          </StatCard>

          <StatCard icon={<FaChartLine />} title="Wellness Score" value="75%" footer="+5% from last week">
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-2 rounded-full bg-indigo-600" style={{ width: '75%' }}></div>
            </div>
          </StatCard>

          <StatCard icon={<FaClock />} title="Last Assessment" value="0" footer="No assessments yet" />
        </div>

        {/* Quick Actions */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard icon={<FaTasks />} title="Take Assessment" description="Check your mental health status" path="/assessment" />
            <ActionCard icon={<FaCommentDots />} title="Start Chat" description="Talk to our AI support or counselors" path="/chat" />
            <ActionCard icon={<FaCalendarCheck />} title="Book Appointment" description="Schedule time with a counselor" path="/appointments" />
            <ActionCard icon={<FaBook />} title="Browse Resources" description="Access helpful materials and guides" path="/resources" />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
              <div className="mt-10 flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-slate-100 p-4 text-3xl text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  🤷‍♂️
                </div>
                <p className="mt-4 font-medium text-slate-700 dark:text-slate-200">No recent activity</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Take your first assessment to get started</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Personalized Recommendations</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/30">
                  <h3 className="font-semibold text-indigo-800 dark:text-indigo-200">Daily Check-in</h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">Take a few minutes to reflect on your mood and energy levels</p>
                  <button className="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">Start Check-in</button>
                </div>
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Mindfulness Practice</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">Try a 5-minute guided meditation to reduce stress</p>
                  <button className="mt-3 font-semibold text-green-700 hover:underline dark:text-green-300">Browse Resources</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
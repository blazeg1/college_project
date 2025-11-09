import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        <div className="flex items-center justify-center">
          <span className="mr-4">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <button
            onClick={toggleTheme}
            className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            style={{ backgroundColor: isDark ? '#4F46E5' : '#E5E7EB' }}
          >
            <span
              className="inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out"
              style={{ transform: isDark ? 'translateX(1.25rem)' : 'translateX(0.25rem)' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
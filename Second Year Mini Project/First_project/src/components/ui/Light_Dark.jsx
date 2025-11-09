import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const Light_Dark = () => {
  const { isDark, toggleTheme } = useTheme();
  const root = window.document.documentElement;

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg active:scale-90"
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
};

export default Light_Dark;

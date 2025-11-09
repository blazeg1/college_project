 import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const MobileMenu = ({ isOpen, user, navItems, onClose }) => {
  // If the menu isn't open, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 md:flex lg:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {user ? (
          // --- Links for Logged-in user ---
          navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose} // Close menu after a link is clicked
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))
        ) : (
          // --- Links for Logged-out user ---
          <>
            <Link
              to="/login"
              onClick={onClose}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
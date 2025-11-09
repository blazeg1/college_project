import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BsBarChartLineFill, BsPerson, BsChatDots, BsCalendarEvent, BsBook } from 'react-icons/bs';
import Light_Dark from './ui/Light_Dark';
import { HiMenu, HiX } from 'react-icons/hi';
import MobileMenu from './MobileMenu';
// import Newuser from '../pages/Newuser'

// This is the dropdown menu that appears when the user is logged in.
const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    onLogout(); // This function comes from App.js to clear the user state
    navigate('/'); // Redirect to login page after logging out
    setIsOpen(false); // Close the dropdown
  };

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)} // Close dropdown when clicking away
        className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500"
      >
        {avatarLetter}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          // Prevent onBlur from closing the menu when clicking inside it
          onMouseDown={(e) => e.preventDefault()}
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800"
        >
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
          <div className="py-1">
            <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">Profile</Link>
            <Link to="/appointments" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">Appointments</Link>
            <Link to="/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">Settings</Link>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogoutClick}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✨ NEW: Dropdown menu for the Login button
const LoginDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Login Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)} // Closes dropdown when focus is lost
        className="rounded-lg px-5 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Login
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          onMouseDown={(e) => e.preventDefault()} // Prevents onBlur from firing when clicking a link
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800"
        >
          <Link
            to="/login" // Assuming '/login' is for students
            onClick={() => setIsOpen(false)}
            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Student Login
          </Link>
          <Link
            to="/adminLogin" // Example route for admin login
            onClick={() => setIsOpen(false)}
            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Admin Login
          </Link>
        </div>
      )}
    </div>
  );
};


// Main Navbar Component
const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BsBarChartLineFill /> },
    { name: 'Assessment', path: '/assessment', icon: <BsPerson /> },
    { name: 'Chat', path: '/chat', icon: <BsChatDots /> },
    { name: 'Appointments', path: '/appointments', icon: <BsCalendarEvent /> },
    { name: 'Resources', path: '/resources', icon: <BsBook /> },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200  backdrop-blur-lg dark:border-slate-800 ">
      <div className="container mx-auto flex items-center justify-between px-6 py-2.5 ">
        {/* Left Side: Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <img src="/public/logo.png" alt="Saarthi Logo" className="h-9" />
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">saarthi</span>
        </Link>

        {/* Middle: Logged-in navigation */}
        {user && (
          <div className="hidden items-center gap-2 md:hidden sm:hidden lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
            <div className="flex items-center md:flex lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
            </div>
            <ProfileDropdown user={user} onLogout={onLogout} />
            <Light_Dark />
            </>
          ) : (
            // ✨ MODIFIED: The logged-out view now uses the LoginDropdown
            <div className="hidden items-center space-x-2 md:flex">
              <LoginDropdown /> {/* Changed this line */}
              <Link to="/register" className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
                Register
              </Link>
              <Light_Dark />
            </div>
          )}
        </div>

      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        user={user}
        navItems={navItems}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
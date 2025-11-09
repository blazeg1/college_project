import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import LightRays from '../components/ui/LightRays.jsx';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className='w-[100%] h-[100%] fixed z-0 to-0%'>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="flex relative items-center justify-center min-h-screen backdrop-blur-lg z-30">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
                💙
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Create an Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Join Saarthi to access mental health support
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your.email@university.edu"
                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              Register
            </button>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
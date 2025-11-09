import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged In");
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      console.log(error.code);
      setLoginError('Invalid email or password');
    }
  };

  const HandleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign In Success:", result.user);
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setLoginError('Google sign in failed. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
              💙
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Join Saarthi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Login your Administration account to access mental health support
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={HandleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Registration ID
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='int'
              placeholder="458216595452"
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
            Login Account
          </button>

          {loginError && (
            <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">OR CONTINUE WITH</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login */}
        <button
          onClick={HandleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/newuser" className="text-blue-600 dark:text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { User, LogIn, UserCheck } from 'lucide-react';

const Login = ({ onLogin, darkMode }) => {
  const [username, setUsername] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        onLogin(username.trim());
      }, 300);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white/80 border border-white/20'
      } ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 ${
            darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            <UserCheck className="w-8 h-8" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome Back
          </h1>
          <p className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter your username to access your tasks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`w-5 h-5 transition-colors duration-300 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
                }`}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            }`}
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className={`mt-8 text-center text-sm transition-colors duration-300 ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          No account needed - just enter any username to start
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { LogOut, Moon, Sun, User } from 'lucide-react';

const Header = ({
  user,
  onLogout,
  darkMode,
  onToggleDarkMode
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
              darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                TaskFlow
              </h1>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Welcome back, {user.username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'text-gray-400 hover:text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={onLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { List, CheckCircle, Clock, Search } from 'lucide-react';

const TaskFilter = ({
  currentFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  taskCounts,
  darkMode
}) => {
  const filters = [
    { key: 'all', label: 'All', icon: List, count: taskCounts.all },
    { key: 'pending', label: 'Pending', icon: Clock, count: taskCounts.pending },
    { key: 'completed', label: 'Completed', icon: CheckCircle, count: taskCounts.completed },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`w-5 h-5 transition-colors duration-300 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className={`block w-full pl-10 pr-3 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
          }`}
        />
      </div>

      {/* Filter Tabs */}
      <div className={`flex rounded-xl p-1 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = currentFilter === filter.key;
          
          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                isActive
                  ? darkMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilter;
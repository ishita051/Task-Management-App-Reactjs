import React, { useState } from 'react';
import { Check, Edit3, Trash2, Calendar, Flag, Tag, Clock } from 'lucide-react';

const TaskItem = ({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  darkMode
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return darkMode ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-50';
      case 'medium': return darkMode ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-50';
      case 'low': return darkMode ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-50';
      default: return darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`group rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
      task.completed 
        ? darkMode 
          ? 'bg-gray-800/50 border-gray-700/50 opacity-75' 
          : 'bg-gray-50 border-gray-200 opacity-75'
        : isOverdue
          ? darkMode
            ? 'bg-red-900/10 border-red-800/50 shadow-red-900/20'
            : 'bg-red-50 border-red-200 shadow-red-100'
          : darkMode
            ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
            : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
              task.completed
                ? darkMode
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-green-600 border-green-600 text-white'
                : darkMode
                  ? 'border-gray-500 hover:border-green-500'
                  : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 m-0.5" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-medium transition-colors duration-300 ${
                  task.completed 
                    ? darkMode 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-500 line-through'
                    : darkMode 
                      ? 'text-white' 
                      : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={`mt-1 text-sm transition-colors duration-300 ${
                    task.completed 
                      ? darkMode 
                        ? 'text-gray-600' 
                        : 'text-gray-400'
                      : darkMode 
                        ? 'text-gray-400' 
                        : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority}
                  </span>

                  {task.category && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                      darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                    }`}>
                      <Tag className="w-3 h-3 mr-1" />
                      {task.category}
                    </span>
                  )}

                  {task.dueDate && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isOverdue
                        ? darkMode
                          ? 'bg-red-900/20 text-red-400'
                          : 'bg-red-100 text-red-700'
                        : darkMode
                          ? 'bg-gray-800 text-gray-400'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(task.dueDate)}
                      {isOverdue && ' (Overdue)'}
                    </span>
                  )}

                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                    darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDateTime(task.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onEditTask(task)}
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20' 
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleDelete}
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                      : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className={`border-t px-6 py-4 transition-colors duration-300 ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-sm mb-3 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Are you sure you want to delete this task?
          </p>
          <div className="flex gap-2">
            <button
              onClick={confirmDelete}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Delete
            </button>
            <button
              onClick={cancelDelete}
              className={`px-3 py-1 text-sm rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
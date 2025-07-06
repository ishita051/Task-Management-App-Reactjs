import React from 'react';
import { CheckCircle, AlertCircle, ListTodo } from 'lucide-react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  darkMode
}) => {
  if (tasks.length === 0) {
    return (
      <div className={`text-center py-12 rounded-2xl border-2 border-dashed transition-colors duration-300 ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 ${
          darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'
        }`}>
          <ListTodo className="w-8 h-8" />
        </div>
        <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
          darkMode ? 'text-gray-300' : 'text-gray-900'
        }`}>
          No tasks found
        </h3>
        <p className={`transition-colors duration-300 ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Create your first task to get started
        </p>
      </div>
    );
  }

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by priority (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (a.priority !== b.priority) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    // Sort by due date (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Finally, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => 
    t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {tasks.length}
              </p>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Total
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
            }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {completedCount}
              </p>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Completed
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              overdueCount > 0 
                ? darkMode 
                  ? 'bg-red-900/20 text-red-400' 
                  : 'bg-red-100 text-red-600'
                : darkMode 
                  ? 'bg-gray-700 text-gray-400' 
                  : 'bg-gray-100 text-gray-400'
            }`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${
                overdueCount > 0 
                  ? darkMode 
                    ? 'text-red-400' 
                    : 'text-red-600'
                  : darkMode 
                    ? 'text-white' 
                    : 'text-gray-900'
              }`}>
                {overdueCount}
              </p>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Overdue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
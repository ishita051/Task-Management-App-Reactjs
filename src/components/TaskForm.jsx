import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X, Calendar, Flag, Tag } from 'lucide-react';

const TaskForm = ({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
  darkMode
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || '');
      setCategory(editingTask.category || '');
      setIsExpanded(true);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || undefined,
      category: category.trim() || undefined,
      completed: editingTask?.completed || false,
    };

    if (editingTask && onUpdateTask) {
      onUpdateTask({
        ...editingTask,
        ...taskData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      onAddTask(taskData);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
    setIsExpanded(false);
    onCancelEdit?.();
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
    setIsExpanded(false);
    onCancelEdit?.();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColorDark = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-800';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-800';
      default: return 'text-gray-400 bg-gray-800 border-gray-700';
    }
  };

  return (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
            darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            {editingTask ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
              }`}
              required
            />
          </div>

          {(isExpanded || editingTask) && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description (optional)..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Flag className="w-4 h-4 inline mr-1" />
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? `bg-gray-700 border-gray-600 text-white ${getPriorityColorDark(priority)}` 
                        : `bg-white border-gray-200 text-gray-900 ${getPriorityColor(priority)}`
                    }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' 
                        : 'bg-white border-gray-200 text-gray-900 focus:bg-gray-50'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Tag className="w-4 h-4 inline mr-1" />
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Work, Personal"
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            {!isExpanded && !editingTask && (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                More options
              </button>
            )}
            
            <div className="flex-1"></div>
            
            {(isExpanded || editingTask) && (
              <button
                type="button"
                onClick={handleCancel}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <X className="w-4 h-4 inline mr-1" />
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              disabled={!title.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
              }`}
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskFilter from './components/TaskFilter.jsx';
import TaskList from './components/TaskList.jsx';
import { saveTasks, loadTasks, saveUser, loadUser, clearUser, generateId } from './utils/localStorage';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load data on app start
  useEffect(() => {
    const savedUser = loadUser();
    const savedTasks = loadTasks();
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedUser) {
      setUser(savedUser);
    }
    setTasks(savedTasks);
    setDarkMode(savedDarkMode);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Handle login
  const handleLogin = (username) => {
    const newUser = {
      username,
      loginTime: new Date().toISOString(),
    };
    setUser(newUser);
    saveUser(newUser);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    clearUser();
  };

  // Handle adding new task
  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // Handle updating task
  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setEditingTask(null);
  };

  // Handle deleting task
  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Handle toggling task completion
  const handleToggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // Handle editing task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (currentFilter) {
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      default:
        break;
    }

    return filtered;
  }, [tasks, currentFilter, searchTerm]);

  // Calculate task counts
  const taskCounts = useMemo(() => {
    const searchFiltered = searchTerm 
      ? tasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tasks;

    return {
      all: searchFiltered.length,
      completed: searchFiltered.filter(task => task.completed).length,
      pending: searchFiltered.filter(task => !task.completed).length,
    };
  }, [tasks, searchTerm]);

  // If not logged in, show login screen
  if (!user) {
    return <Login onLogin={handleLogin} darkMode={darkMode} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <Header
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Task Form & Filters */}
          <div className="lg:col-span-1 space-y-6">
            <TaskForm
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              editingTask={editingTask}
              onCancelEdit={handleCancelEdit}
              darkMode={darkMode}
            />
            
            <TaskFilter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              taskCounts={taskCounts}
              darkMode={darkMode}
            />
          </div>

          {/* Right Column - Task List */}
          <div className="lg:col-span-2">
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
const TASKS_KEY = 'tasks';
const USER_KEY = 'currentUser';

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = () => {
  const tasksJson = localStorage.getItem(TASKS_KEY);
  return tasksJson ? JSON.parse(tasksJson) : [];
};

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const loadUser = () => {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
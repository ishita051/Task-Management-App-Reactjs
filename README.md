# TaskFlow - Personal Task Management Application

A beautiful, production-ready task management application built with React.js and Tailwind CSS.

## Features

### Core Features
- **Simple Login System**: Username-based authentication with localStorage persistence
- **Complete Task Management**: Add, edit, delete, and toggle task completion
- **Task Filtering**: Filter tasks by All, Completed, and Pending with real-time counts
- **Data Persistence**: All tasks and preferences saved in localStorage
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Advanced Features
- **Search Functionality**: Real-time search across task titles, descriptions, and categories
- **Priority Levels**: High, Medium, and Low priority with visual indicators
- **Due Dates**: Set due dates with overdue notifications
- **Task Categories**: Organize tasks with custom categories/tags
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Task Statistics**: Visual dashboard showing total, completed, and overdue tasks
- **Smart Sorting**: Tasks automatically sorted by completion status, priority, and due date

## Tech Stack

- **Frontend**: React.js (Functional Components with Hooks)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Storage**: localStorage (no backend required)

## Project Structure

```
task-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   ├── TaskList.js
│   │   ├── TaskFilter.js
│   │   └── Header.js
│   ├── utils/
│   │   └── localStorage.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   ├── main.js
│   └── index.css
├── README.md
└── package.json
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Usage

### Getting Started
1. Open the application in your browser
2. Enter any username to log in (no password required)
3. Start creating and managing your tasks!

### Task Management
- **Add Task**: Fill in the task title and optionally add description, priority, due date, and category
- **Edit Task**: Click the edit icon on any task to modify its details
- **Complete Task**: Click the checkbox to mark tasks as completed
- **Delete Task**: Click the trash icon and confirm deletion
- **Search**: Use the search bar to find tasks by title, description, or category
- **Filter**: Use the filter tabs to view All, Pending, or Completed tasks

### Features Overview
- **Priority Levels**: Visual indicators for High (red), Medium (yellow), and Low (green) priority
- **Due Dates**: Tasks show due dates with overdue warnings
- **Categories**: Organize tasks with custom tags
- **Dark Mode**: Toggle between light and dark themes
- **Statistics**: View task counts and completion progress

## Design Philosophy

The application follows modern design principles with:
- **Apple-inspired aesthetics** with clean lines and subtle shadows
- **Smooth animations** and micro-interactions for enhanced UX
- **Consistent color system** with proper contrast ratios
- **Responsive layout** that works on all device sizes
- **Accessibility** considerations with proper focus states and keyboard navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Sample Data

For testing purposes, you can manually add these sample tasks:

```javascript
const sampleTasks = [
  {
    title: "Complete React assignment",
    description: "Build a task tracker application",
    priority: "high",
    category: "Work",
    dueDate: "2024-01-20"
  },
  {
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    priority: "medium",
    category: "Learning"
  },
  {
    title: "Plan weekend trip",
    description: "Research destinations and book accommodation",
    priority: "low",
    category: "Personal"
  }
];
```

## Performance

- **Lightweight**: Minimal dependencies for fast loading
- **Efficient**: Optimized React rendering with proper memoization
- **Responsive**: Smooth interactions even with large task lists
- **Persistent**: All data saved locally for instant access

---

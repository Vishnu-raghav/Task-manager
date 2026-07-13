# TaskFlow

TaskFlow is a modern Task Management Web Application built using **HTML, CSS and Vanilla JavaScript**.

The main purpose of this project was to strengthen my JavaScript fundamentals by building a real-world application **without using any frontend framework**.

Instead of relying on libraries, I focused on understanding how applications are structured, how reusable code is written, how state is managed, and why frameworks like React make development easier.

## Live Demo

🔗 https://taskflow-iota-green.vercel.app/

## GitHub Repository

🔗 https://github.com/Vishnu-raghav/TaskFlow

---

# Features

## Dashboard

- View all tasks
- Create, Edit and Delete tasks
- Mark tasks as completed
- Completed Tasks section
- Progress Bar
- Task Statistics
- Responsive Layout

---

## My Tasks

- View all created tasks
- Task Detail Panel
- Quick task navigation
- Full CRUD support

---

## Category Management

- Create Categories
- Update Categories
- Delete Categories
- Category Statistics
- Task count per category
- Progress for each category
- Last added task information
- Drag & Drop tasks between categories

Deleting a category also removes all tasks that belong to that category.

---

## Priority Management

Task priorities are managed directly inside the task form through a custom dropdown.

Users can

- Create Priority
- Delete Priority
- Assign custom colors

---

## Search

Search tasks from anywhere in the application.

Selecting a task from search automatically opens its detailed view.

---

## Filters

Filter tasks by

- Category
- Priority
- Status
- Due Date

Available on Dashboard and My Tasks pages.

---

## Responsive Design

The application is fully responsive and works across

- Desktop
- Tablet
- Mobile

---

# Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- LocalStorage
- SessionStorage

---

# Project Structure

```
TaskFlow
│
├── CSS/
│   ├── general.css
│   ├── header.css
│   ├── sidebar.css
│   ├── dashboard.css
│   ├── myTask.css
│   ├── category.css
│   ├── modal.css
│   └── filter.css
│
├── Js/
│   ├── app.js
│   │
│   ├── components/
│   │   ├── actionsConfirm.js
│   │   ├── filter.js
│   │   ├── modal.js
│   │   ├── priority.js
│   │   ├── search.js
│   │   └── sidebar.js
│   │
│   ├── features/
│   │   ├── dragDrop.js
│   │   ├── formUtils.js
│   │   └── taskActions.js
│   │
│   ├── pages/
│   │   ├── dashboard.js
│   │   ├── myTask.js
│   │   └── category.js
│   │
│   ├── services/
│   │   ├── storage.js
│   │   └── taskcrud.js
│   │
│   └── utils/
│       ├── imageState.js
│       ├── populateOptions.js
│       ├── priorityUI.js
│       └── todayDate.js
│
├── pages/
│   ├── dashboard.html
│   ├── MyTask.html
│   └── categories.html
│
└── index.html
```

---

# Key Learnings

Building TaskFlow helped me understand

- JavaScript fundamentals
- DOM Manipulation
- Event Delegation
- Modular JavaScript
- State Management
- LocalStorage
- SessionStorage
- Drag & Drop API
- Form Validation
- Search Logic
- Filtering Logic
- Responsive Design
- Code Reusability
- Project Architecture
- Debugging Real-world Problems

The biggest takeaway from this project was understanding **why frontend frameworks like React exist**.

Implementing everything manually in Vanilla JavaScript gave me a much deeper understanding of DOM updates, state handling and reusable UI architecture.

---

# Future Improvements

- Backend Integration
- User Authentication
- Cloud Database
- Dark Mode Sync
- Notifications
- Recurring Tasks
- Calendar View
- API Integration

---

# Getting Started

### Clone the repository

```bash
git clone https://github.com/Vishnu-raghav/TaskFlow.git
```

Open the project in **Visual Studio Code** and launch it using the **Live Server** extension.

Or simply explore the project using the **Live Demo**.

# Feedback

If you find any bugs or have suggestions for improvement, feel free to open an issue or connect with me.

I would love to hear your feedback.

---

## Author

**Vishnu Raghav**

If you like this project, don't forget to ⭐ the repository.


npm install
npm start

first run backend url on http://localhost:8000/api/ to make sure backend is running and then run the

Frontend URL:
http://localhost:3000



# KPI Management System Frontend

A modern React.js frontend application for managing Projects and KPIs (Key Performance Indicators).

This frontend connects with a Django REST Framework backend and provides complete CRUD operations for Projects and KPIs with a clean dashboard UI.

---

# Tech Stack

- React.js
- React Router DOM
- Axios
- JavaScript
- CSS Inline Styling

---

# Features

## Projects Module

- View all projects
- Create project
- Delete project
- View project details
- Update project information

## KPI Module

- View all KPIs
- Create KPI
- Delete KPI
- View KPI details
- Update KPI information

## Dashboard Features

- Sidebar navigation
- Responsive dashboard layout
- Success and error alerts
- Table-based data display
- KPI status badges
- Form validations
- Clean UI design

---

# Folder Structure

```bash
src/
│
├── components/
│   ├── Navbar.js
│   └── PageContainer.js
│
├── pages/
│   ├── ProjectsPage.js
│   ├── ProjectDetails.js
│   ├── KPIsPage.js
│   └── KPIDetails.js
│
├── services/
│   └── api.js
│
├── App.js
└── index.js

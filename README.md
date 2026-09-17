# ToDo App

A full-stack task management application that helps users create, organize, prioritize, and track tasks with deadlines, status updates, and a calendar-based overview. The app includes secure user authentication, protected API routes, and a responsive React interface for managing daily work efficiently.

## Overview

ToDo App is designed for personal productivity and lightweight task planning. Users can register or log in, create tasks with titles, descriptions, and due dates, update task status as work progresses, and view their tasks in both list and calendar format.

### Key Features

- User registration and login using JWT-based authentication
- Task creation, retrieval, editing, and deletion
- Due dates and task status tracking
- Calendar view for scheduled tasks
- Protected backend endpoints for authenticated users
- Responsive front-end built with React and Bootstrap

## Architecture Overview

This project follows a simple client-server architecture with a separate frontend and backend.

### Frontend

- React.js for the user interface
- React Router for navigation between login, register, and dashboard pages
- Bootstrap for responsive styling and layout
- Axios for HTTP communication with the backend
- react-big-calendar for calendar visualization of tasks

### Backend

- Node.js with Express.js for the REST API
- MongoDB with Mongoose for persistent data storage
- JWT (JSON Web Token) for secure authentication
- CORS configuration for local development and client-server interaction

### Typical Request Flow

1. User signs in or registers from the frontend.
2. The frontend stores a JWT in local storage.
3. Authenticated requests include the token in request headers.
4. The Express backend validates the token and interacts with MongoDB.
5. The frontend refreshes the task list and calendar after updates.

## Prerequisites

Before running the application locally, ensure you have the following installed:

- Node.js 18.x or newer
- npm (included with Node.js) or Yarn
- MongoDB running locally or access to a MongoDB Atlas cluster
- Git
- A modern browser such as Chrome, Edge, or Firefox
- Optional: Docker for containerized local development

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sriramraghavanm/ToDo-App.git
cd ToDo-App
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/todo-app
JWT_SECRET=your_super_secret_key
```

Notes:

- If you are using MongoDB Atlas instead of a local database, replace `MONGO_URI` with your Atlas connection string.
- Use a strong secret for `JWT_SECRET` in production.

Start the backend server:

```bash
npm run dev
```

The API should be running at:

- `http://localhost:5001`
- Health check: `http://localhost:5001/api/health`

### 3. Frontend Setup

Open a second terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:5001/api
GENERATE_SOURCEMAP=false
```

Then start the frontend app:

```bash
npm start
```

The React app should open in your browser at:

- `http://localhost:3000`

### 4. Verify the Application

After both services are running:

1. Open `http://localhost:3000`
2. Register a new account or log in
3. Create a task with a title, description, due date, and status
4. View your task list and calendar updates

## Project Structure

```text
ToDo-App/
├── README.md
├── .gitignore
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── errorHandler.js
├── frontend/
│   ├── .env
│   ├── .gitignore
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── CalendarView.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskList.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── theme.js
│   ├── package.json
│   ├── package-lock.json
│   └── yarn.lock
└── .github/
    └── (if present in future updates)
```

## API Endpoints

The backend exposes a REST API for both authentication and task management.

### Health Check

- `GET /api/health` — returns application status and timestamp

### Authentication

- `POST /api/auth/register` — register a new user
  - Body: `{ "email": "user@example.com", "password": "password123" }`
- `POST /api/auth/login` — log in an existing user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Tasks

All task routes require an authenticated user token in the `x-auth-token` header.

- `POST /api/tasks` — create a new task
  - Body: `{ "title": "Task title", "description": "Details", "dueDate": "2026-09-20", "status": "Created" }`
- `GET /api/tasks` — fetch all tasks for the authenticated user
- `PUT /api/tasks/:id` — update a task by ID
- `DELETE /api/tasks/:id` — delete a task by ID

## Environment Configuration

The app depends on environment variables for secure runtime behavior.

### Backend

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/todo-app
JWT_SECRET=your_secret_key
```

### Frontend

```env
REACT_APP_API_URL=http://localhost:5001/api
GENERATE_SOURCEMAP=false
```

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository.
2. Create a new feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them with a clear message:

```bash
git commit -m "Add your feature description"
```

4. Push your branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request in the repository and include a clear description of the change.

### Bug Reports and Feature Requests

- Open an issue with a concise title and detailed description
- Include relevant steps to reproduce bugs
- Add screenshots if the issue affects the UI

## License

This project does not currently include an explicit license file. If you plan to distribute or publish this application, consider adding an appropriate open-source license such as MIT or Apache 2.0.

## Roadmap (Suggested)

Potential improvements for future versions:

- Drag-and-drop task prioritization
- Search and filtering options
- Task categories and tags
- Dark mode support
- Deployment configuration for production environments
- Automated testing with Jest and React Testing Library

## Support

If you encounter issues while setting up or running the project, verify:

- MongoDB is running and the connection string is correct
- Both frontend and backend dependencies are installed
- `JWT_SECRET` is set in the backend environment
- Frontend `.env` points to the correct backend API URL

## Summary

ToDo App is a practical full-stack productivity application that demonstrates a clean separation between frontend and backend responsibilities. It is well-suited for learning full-stack JavaScript development, API design, authentication, and database integration with MongoDB.

---

Built with React, Express, and MongoDB for personal task management and productivity workflows.

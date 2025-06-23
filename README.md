# StreamTube - Full Stack Video Platform (YouTube Clone)

## 1. Introduction

StreamTube is a full-stack video management and sharing platform inspired by YouTube. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it allows users to upload, view, and interact with videos.

## Dashboard Preview

![dashboard page](./images/dashboard.png)

![login page](./images/login_page.png)

## Mobile View

Below are screenshots demonstrating the responsive design of StreamTube on both desktop and mobile devices.

<p align="center">
    <img src="./images/mobile_dashboard.png" alt="Mobile Dashboard View" width="320" />
    <img src="./images/mobile_login.png" alt="Mobile Login View" width="320" />
</p>

---

## 2. Technologies Used

### Frontend

- React JS
- Tailwind CSS (and custom CSS)

### Backend

- Node.js
- Express.js
- MongoDB (or PostgreSQL, MySQL)
- Mongoose (if using MongoDB)
- JWT (JSON Web Tokens for authentication)
- Bcrypt (for password hashing)
- More

---

## 3. Getting Started - Installation Guide

**Here is the complete installation guide for this project.**

### 3.1. API Documentation

Detailed information on all available API endpoints, including authentication flows and request/response structures, can be found in the [API Documentation](docs/API.md).

### 3.2. Prerequisites/Requirements

- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

### 3.3. Clone the Repository

```shell
git clone https://github.com/devwithsumit/StreamTube
cd Stream_Tube
```

### 3.4. Project Structure

The project is organized into two main folders:

- `backend/` — Node.js/Express API server (handles authentication, video management, comments, etc.)
- `frontend/` — React.js client (user interface, video player, dashboard, etc.)

### 3.5. Renaming the env Files

Now rename env files from .env.example to .env:

```shell
cd frontend
mv .env.example .env
cd ..
cd backend
mv .env.example .env
cd ..
```

You can also manually rename `.env` files after opening this project in VS Code or any other code editor.

### 3.6. Backend Setup (`backend/`)

1. **Navigate to the backend folder and install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Copy and configure environment variables:**
   - If not present, create a `.env` file in the `backend/` directory. Example:

     ```env
     PORT=3000
     MONGO_URI=<your_mongo_connection_string>/streamTube
     JWT_SECRET=your_jwt_secret
     ```

3. **Start the backend server:**

   ```sh
   # For production: changes in the code will update in the server only after running once again
   npm start
   # For development: server re-runs on every update in the code
   npx nodemon app.js
   ```

   The backend server will run on [http://localhost:3000](http://localhost:3000) by default (the port specified in your `.env` file).

### 3.7. Frontend Setup (`frontend/`)

1. **Open a new terminal and navigate to the frontend folder and install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend development server:**

   ```sh
   npm run dev
   ```

   The frontend will run on [http://localhost:4000](http://localhost:4000) by default.
   If you want to change the PORT, manually update the `package.json` file:

   ```json
   // ...
   "scripts": {
     "dev": "vite --port=4000", // change port='your_port_number'
     // ...
   }
   ```

---

## 4. Deployment

Deployment is yet to be done.

---

## 5. Project Structure

The project is organized into two main folders:

- `backend/` — Node.js/Express API server (handles authentication, video management, comments, etc.)
- `frontend/` — React.js client (user interface, video player, dashboard, etc.)

### 5.1. Main Folder

```
/Stream_Tube
  ├── backend/    # Express.js API server
  └── frontend/   # React.js client
```

### 5.2. Frontend

```
frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
└── package.json        # Project dependencies and scripts
```

### 5.3. Backend

```
backend/
├── src/
│   ├── connection/     # Connection configurations (MongoDB)
│   ├── controllers/    # Route controllers logic
│   ├── middlewares/    # Middleware logic
│   ├── models          # Schema models
│   ├── routes          # Routes handler
│   └── utils           # Utility functions
├── .env                # Environment variables
├── app.js              # Main server code
└── package.json        # Project dependencies and scripts
```

---

## 6. Usage

- Make sure both backend and frontend servers are running.
- Open your browser and go to [http://localhost:4000](http://localhost:4000) to use the application.

---

## 7. License

The MIT License
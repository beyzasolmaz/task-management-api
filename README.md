 Task Management REST API

This project is a Task Management Backend API that allows users to manage their personal tasks securely.  
Users can register, log in, and perform CRUD operations on their own tasks.

The API is developed following RESTful principles and all endpoints are documented using Swagger for easy testing.



Project Purpose

The main objectives of this project are:

- Develop a secure authentication system
- Implement task management CRUD operations
- Manage data using MySQL database
- Document API endpoints using Swagger
- Maintain structured project documentation



Technologies Used

 Backend
- Node.js
- Express.js

 Database
- MySQL

 Authentication & Security
- JSON Web Token (JWT)
- bcrypt

API Documentation
- Swagger

 Tools
- Git & GitHub
- Postman



 Features

- User Registration & Login
- JWT Authentication
- Password Hashing with bcrypt
- Create Task
- Get All Tasks (User-based)
- Get Task by ID
- Update Task
- Delete Task
- Protected Routes
- Swagger API Documentation


 API Endpoints

Auth
- POST /api/auth/register
- POST /api/auth/login

Tasks
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id




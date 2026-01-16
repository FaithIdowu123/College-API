College API – Demo Version

A Node.js + Express REST API for managing students.
Supports CRUD operations, Joi validation, centralized error handling, and Swagger documentation.

Quick Setup

Clone Repository

git clone https://github.com/yourusername/college-api.git
cd college-api


Install Dependencies

npm install


Create .env File

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/college

Generate Swagger Docs

node swagger.js


Start Server

npm run dev


Server runs at: http://localhost:3000
Swagger UI: http://localhost:3000/api-docs ✅

🔹 Endpoints Overview
Method	Endpoint	Description
GET	/students	Get all students
GET	/students/:id	Get a student by ID
POST	/students	Create a new student
PUT	/students/:id	Update a student by ID
DELETE	/students/:id	Delete a student by ID
Example POST/PUT Body
{
  "firstName": "Faith",
  "lastName": "Idowu",
  "email": "faith@byui.edu",
  "studentId": "BYUI021",
  "major": "Software Development",
  "enrollmentYear": 2024,
  "isActive": true
}

🔹 Highlights for Demo

CRUD operations working live

Validation: sends all errors at once

Manual error handling via next(error)

Swagger UI: test endpoints interactively

URL to test endpoints: http://localhost:3000/api-docs

🔹 Notes

MongoDB must be running and .env configured correctly.

Use Swagger to quickly show GET, POST, PUT, DELETE during demo.
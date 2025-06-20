# 📚 Book Store API
A RESTful API built with Node.js, Express, and MongoDB to manage a collection of books. It supports creating, reading, updating, and deleting book entries.

## 🌐 Base URL
`http://localhost:5000/api/books`

## 📦 API Endpoints

### 🔍 Get All Books
- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Fetch all books from the database.
**Response:**
{
  "success": true,
  "books": [
    {
      "_id": "60f6b...",
      "title": "Atomic Habits",
      "author": "James Clear",
      "description": "An easy & proven way to build good habits.",
    }
  ]
}


### 📘 Add a New Book
- **Endpoint:** `/`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Description:** Add a new book to the collection.
**Request Body:**
{
  "title": "Deep Work",
  "author": "Cal Newport",
  "description": "Rules for focused success in a distracted world.",
}
**Response:**
{
  "success": true,
  "message": "Book added successfully",
  "book": {
    "_id": "60f6b...",
    "title": "Deep Work",
    "author": "Cal Newport",
    "description": "Rules for focused success in a distracted world.",
  }
}


### ✏️ Update a Book
- **Endpoint:** `/:id`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Description:** Update details of a specific book.
**Request Body (partial or full):**
{
  "title": "Deep Work (Updated Edition)"
}
**Response:**
{
  "success": true,
  "message": "Book updated successfully",
  "book": {
    "_id": "60f6b...",
    "title": "Deep Work (Updated Edition)",
    "author": "Cal Newport",
    "description": "Rules for focused success in a distracted world.",
  }
}


### ❌ Delete a Book
- **Endpoint:** `/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific book by ID.
**Response:**
{
  "success": true,
  "message": "Book deleted successfully"
}

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- dotenv

## 🔐 Environment Variables
Create a .env file inside the backend/ folder with the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore

## 🧪 Running the API Locally
1. Navigate to the backend directory:
cd backend

2. Install dependencies:
npm install

3. Start the development server:
npm run dev

4. 1. Navigate to the frontend directory:
cd frontend

5. Install dependencies:
npm install

6. Start the development server:
npm run dev

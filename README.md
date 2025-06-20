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
```json
{
  "success": true,
  "books": [
    {
      "_id": "60f6b...",
      "title": "Da Vinci Code",
      "author": "Dan Brown",
      "status": "pending",
    }
  ]
}
```


### 📘 Add a New Book
- **Endpoint:** `/`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Description:** Add a new book to the collection.

**Request Body:**
```json
{
  "title": "Murder On Orient Express",
  "author": "Agatha Christie",
  "status": "pending",
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book added successfully",
  "book": {
    "_id": "60f6b...",
    "title": "Murder On Orient Express",
    "author": "Agatha Christie",
    "status":"pending"
  }
}
```


### ✏️ Update a Book
- **Endpoint:** `/:id`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Description:** Update details of a specific book.

**Request Body (partial or full):**
```json
{
  "id":"60f6b"
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "book": {
    "_id": "60f6b...",
    "title": "Da Vinci Code",
    "author": "Dan Brown",
    "status": "completed",
  }
}
```


### ❌ Delete a Book
- **Endpoint:** `/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific book by ID.

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- dotenv

## 🔐 Environment Variables
Create a `.env` file inside the `backend/` folder with the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore
```

## 🧪 Running the API Locally
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Same for frontend
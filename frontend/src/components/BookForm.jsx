import React, { useState } from 'react';
import { useBookStore } from '../store/book.store.js';

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("pending");

  const { createBook, loading } = useBookStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook(title, author, status);
    setTitle("");
    setAuthor("");
    setStatus("pending");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a Book</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter the Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter the Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" disabled={loading} className="py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60">
          {loading ? "Submitting..." : "Submit"}
        </button>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
      </form>
    </div>
  );
};

export default BookForm;

import React, { useEffect } from 'react';
import { useBookStore } from '../store/book.store.js';

const statusClasses = {
  completed: 'bg-green-500 text-white px-2 py-1 rounded text-xs',
  pending: 'bg-yellow-400 text-gray-800 px-2 py-1 rounded text-xs',
};

const BookList = () => {
  const { books, toggleStatus, deleteBook, getBooks, loading } = useBookStore();

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Book List</h2>
      {books.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No books found.</div>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book._id} className="bg-white border border-gray-200 rounded-lg shadow flex items-center justify-between p-4">
              <div>
                <div className="font-semibold text-lg">{book.title}</div>
                <div className="text-gray-600 mb-1">by {book.author}</div>
                <span className={statusClasses[book.status] || statusClasses.pending}>{book.status}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(book)}
                  className="px-3 py-1 rounded bg-cyan-600 text-white hover:bg-cyan-700 transition"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this book?')) deleteBook(book._id);
                  }}
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;

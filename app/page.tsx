"use client";

import React, { useEffect, useState } from "react";
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    available: true,
  });

  // fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);
  const addBook = async () => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const addedBook = await response.json();
    setBooks([...books, addedBook]);
  };
  // Delete Book

  const deleteBook = async (id: number) => {
    const response = await fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Book List</h1>
      <div className="max-w-4xl mx-auto">
        {books.length === 0 ? (
          <p className="text-center text-lg">No books available</p>
        ) : (
          <ul className="space-y-4">
            {books.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100"
              >
                <div>
                  <h3 className="font-bold text-xl">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                </div>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Add book Form */}
      <div className="mt-8 max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center mb-4">
          <label className="mr-4">Available:</label>

          <input
            type="checkbox"
            checked={newBook.available}
            onChange={(e) =>
              setNewBook({ ...newBook, available: e.target.checked })
            }
            className=" h-5 w-5"
          />
        </div>
      </div>
      <button
        onClick={addBook}
        className=" w-full py-3
         bg-blue-500 text-white  rounded-lg hover:bg-blue-700"
      >
        Add Book
      </button>
    </div>
  );
};
export default Page;

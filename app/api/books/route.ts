import { NextResponse } from "next/server";

let books = [
  { id: 1, title: "Harry Potter", author: "J.K.Rowling", available: true },
];
export async function GET() {
  try {
    console.log("books arry:", books);
    return NextResponse.json(books, { status: 200 });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Error fetching books" },
      { status: 500 }
    );
  }
}

// post
export async function POST(request: Request) {
  try {
    const newBook = await request.json();
    console.log(newBook);
    const maxId = books.length> 0 ? Math.max(...books.map((book) => book.id)) : 0;
    newBook.id = maxId + 1;
    books.push(newBook);
    return NextResponse.json(newBook, { status: 201 });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Error adding new book" },
      { status: 500 }
    );
  }
}

// put function
export async function PUT(request: Request) {
  try {
    const { id, title, author, available } = await request.json();
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID is required" },
        { status: 400 }
      );
    }

    const book = books.find((b) => b.id === id);
    if (book) {
      book.title = title;
      book.author = author;

      book.available = available;
      return NextResponse.json(book, { status: 200 });
    }
    return NextResponse.json(
      { status: "error", message: "Book not found" },
      { status: 404 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Error updating the book" },

      { status: 500 }
    );
  }
}

// delete function
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID is required" },
        { status: 400 }
      );
    }

    books = books.filter((b) => b.id !== id);
    return NextResponse.json(
      { status: "success", message: "Book deleted" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Error deleting the book" },

      { status: 500 }
    );
  }
}

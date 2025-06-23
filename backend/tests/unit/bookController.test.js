import {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../../controllers/book.controller.js";
import Book from "../../models/books.model.js";

jest.mock("../../models/books.model.js", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

describe("Book Controller", () => {
  let res;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // getBooks
  it("should return all books", async () => {
    const req = {};
    const mockBooks = [{ title: "Mock Book" }];
    Book.find.mockResolvedValue(mockBooks);
    await getBooks(req, res);
    expect(Book.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Books found",
      books: mockBooks,
    });
  });
  it("should handle errors in getBooks", async () => {
    const req = {};
    Book.find.mockRejectedValue(new Error("DB error"));
    await getBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });

  // createBook
  it("should create a book", async () => {
    const req = { body: { author: "A", title: "T", status: "pending" } };
    const mockBook = { author: "A", title: "T", status: "pending" };
    Book.create.mockResolvedValue(mockBook);
    await createBook(req, res);
    expect(Book.create).toHaveBeenCalledWith({
      author: "A",
      title: "T",
      status: "pending",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Book created",
      book: mockBook,
    });
  });
  it("should handle missing fields in createBook", async () => {
    const req = { body: { author: "", title: "" } };
    await createBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });
  it("should handle errors in createBook", async () => {
    const req = { body: { author: "A", title: "T", status: "pending" } };
    Book.create.mockRejectedValue(new Error("DB error"));
    await createBook(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });

  // updateBook
  it("should update a book", async () => {
    const req = {
      params: { id: "123" },
      body: { title: "Updated", author: "A", status: "completed" },
    };
    const updatedBook = {
      _id: "123",
      title: "Updated",
      author: "A",
      status: "completed",
    };
    Book.findByIdAndUpdate.mockResolvedValue(updatedBook);
    await updateBook(req, res);
    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { title: "Updated", author: "A", status: "completed" },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Book Updated",
      updatedBook,
    });
  });
  it("should handle errors in updateBook", async () => {
    const req = {
      params: { id: "123" },
      body: { title: "Updated", author: "A", status: "completed" },
    };
    Book.findByIdAndUpdate.mockRejectedValue(new Error("DB error"));
    await updateBook(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });

  // deleteBook
  it("should delete a book", async () => {
    const req = { params: { id: "123" } };
    Book.findByIdAndDelete.mockResolvedValue({});
    await deleteBook(req, res);
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Book deleted" });
  });
  it("should handle errors in deleteBook", async () => {
    const req = { params: { id: "123" } };
    Book.findByIdAndDelete.mockRejectedValue(new Error("DB error"));
    await deleteBook(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});

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

  it("should delete a book", async () => {
    const req = { params: { id: "123" } };
    Book.findByIdAndDelete.mockResolvedValue({});
    await deleteBook(req, res);
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Book deleted" });
  });
});

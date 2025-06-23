import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Book from "../../models/books.model.js";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await Book.deleteMany();
});

test("can save a book to the database", async () => {
  const book = new Book({ title: "Test DB Book", author: "Tester" });
  const saved = await book.save();

  expect(saved.title).toBe("Test DB Book");
});

import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import Book from "../../models/books.model.js";
import app from "../../app.js";

let mongo, request, server;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  server = app.listen(0); // random free port
  request = supertest(server);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
  server.close();
});

beforeEach(async () => {
  await Book.deleteMany();
});

test("GET /api/books should return empty array initially", async () => {
  const res = await request.get("/api/books");
  expect(res.status).toBe(200);
  expect(res.body.books).toEqual([]);
});

import express from "express";
import bookRoutes from "./routes/book.route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);

export default app;

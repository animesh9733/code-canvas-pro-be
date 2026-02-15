import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import snippetRoutes from "./routes/snippetRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import suggestionRoutes from "./routes/suggestionRoutes";

dotenv.config();

const PORT = process.env.PORT || 5100;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/snippets", snippetRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/suggestions", suggestionRoutes);

app.get("/health", (_, res: Response) => {
  res.json({ status: "ok" });
});

async function startServer() {
  try {
    // Check DB connection
    await connectDB();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database");
    console.error(error);
    process.exit(1); // Stop server if DB fails
  }
}

startServer();

export default app;

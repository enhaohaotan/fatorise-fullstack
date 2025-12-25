import express from "express";
import { healthRouter } from "./routes/health.routes.js";
import { errroMiddeleware } from "./middlewares/error.middlewares.js";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { tasksRouter } from "./routes/tasks.routes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/auth", authRouter);
  app.use("/tasks", tasksRouter);

  app.use(errroMiddeleware);

  return app;
}

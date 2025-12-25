import {
  CreateTaskBodySchema,
  TaskIdParamsSchema,
  UpdateTaskBodySchema,
} from "./../validaiton/task.schemas.js";
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middelwares.js";
import * as TaskController from "../controllers/task.controllers.js";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middlewares.js";

export const tasksRouter = Router();

tasksRouter.use(requireAuth);

tasksRouter.get("/", TaskController.getTasks);
tasksRouter.post(
  "/",
  validateBody(CreateTaskBodySchema),
  TaskController.postTask
);
tasksRouter.patch(
  "/:id",
  validateParams(TaskIdParamsSchema),
  validateBody(UpdateTaskBodySchema),
  TaskController.patchTask
);
tasksRouter.delete(
  "/:id",
  validateParams(TaskIdParamsSchema),
  TaskController.deleteTask
);

export default tasksRouter;

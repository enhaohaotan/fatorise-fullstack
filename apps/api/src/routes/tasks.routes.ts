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
import { asyncHandler } from "../utils/asyncHandler.js";

export const tasksRouter = Router();

tasksRouter.use(requireAuth);

tasksRouter.get("/", asyncHandler(TaskController.getTasks));
tasksRouter.post(
  "/",
  validateBody(CreateTaskBodySchema),
  asyncHandler(TaskController.postTask)
);
tasksRouter.patch(
  "/:id",
  validateParams(TaskIdParamsSchema),
  validateBody(UpdateTaskBodySchema),
  asyncHandler(TaskController.patchTask)
);
tasksRouter.delete(
  "/:id",
  validateParams(TaskIdParamsSchema),
  asyncHandler(TaskController.deleteTask)
);
tasksRouter.get(
  "/:id",
  validateParams(TaskIdParamsSchema),
  asyncHandler(TaskController.getTaskInfo)
);

export default tasksRouter;

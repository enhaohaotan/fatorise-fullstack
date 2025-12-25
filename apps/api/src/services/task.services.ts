import { prisma } from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import { HttpError } from "../utils/httpError.js";
import type {
  CreateTaskBody,
  UpdateTaskBody,
} from "../validaiton/task.schemas.js";

export async function listTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(userId: string, input: CreateTaskBody) {
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description ?? null,
      completed: false,
      userId,
    },
  });
}

export async function updateTask(
  userId: string,
  id: string,
  input: UpdateTaskBody
) {
  const data: Prisma.TaskUpdateManyMutationInput = {};
  if (input.title !== undefined) data.title = input.title;
  if (input.completed !== undefined) data.completed = input.completed;
  if (input.description !== undefined) data.description = input.description;

  return prisma.$transaction(async (tx) => {
    const result = await tx.task.updateMany({
      where: { id, userId },
      data,
    });

    if (result.count === 0) {
      throw new HttpError(404, "NOT_FOUND", "Task not found");
    }
    return tx.task.findFirstOrThrow({
      where: { id, userId },
    });
  });
}

export async function deleteTask(userId: string, id: string) {
  const result = await prisma.task.deleteMany({
    where: { id, userId },
  });

  if (result.count === 0) {
    throw new HttpError(404, "NOT_FOUND", "Task not found");
  }

  return true;
}

import {
  CreateTaskBody,
  TaskDto,
  TaskDtoSchema,
  TaskId,
  TaskIdParamsSchema,
  UpdateTaskBody,
} from "@repo/shared";
import { ClientError } from "../utils/clientError";
import { getToken } from "../utils/token";
import { request } from "./client";
import * as z from "zod";

export async function getTasks() {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "You need to sign in first.");
  }
  return request<TaskDto[]>("/tasks", TaskDtoSchema.array(), { token });
}

export async function getTask(id: string) {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "You need to sign in first.");
  }
  return request<TaskDto>(`/tasks/${id}`, TaskDtoSchema, { token });
}

export async function updateTask(input: UpdateTaskBody, id: string) {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "You need to sign in first.");
  }
  return request<TaskDto>(`/tasks/${id}`, TaskDtoSchema, {
    method: "PATCH",
    body: input,
    token,
  });
}

export async function createTask(input: CreateTaskBody) {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "You need to sign in first.");
  }
  return request<TaskDto>(`/tasks`, TaskDtoSchema, {
    method: "POST",
    body: input,
    token,
  });
}

export async function deleteTask(id: string) {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "You need to sign in first.");
  }
  return request(`/tasks/${id}`, z.void(), {
    method: "DELETE",
    token,
  });
}

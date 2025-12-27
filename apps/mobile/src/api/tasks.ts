import { TaskDto, TaskDtoSchema } from "@repo/shared";
import { ClientError } from "../utils/clientError";
import { getToken } from "../utils/token";
import { request } from "./client";

export async function getTasks() {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "You need to sign in first.");
  }
  return request<TaskDto[]>("/tasks", TaskDtoSchema.array(), { token });
}

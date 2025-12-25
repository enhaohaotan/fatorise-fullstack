import type { Request, Response } from "express";
import * as Task from "../services/task.services.js";

export async function getTasks(req: Request, res: Response) {
  const tasks = await Task.listTasks(req.user!.id);
  res.status(200).json({ data: tasks });
}

export async function postTask(req: Request, res: Response) {
  const task = await Task.createTask(req.user!.id, req.body);
  res.status(201).json({ data: task });
}

export async function patchTask(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const updated = await Task.updateTask(req.user!.id, id, req.body);
  res.status(200).json({ data: updated });
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  await Task.deleteTask(req.user!.id, id);
  res.status(204).send();
}

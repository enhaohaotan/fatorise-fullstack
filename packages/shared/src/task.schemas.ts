import { z } from "zod";

export const TaskDtoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).nullable(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskDtoSchema>;

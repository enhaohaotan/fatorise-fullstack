import * as z from "zod";

export const TaskIdParamsSchema = z
  .object({
    taskId: z.uuid(),
  })
  .strict();

/**
 * CREATE: Only trim whitespace. Do NOT convert "" to null here.
 */
const CreateTitleBodySchema = z.preprocess(
  (v) => (typeof v === "string" ? v.trim() : v),
  z.string().min(1).max(255)
);

/**
 * UPDATE title: Supports keep / set
 * - undefined: keep (no change)
 * - string: set to a new value (trimmed, must be non-empty)
 * - null / "" / whitespace-only: NOT allowed
 */
const UpdateTitleBodySchema = z.preprocess((v) => {
  if (v === undefined) return undefined;
  if (typeof v === "string") return v.trim();
  return v;
}, z.string().min(1).max(255).optional());

/**
 * CREATE / UPDATE description: Supports keep / clear / set
 * - undefined: keep (no change)
 * - null / "" / whitespace-only: clear
 * - string: set to a new value
 * keep and clear are the same when in CREATE.
 */
const DescriptionBodySchema = z.preprocess((v) => {
  if (v === undefined || v === null) return v;
  if (typeof v !== "string") return v;
  const s = v.trim();
  return s === "" ? null : s;
}, z.string().max(1000).nullable().optional());

// POST /tasks
export const CreateTaskBodySchema = z
  .object({
    title: CreateTitleBodySchema,
    description: DescriptionBodySchema,
  })
  .strict();

// PATCH /tasks/:taskId
export const UpdateTaskBodySchema = z
  .object({
    title: UpdateTitleBodySchema,
    description: DescriptionBodySchema,
    completed: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export type CreateTaskBody = z.infer<typeof CreateTaskBodySchema>;
export type UpdateTaskBody = z.infer<typeof UpdateTaskBodySchema>;

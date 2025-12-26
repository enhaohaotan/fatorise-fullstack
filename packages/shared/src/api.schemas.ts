import { z } from "zod";

export const ApiErrorPayloadSchema = z.object({
  status: z.number().int().min(100).max(599),
  code: z.string().min(1),
  message: z.string().min(1),
  details: z.unknown().optional(),
});

export function ApiEnvelopeSchema<T>(dataSchema: z.ZodType<T>) {
  return z.union([
    z.object({ data: dataSchema }),
    z.object({ error: ApiErrorPayloadSchema }),
  ]);
}

export type ApiErrorPayload = z.infer<typeof ApiErrorPayloadSchema>;

import { z } from "zod";

export const ApiErrorBodySchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  details: z.unknown().optional(),
});

export function ApiEnvelopeSchema<T>(dataSchema: z.ZodType<T>) {
  return z.union([
    z.object({ data: dataSchema }),
    z.object({ error: ApiErrorBodySchema }),
  ]);
}

export type ApiErrorBody = z.infer<typeof ApiErrorBodySchema>;
export type ApiErrorPayload = ApiErrorBody & {
  status: number;
};

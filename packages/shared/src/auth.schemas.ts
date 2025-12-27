import { z } from "zod";

export const SignUpBodySchema = z
  .object({
    email: z.preprocess(
      (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
      z.email()
    ),
    password: z.string().min(6).max(127),

    // Trim whitespace; convert empty string to undefined
    name: z.preprocess((v) => {
      if (v === undefined) return undefined;
      if (typeof v !== "string") return v;
      const s = v.trim();
      return s === "" ? undefined : s;
    }, z.string().min(1).max(255).optional()),
  })
  .strict();

export const SignInBodySchema = z
  .object({
    email: z.preprocess(
      (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
      z.email()
    ),
    password: z.string().min(6).max(127),
  })
  .strict();

export const AuthDtoSchema = z.object({
  token: z.string().min(1),
  user: z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string().max(255).nullable(),
  }),
});

export const MeDtoSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().max(255).nullable(),
});

export type SignUpBody = z.infer<typeof SignUpBodySchema>;
export type SignInBody = z.infer<typeof SignInBodySchema>;
export type AuthDto = z.infer<typeof AuthDtoSchema>;
export type MeDto = z.infer<typeof MeDtoSchema>;

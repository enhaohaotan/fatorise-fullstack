import * as z from "zod";

export const SignUpBodySchema = z
  .object({
    email: z.preprocess(
      (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
      z.email()
    ),
    password: z.string(),

    // Trim whitespace; convert empty string to undefined
    name: z.preprocess((v) => {
      if (v === undefined) return undefined;
      if (typeof v !== "string") return v;
      const s = v.trim();
      return s === "" ? undefined : s;
    }, z.string().optional()),
  })
  .strict();

export const SignInBodySchema = z
  .object({
    email: z.preprocess(
      (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
      z.email()
    ),
    password: z.string(),
  })
  .strict();

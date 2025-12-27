import { prisma } from "../db/prisma.js";
import type { SignInBody, SignUpBody } from "../validaiton/user.schemas.js";
import bcrypt from "bcrypt";
import { HttpError } from "../utils/httpError.js";

export async function signUp(input: SignUpBody) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    throw new HttpError(409, "USER_ALREADY_EXISTS", "User already exists");
  }

  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(input.password, 12);
  return prisma.user.create({
    data: {
      email: input.email,
      passwordHash: passwordHash,
      name: input.name ?? null,
    },
  });
}

export async function signIn(input: SignInBody) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  // Security: prevent account enumeration via timing attacks.
  const hashToCompare = user?.passwordHash ?? process.env.DUMMY_BCRYPT_HASH!;
  const ok = await bcrypt.compare(input.password, hashToCompare);
  if (!user || !ok) {
    throw new HttpError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email or password"
    );
  }
  return user;
}

export async function userInfo(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new HttpError(404, "NOT_FOUND", "User not found");
  }
  return user;
}

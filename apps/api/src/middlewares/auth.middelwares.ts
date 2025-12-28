import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { HttpError } from "../utils/httpError.js";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new HttpError(401, "UNAUTHORIZED", "Missing Bearer token"));
  }
  const token = header.slice("Bearer ".length).trim();
  try {
    const payload = await verifyAccessToken(token);
    req.user = { id: payload.sub! };
    next();
  } catch {
    return next(
      new HttpError(
        401,
        "UNAUTHORIZED",
        "Invalid or expired token, please sign in again"
      )
    );
  }
}

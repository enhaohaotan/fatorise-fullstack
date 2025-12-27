import type { Request, Response } from "express";
import * as Auth from "../services/auth.services.js";
import { signAccessToken } from "../utils/jwt.js";

export async function postUserSignUp(req: Request, res: Response) {
  const user = await Auth.signUp(req.body);
  const token = await signAccessToken({ sub: user.id });
  res.status(201).json({
    data: {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    },
  });
}

export async function postUserSignIn(req: Request, res: Response) {
  const user = await Auth.signIn(req.body);
  const token = await signAccessToken({ sub: user.id });
  res.status(200).json({
    data: {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    },
  });
}

export async function getMe(req: Request, res: Response) {
  const user = await Auth.userInfo(req.user!.id);
  res.status(200).json({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}

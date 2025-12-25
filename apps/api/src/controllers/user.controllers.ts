import type { Request, Response } from "express";
import * as UserService from "../services/user.services.js";

export async function postUserSignUp(req: Request, res: Response) {
  const created = await UserService.signUp(req.body);
  res.status(201).json({ data: created });
}

export async function postUserSignIn(req: Request, res: Response) {
  const user = await UserService.signIn(req.body);
  res.status(200).json({ data: user });
}

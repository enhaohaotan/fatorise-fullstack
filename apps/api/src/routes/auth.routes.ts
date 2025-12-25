import { Router } from "express";
import { validateBody } from "../middlewares/validate.middlewares.js";
import {
  SignInBodySchema,
  SignUpBodySchema,
} from "../validaiton/user.schemas.js";
import * as UserController from "../controllers/user.controllers.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(SignUpBodySchema),
  UserController.postUserSignUp
);
authRouter.post(
  "/signin",
  validateBody(SignInBodySchema),
  UserController.postUserSignIn
);

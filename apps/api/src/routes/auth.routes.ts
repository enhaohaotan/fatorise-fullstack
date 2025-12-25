import { Router } from "express";
import { validateBody } from "../middlewares/validate.middlewares.js";
import {
  SignInBodySchema,
  SignUpBodySchema,
} from "../validaiton/user.schemas.js";
import * as UserController from "../controllers/auth.controllers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(SignUpBodySchema),
  asyncHandler(UserController.postUserSignUp)
);

authRouter.post(
  "/signin",
  validateBody(SignInBodySchema),
  asyncHandler(UserController.postUserSignIn)
);

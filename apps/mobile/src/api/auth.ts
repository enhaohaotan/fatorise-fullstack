import {
  AuthDto,
  AuthDtoSchema,
  MeDto,
  MeDtoSchema,
  SignInBody,
  SignUpBody,
} from "@repo/shared";
import { request } from "./client";
import { getToken } from "../utils/token";
import { ClientError } from "../utils/clientError";

export async function signUp(input: SignUpBody) {
  return request<AuthDto>("/auth/signup", AuthDtoSchema, {
    method: "POST",
    body: input,
  });
}

export async function signIn(input: SignInBody) {
  return request<AuthDto>("/auth/signin", AuthDtoSchema, {
    method: "POST",
    body: input,
  });
}

export async function getMe() {
  const token = await getToken();
  if (!token) {
    throw new ClientError("NO_TOKEN", "Missing access token.");
  }
  return request<MeDto>("/auth/me", MeDtoSchema, { token });
}

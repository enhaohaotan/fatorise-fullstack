import { AuthDto, AuthDtoSchema, SignInBody, SignUpBody } from "@repo/shared";
import { request } from "./client";

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

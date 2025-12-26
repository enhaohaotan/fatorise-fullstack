import { ApiEnvelopeSchema } from "@repo/shared";
import { z } from "zod";
import { ApiError } from "../utils/apiErrpr";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
};

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function parseJsonSafe(res: Response) {
  if (res.status === 204) return undefined;
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;
  return res.json();
}

export async function request<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const payload = await parseJsonSafe(res);
  const parsed = ApiEnvelopeSchema(schema).safeParse(payload);
  if (!parsed.success) {
    throw new ApiError({
      status: res.status,
      code: "INVALID_API_RESPONSE",
      message: "Received invalid response from server.",
      details: parsed.error.issues,
    });
  }
  if ("error" in parsed.data) {
    throw new ApiError(parsed.data.error);
  }
  return parsed.data.data;
}

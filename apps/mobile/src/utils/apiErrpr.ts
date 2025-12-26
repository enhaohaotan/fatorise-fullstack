import { ApiErrorPayload } from "@repo/shared";

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message ?? "Request failed");
    this.status = payload.status;
    this.code = payload.code;
    this.details = payload.details;
  }
}

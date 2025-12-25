import type { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
}

export function validateQuery(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.query = schema.parse(req.query) as ParsedQs;
    next();
  };
}

export function validateParams(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.params = schema.parse(req.params) as unknown as ParamsDictionary;
    next();
  };
}

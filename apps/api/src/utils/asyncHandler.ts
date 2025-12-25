/**
 * asyncHandler - Express middleware wrapper for async route handlers.
 *
 * This utility allows you to write async/await route handlers without
 * manually writing try/catch blocks. Any error thrown or rejected promise
 * will be automatically passed to Express's error handling middleware.
 *
 * Usage:
 *   router.get('/path', asyncHandler(async (req, res) => { ... }))
 */
import type { RequestHandler } from "express";

export function asyncHandler(fn: RequestHandler): RequestHandler {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

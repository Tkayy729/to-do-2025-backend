// Centralized error handler so routes stay clean
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const body = {
    message: err.publicMessage || "Internal Server error",
    code: err.code || undefined,
  };

  // In dev, include minimal debug info (never in prod)
  if (process.env.NODE_ENV != "production") {
    body.debug = { stack: err.stack };
  }
  res.status(status).json(body);
}

// Small helper to wrap async route handlers
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// A light custom error you can throw from services/controllers
export class HttpError extends Error {
  constructor(status, publicMessage, code) {
    super(publicMessage);
    this.status = status;
    this.publicMessage = publicMessage;
    this.code = code;
  }
}

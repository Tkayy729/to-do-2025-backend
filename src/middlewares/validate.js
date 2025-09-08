// Zod-based request validation middleware
export const validate = (schema) => (req, _res, next) => {
  const data = {
    body: req.body,
    params: req.params,
    query: req.query,
  };
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    // 400 Bad Request with readable errors
    return next({
      status: 400,
      publicMessage: "Validation failed",
      code: "VALIDATION_ERROR",
      details: issues,
    });
  }
  // attach parsed data in case you want to use it downstream
  req.valid = result.data;
  next();
};

// server/src/middleware/errorHandler.js

/**
 * Centralized error handler
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

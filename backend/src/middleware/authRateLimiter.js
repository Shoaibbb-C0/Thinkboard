import rateLimit from "express-rate-limit";

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message:
      "Too many authentication attempts. Try again in 15 minutes.",
  },
});

export default authRateLimiter;
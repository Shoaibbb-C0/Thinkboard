import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier =
      req.user?._id?.toString() || req.ip;

    const result = await ratelimit.limit(identifier);

    res.setHeader(
      "X-RateLimit-Limit",
      result.limit
    );

    res.setHeader(
      "X-RateLimit-Remaining",
      result.remaining
    );

    if (!result.success) {
      return res.status(429).json({
        message:
          "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate-limit error:", error);

    // Keep the app available if Upstash temporarily fails
    next();
  }
};

export default rateLimiter;
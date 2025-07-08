import rateLimit from 'express-rate-limit';

export const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'You have exceeded the number of requests permitted! Please wait a while and try again!',
  standardHeaders: true,
  legacyHeaders: false,
});

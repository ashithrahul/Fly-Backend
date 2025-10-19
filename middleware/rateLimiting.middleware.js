class RateLimiter {
  constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = new Map();
    
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  isAllowed(ip) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }
    
    const userRequests = this.requests.get(ip);
    
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(ip, recentRequests);
    
    return true;
  }

  cleanup() {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    for (const [ip, requests] of this.requests.entries()) {
      const recentRequests = requests.filter(time => time > windowStart);
      if (recentRequests.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, recentRequests);
      }
    }
  }
}

const rateLimiter = new RateLimiter(5 * 60 * 1000, 500);  // 500 request for every 5 minutes per each ip

export const rateLimitSearch = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];

  if (!rateLimiter.isAllowed(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many search requests. Please try again later.',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }
  
  next();
};

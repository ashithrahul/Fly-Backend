//CORS Middleware
const corsMiddleware = (req, res, next) => {
  // Define allowed origins for CORS which bypass only the requested from this endpoint
  const allowedOrigins = [
    'http://54.237.209.95',
    'https://54.237.209.95',
    'http://13.201.225.228',  
    'https://13.201.225.228',    
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
  ]

  const origin = req.headers.origin;

  // Allow origin if it's in the whitelist
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

export default corsMiddleware;
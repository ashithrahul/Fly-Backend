const corsMiddleware = (req, res, next) => {
  const allowedOrigins = [
    'http://54.237.209.95',
    'https://54.237.209.95',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
  ]

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

export default corsMiddleware;
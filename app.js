import express from 'express';
import searchRoutes from './routes/search.routes.js';

const PORT = process.env.PORT || 1001;

function startServer() {
  const app = express();

  app.use('/api', searchRoutes);

  app.listen(PORT, err => {
    if (err) {
      console.error(err);
      return;
    }

  });
}


startServer();
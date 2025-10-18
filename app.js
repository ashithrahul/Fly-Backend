import express from 'express';
import searchRoutes from './routes/search.routes.js';
import sequelize from './utils/db.utils.js';
import Search from './models/search.model.js';

const PORT = process.env.PORT || 1001;

function startServer() {
  const app = express();

  app.use('/api', searchRoutes);

  sequelize.authenticate()
    .then(() => {
      console.log('Database connected successfully');
      return sequelize.sync({ force: true }); 
    })
    .then(() => {
      console.log('Database sync happened');
      app.listen(PORT, () => {
        console.log(`Server listen to port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('not able to connect to database:', err);
      process.exit(1);
    });
}


startServer();
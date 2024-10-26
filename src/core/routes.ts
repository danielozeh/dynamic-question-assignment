import { Express } from 'express';
import questionRoutes from '../routes/questionRoutes';

const setupRoutes = (app: Express): void => {
  app.use('/api', questionRoutes);
};

export default setupRoutes;

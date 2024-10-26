import express from 'express';
import dotenv from 'dotenv';
import connectDB from './core/db';
import setupRoutes from './core/routes';
import './cron/assignQuestionsCron';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Set up routes
setupRoutes(app);

export default app;

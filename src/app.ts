import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
// import blogRoutes from './routes/blog';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route authentication
app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);

export default app;

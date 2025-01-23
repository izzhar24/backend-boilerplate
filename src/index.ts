import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
// import blogRoutes from './routes/blog';

import sequelize from './config/database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route authentication
app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);


const PORT = process.env.PORT || 3000;

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log('Database connection error:', err));

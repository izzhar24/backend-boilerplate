import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'test_db',
    process.env.DB_USER || 'user',
    process.env.DB_PASS || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        port:Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: console.log, // Nonaktifkan logging untuk pengujian
    });

export default sequelize;

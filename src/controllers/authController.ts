import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';

const SECRET_KEY = process.env.SECRET_KEY!;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY!;
const JWT_EXPIRATION = '15m';
const REFRESH_EXPIRATION = '7d';

// Register user
export const register = async (req: Request, res: Response): Promise<any> =>{
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
};

// Login user
export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: JWT_EXPIRATION });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: REFRESH_EXPIRATION });

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({ accessToken, refreshToken });
};

// Refresh token
export const refreshToken = async (req: Request, res: Response): Promise<any> => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(403).json({ message: 'Refresh token required' });

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as { id: number };
        const user = await User.findByPk(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: JWT_EXPIRATION });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};

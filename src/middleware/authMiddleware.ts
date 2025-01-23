import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        req.user = decoded; // Assuming `decoded` contains user information
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

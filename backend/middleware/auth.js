// middleware/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expects: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

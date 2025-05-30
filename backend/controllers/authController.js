import bcrypt from 'bcrypt';
import { db } from '../db.js';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await db();

        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        await connection.end();

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

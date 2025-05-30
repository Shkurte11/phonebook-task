import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {

                // ✅ Store token
                if (data.token) {
                    localStorage.setItem('token', data.token);
                } else {
                    // fallback dummy flag if token not provided (shouldn't happen if backend is set up right)
                    localStorage.setItem('token', 'true');
                }

                setMessage('');
                navigate('/');
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('Login failed');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>Login</Typography>

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
                Login
            </Button>

            {message && (
                <Typography color="error" mt={2}>{message}</Typography>
            )}

            <Typography mt={2}>
                New User? <Link to="/sign-up">Register Here</Link>
            </Typography>
        </Box>
    );
}

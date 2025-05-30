import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = { email: '', password: '', confirmPassword: '' };

        if (!emailRegex.test(email)) newErrors.email = 'Email is not valid';
        if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        return !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            setResponseMessage(data.message || 'User registered successfully');
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            setResponseMessage('Registration failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
                <Typography variant="h5" gutterBottom>Register</Typography>

                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                        disabled={!email || !password || !confirmPassword}
                    >
                        Sign Up
                    </Button>
                </Box>

                {responseMessage && (
                    <Typography color="error" mt={2}>{responseMessage}</Typography>
                )}

                <Typography mt={2}>
                    Already signed up? <Link to="/login">Log in here.</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default SignUp;

"use client";
import { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Alert,
    CircularProgress
} from '@mui/material';

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Username': credentials.username,
                    'X-Password': credentials.password
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Store auth credentials for future requests
                localStorage.setItem('authCredentials', data.authCredentials);
                setMessage('Login successful!');
                setIsSuccess(true);
                
                // You might want to redirect here
                // window.location.href = '/dashboard';
            } else {
                setMessage(data.error || 'Invalid credentials');
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
            setIsSuccess(false);
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>

                <Box component="div" sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        margin="normal"
                        required
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        margin="normal"
                        required
                        disabled={loading}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>

                    {message && (
                        <Alert 
                            severity={isSuccess ? 'success' : 'error'} 
                            sx={{ mt: 2 }}
                        >
                            {message}
                        </Alert>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
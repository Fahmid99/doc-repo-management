"use client";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setMessage("");

    // ✅ Use login from useAuth instead of direct fetch
    const success = await login(credentials.username, credentials.password);


    if (success) {
      setMessage("Login successful!");
      setIsSuccess(true);
      window.location.href = "/dashboard";
    } else {
      setMessage("Invalid credentials");
      setIsSuccess(false);
    }

    setLoading(false);
  };

  return (
    <Box
      key="login-form"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
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
            onKeyDown={handleKeyPress}
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
            onKeyDown={handleKeyPress}
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
              "Login"
            )}
          </Button>

          {message && (
            <Alert severity={isSuccess ? "success" : "error"} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../AppContext"; // Assuming this is your AppContext file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success", "error", "warning", or "info"
  });

  const { setUserData, setLoggedIn } = useAppContext(); // Accessing the context to set user data
  const navigate = useNavigate(); // Hook to navigate after successful login

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://agry.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setUserData(result.user); // Save user data to the context
        setLoggedIn(true);
        setSnackbar({
          open: true,
          message: "Login successful! Redirecting to the homepage.",
          severity: "success",
        });
        setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Login failed. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setSnackbar({
        open: true,
        message: "An unexpected error occurred. Please try again later.",
        severity: "error",
      });
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleGoBack = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Button sx={{ margin: "10px" }} onClick={handleGoBack}>
        Go Back
      </Button>
      <Container
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f6f8",
          backgroundImage: "url(bg.jpg)", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px",
        }}
      >
        <Paper
          sx={{
            padding: 4,
            maxWidth: "400px",
            width: "100%",
            borderRadius: "10px",
            boxShadow: 3,
            backgroundColor: "rgba(250, 250, 250,0.5)", // Semi-transparent white background
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontWeight: "bold",
              color: "green",
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                color="white"
              />
              <TextField
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                color="white"
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: 2,
                  backgroundColor: "green",
                  color: "#fff",
                  "&:hover": { backgroundColor: "darkgreen" },
                }}
                fullWidth
              >
                Login
              </Button>
              <Typography variant="body1" paragraph>
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none", color: "green" }}>
                  Signup
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;

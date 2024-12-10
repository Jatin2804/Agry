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
import { useNavigate ,Link} from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success", "error", "warning", or "info"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Signup successful! Redirecting to login page.",
          severity: "success",
        });
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else if (response.status === 400 && result.error === "User already exists") {
        setSnackbar({
          open: true,
          message: "User already exists! Redirecting to login page.",
          severity: "info",
        });
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setSnackbar({
          open: true,
          message: result.error || "Signup failed. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
    navigate("/"); // Navigate back to the home page
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
            backgroundColor: "rgba(250, 250, 250,0.5)", // Semi-transparent white background to ensure readability
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
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
                color="white"
              />
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
                Signup
              </Button>
              <Typography variant="body1" paragraph>
                Don't have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none", color: "green" }}>
                  Login
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
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;

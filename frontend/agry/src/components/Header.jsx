import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

const Header = () => {
  const { loggedIn, userData, setUserData, setLoggedIn } = useAppContext();
  const navigate = useNavigate();

  const userName = userData.username;

  const handleLogout = () => {
    setUserData([]); // Reset user data
    setLoggedIn(false); // Set logged-in status to false
    localStorage.clear(); // Optionally clear local storage for persistence
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Box sx={{ textAlign: "center", padding: "10px", height: "fit-content" }}>
      {/* Logo and Name Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Logo Image */}
        <img
          src="/logo.png" // TODO: Replace with your logo path
          alt="Logo"
          style={{ width: "150px", height: "150px", marginBottom: "10px" }}
        />

        <Box>
          {/* Main Title */}
          <Typography variant="h4" sx={{ color: "green", fontWeight: "bold" }}>
            Agry {/* TODO: Replace with your logo name */}
          </Typography>

          {/* Tagline Text */}
          <Typography variant="subtitle1" sx={{ color: "gray" }}>
            Empowering Farmers with Knowledge and Resources
          </Typography>
        </Box>
      </Box>

      {/* Login/Signup or User Info Section */}
      {!loggedIn ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ color: "green", borderColor: "green" }}>
              Login/Signup
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Avatar Component */}
          <Avatar sx={{ bgcolor: "green" }}>
            {userName ? userName[0].toUpperCase() : "U"}
          </Avatar>
          {/* Display Username */}
          <Typography variant="subtitle1">
            {userName ? userName : "User"}
          </Typography>
          {/* Logout Button */}
          <Button
            variant="outlined"
            sx={{ color: "green", borderColor: "green" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;

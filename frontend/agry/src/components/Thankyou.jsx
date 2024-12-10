import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Thankyou = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box 
        sx={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <Typography 
          variant="h4" 
          style={{ color: "green", fontWeight: "bold", marginBottom: "20px" }}
        >
          Thank You for Shopping with Agry!
        </Typography>

        <Typography 
          variant="body1" 
          style={{ color: "#555", marginBottom: "20px" }}
        >
          Your payment was successful. We appreciate your purchase and look forward to serving you again!
        </Typography>

        {/* Go to Home Button */}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ width: "200px", backgroundColor: "green", marginTop: "20px" }}
          onClick={handleGoHome}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Thankyou;

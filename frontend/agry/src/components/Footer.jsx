import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "green",
        color: "white",
        padding: "20px 20px",
        marginTop: "auto", // Ensure footer stays at the bottom
      }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {/* Left Section: Company Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Agry
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "8px" }}>
            Empowering Farmers with Knowledge and Resources.
          </Typography>
        </Grid>

        {/* Middle Section: Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ marginTop: "8px" }}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <br />
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
            <br />
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Right Section: Contact Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "8px" }}>
            Email: info@agry.com
            <br />
            Phone: +1 (555) 123-4567
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Section: Copyright */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20px",
          borderTop: "1px solid white",
          paddingTop: "10px",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Agry. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

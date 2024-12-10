import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { Card, CardContent, CardMedia, Grid, Typography, Slider, Box, Button, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartData, setCartTotal, setCartData } = useAppContext(); 
  const [quantities, setQuantities] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate(); 
 console.log(cartData);
  // Calculate the total amount
  useEffect(() => {
    const total = cartData.reduce((acc, item) => {
      return acc + item.bp * (quantities[item.name] || 1); 
    }, 0);
    setCartTotal(total); 
  }, [cartData, quantities, setCartTotal]);

  const handleQuantityChange = (product, newValue) => {
    setQuantities((prev) => ({ ...prev, [product.name]: newValue }));
  };

  const handleDelete = (product) => {
    setCartData((prevData) => prevData.filter((item) => item.name !== product.name)); 
  };

  const handlePay = () => {
    // Show snackbar with success message
    setSnackbarMessage("Payment Successful! Redirecting to Thank You Page...");
    setOpenSnackbar(true);

    // Simulate payment and redirect after 3 seconds
    setTimeout(() => {
      navigate("/thankyou");
    }, 3000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px", color: "green" }}>
        Your Cart
      </Typography>
      
      {/* Cart Items Grid */}
      <Grid container spacing={3}>
        {cartData.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.name}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "150px",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                height="120"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "contain", width: "120px" }}
              />
              <CardContent sx={{ flex: 1 }}>
                {/* Product Info */}
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Rs {product.bp}/ kg
                </Typography>

                {/* Quantity Slider */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2">Quantity</Typography>
                  <Slider
                    value={quantities[product.name] || 1}
                    min={1}
                    max={1000}
                    step={1}
                    onChange={(e, newValue) => handleQuantityChange(product, newValue)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} kg`}
                  />
                </Box>
              </CardContent>

              {/* Delete Button */}
              <Box sx={{ alignSelf: "flex-start", padding: "10px" }}>
                <IconButton onClick={() => handleDelete(product)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bill Summary */}
      <Box sx={{marginTop: "20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",width:"30opx" }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>Bill Summary</Typography>
        <Box sx={{ marginTop: "10px" }}>
          {cartData.map((product) => (
            <Box key={product.name} sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <Typography variant="body2">{product.name} ({quantities[product.name] || 1} kg)</Typography>
              <Typography variant="body2">Rs {product.bp * (quantities[product.name] || 1)}</Typography>
            </Box>
          ))}
        </Box>

        {/* Cart Total */}
        <Typography variant="h5" style={{ fontWeight: "bold", marginTop: "20px" }}>
          Total: Rs {cartData.reduce((acc, item) => acc + item.bp * (quantities[item.name] || 1), 0)}
        </Typography>
      </Box>

      {/* Proceed to Checkout Button */}
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" color="primary" sx={{ width: "200px", backgroundColor: "green" }} onClick={handlePay}>
          Pay 💳
        </Button>
      </Box>

      {/* Snackbar to display message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          sx={{ backgroundColor: "#4caf50", color: "#fff" }}
        />
      </Snackbar>
    </div>
  );
};

export default Cart;

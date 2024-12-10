import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Typography,
  TextField,
  Box,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useAppContext } from "../AppContext";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import debounce from "lodash/debounce";

const API_URLS = "http://localhost:5000/data/";

const Buy = () => {
  const [products, setProducts] = useState({
    grains: [],
    fruits: [],
    vegetables: [],
    dryFruits: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { loggedIn, userData, cartData, setCartData } = useAppContext();
  const navigate = useNavigate(); // Hook to handle navigation

  // Fetch product data with proper error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: grainsResponse } = await axios.get(`${API_URLS}grains`);
        const { data: fruitsResponse } = await axios.get(`${API_URLS}fruits`);
        const { data: vegetablesResponse } = await axios.get(
          `${API_URLS}vegetables`
        );
        const { data: dryfruitsResponse } = await axios.get(
          `${API_URLS}dryfruits`
        );

        setProducts({
          grains: grainsResponse?.grains || [],
          fruits: fruitsResponse?.fruits || [],
          vegetables: vegetablesResponse?.vegetables || [],
          dryfruits: dryfruitsResponse?.dryfruits || [],
        });
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Error fetching data"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = debounce((query) => {
    if (query.trim() === "") {
      setFilteredProducts([]); // Clear search results if search box is cleared
      return;
    }

    const allProducts = [
      ...products.grains,
      ...products.fruits,
      ...products.vegetables,
      ...products.dryfruits,
    ];
    const results = allProducts.filter((product) =>
      product.name?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(results);
  }, 300); // Debounce delay of 300ms

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleBuyNow = (product) => {
    // Add item to billData
    const updatedCartData = [...cartData, {
      image: product.image,
      name: product.name,
      bp: product.bp,
    }];
    setCartData(updatedCartData);

    // Snackbar logic
    setSnackbarMessage("Item added to cart");
    setOpenSnackbar(true);
  };

  const renderFallbackUI = () => {
    return (
      <>
        <Header />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Alert severity="error" style={{ marginBottom: "20px" }}>
            Failed to load product data. Please try again later.
          </Alert>
          <Button
            variant="contained"
            onClick={handleGoBack}
            style={{
              marginBottom: "20px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            Go Back
          </Button>
        </div>
        <Footer />
      </>
    );
  };

  const renderCategory = (title, data, bgcolor, color) => (
    <section style={{ marginBottom: "40px" }}>
      <Typography
        variant="h4"
        style={{
          marginBottom: "20px",
          color: bgcolor || "#000",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={3}>
        {data.length > 0 ? (
          data.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  backgroundColor: bgcolor,
                  color: color,
                  borderRadius: "10px",
                  height: "450px",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color={color}>
                    {product.info}
                  </Typography>
                  <hr />
                  <Typography variant="body2" color={color}>
                     Price : Rs.{product.bp}/kg
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Link
                    to={`/info/${title}/${product.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      style={{ color: color }}
                      onClick={() => alert(product.bestPractices)}
                    >
                      See More Info
                    </Button>
                  </Link>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ color: bgcolor, backgroundColor: color }}
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" color="textSecondary">
              No Products Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </section>
  );

  const renderSearchResults = () =>
    filteredProducts.length > 0 && (
      <section
        style={{ marginBottom: "40px", padding: "20px", borderRadius: "8px" }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: "20px", color: "black", fontWeight: "bold" }}
        >
          Search Results
        </Typography>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          style={{ backgroundColor: "white" }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  height: "400px",
                  // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  padding: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" color="black">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="black">
                    {product.info}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );

  if (loading) {
    return (
      <CircularProgress style={{ margin: "20px auto", display: "block" }} />
    );
  }

  if (error) {
    return renderFallbackUI();
  }

  return (
    <>
      <Header />
      <div style={{ padding: "20px", textAlign: "center" }}>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set the position
>
  <SnackbarContent
    message={snackbarMessage}
    sx={{ backgroundColor: "#4caf50", color: "#fff" }}
  />
</Snackbar>

        <Box sx={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "20px",
            backgroundColor: "green",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "lightgreen",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "lightgreen",
            },
            borderRadius: "50px",
            width: "80%",
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
          <Link to={"/cart"} style={{textDecoration:"none"}}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", color: "white" }}
            >Go To Cart 🛒</Button>
          </Link>
        </Box>
       

        {renderSearchResults()}

        <hr />
        {renderCategory("Grains", products.grains, "#F3BB39", "black")}
        <hr />
        {renderCategory("Fruits", products.fruits, "#F6314F", "white")}
        <hr />
        {renderCategory("Vegetables", products.vegetables, "#487636", "white")}
        <hr />
        {renderCategory("Dry Fruits", products.dryfruits, "#F1B87B", "black")}

        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Buy;

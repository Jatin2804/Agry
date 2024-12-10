import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, List, ListItem } from '@mui/material';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Info = () => {
  const { category, name } = useParams(); // Extracting `category` and `name` from the URL
  const [itemData, setItemData] = useState(null); // State to store the single item
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for programmatic navigation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://agry.onrender.com/data/${category.toLowerCase()}`);
  
        console.log(response.data); // Debugging: Log the full response
  
        // Dynamically access the category array
        const filteredArray = response.data[category.toLowerCase()];
        if (filteredArray) {
          const filteredItem = filteredArray.find(
            (item) => item.name.toLowerCase() === name.toLowerCase()
          );
  
          if (filteredItem) {
            setItemData(filteredItem);
          } else {
            setError("Item not found");
          }
        } else {
          setError("Invalid category");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [category, name]);
  
  
  // Fallback UI in case of error
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom align="center">
          Failed to Load Data
        </Typography>

        {/* Subheader/Error Message */}
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>

        {/* Go Back Button */}
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Go Back
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ marginTop: 5, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} My Application
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!itemData) {
    return (
      <Box sx={{ padding: 3 }}>
        {/* Alternative UI if no data is found */}
        <Typography variant="h6" color="error" align="center">
          No data available for this item.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => navigate(-1)} // Go back if the item isn't available
        >
          Go Back
        </Button>
      </Box>
    );
  }

  // Split best practices using digits and a period
  const bestPracticesList = itemData.bestPractices.split(/\d+\./).filter(practice => practice.trim() !== "");

  return (
    <>
    <Header/>
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Left Side - Image */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              alt={itemData.name}
              height="300"
              image={itemData.image}
            />
          </Card>
        </Grid>

        {/* Right Side - Information */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              {/* Title */}
              <Typography variant="h4" gutterBottom>
                {itemData.name}
              </Typography>

              {/* Info Description */}
              <Typography variant="body1" paragraph>
                {itemData.info}
              </Typography>

              {/* Best Practices */}
              <Typography variant="h6" gutterBottom>
                Best Practices:
              </Typography>
              <List>
                {bestPracticesList.map((practice, index) => (
                  <ListItem key={index}>
                    <Typography variant="body2">{practice.trim()}</Typography>
                  </ListItem>
                ))}
              </List>

              {/* Price Info */}
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item>
                  <Typography variant="h6">Buying Price: ${itemData.bp}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Selling Price: ${itemData.sp}</Typography>
                </Grid>
              </Grid>

              {/* Call-to-action Buttons
              <Button variant="contained" color="primary" sx={{ margin: 3 }}>
                Buy Now
              </Button>
              <Button variant="contained" color="secondary" sx={{ margin: 3 }}>
                Sell Now
              </Button> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    <Footer/>
    </>
    
  );
};

export default Info;

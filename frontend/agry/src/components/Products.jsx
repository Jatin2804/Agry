import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Box
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { useAppContext } from '../AppContext';

const API_URLS = 'https://agry.onrender.com/data/';

const Products = () => {
  const [products, setProducts] = useState({
    grains: [],
    fruits: [],
    vegetables: [],
    dryfruits: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {loggedIn} = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: grainsResponse } = await axios.get(`${API_URLS}grains`);
        const { data: fruitsResponse } = await axios.get(`${API_URLS}fruits`);
        const { data: vegetablesResponse } = await axios.get(`${API_URLS}vegetables`);
        const { data: dryfruitsResponse } = await axios.get(`${API_URLS}dryfruits`);

        setProducts({
          grains: grainsResponse?.grains || [],
          fruits: fruitsResponse?.fruits || [],
          vegetables: vegetablesResponse?.vegetables || [],
          dryfruits: dryfruitsResponse?.dryfruits || [],
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = debounce((query) => {
    if (query.trim() === '') {
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

  
  const renderCategory = (title, data, bgcolor, color) => (
    <section style={{ marginBottom: '40px' }}>
      <Typography
        variant="h4"
        style={{
          marginBottom: '20px',
          color: bgcolor || '#000',
          fontWeight: 'bold',
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
                  borderRadius: '10px',
                  height: '400px',
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
                </CardContent>
                <Link to={`/info/${title}/${product.name}`} style={{ textDecoration: 'none' }}>
                  <Button
                    size="small"
                    style={{ color: color }}
                    onClick={() => alert(product.bestPractices)}
                  >
                    See More Info
                  </Button>
                </Link>
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
      <section style={{ marginBottom: '40px', padding: '20px', borderRadius: '8px' }}>
        <Typography
          variant="h4"
          style={{ marginBottom: '20px', color: 'black', fontWeight: 'bold' }}
        >
          Search Results
        </Typography>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          style={{ backgroundColor: 'white' }}
          breakpoints={{
            0: {
              slidesPerView: 1, // Mobile view - show 1 slide
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2, // Tablet view - show 2 slides
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3, // Small desktop view - show 3 slides
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4, // Desktop view - show 4 slides
              spaceBetween: 20,
            },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  height: '400px',
                  padding: '10px',
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
    return <CircularProgress style={{ margin: '20px auto', display: 'block' }} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
  <TextField
  label="Search Products"
  variant="outlined"
  fullWidth
  sx={{
    marginBottom: '20px',
    backgroundColor: 'green',
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'lightgreen',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'lightgreen',
    },
    borderRadius:"50px"
  }}
  onChange={(e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  }}
/>


      {renderSearchResults()}
      <hr />
      {loggedIn ? (
          <Box>
          <Button
            component={Link}
            to="/buy"
            variant="contained"
            sx={{ backgroundColor: "green", color: "white", margin: "10px" }}
          >
            Buy 💳
          </Button>
          <Button
            component={Link}
            to="/sell"
            variant="contained"
            sx={{ backgroundColor: "green", color: "white", margin: "10px" }}
          >
            Sell 💰
          </Button>
        </Box>
      ):(
        <Typography variant="body2" color="black">
        Login or signup to Agry👋 <Link to={"/login"}>Login</Link>
      </Typography>
      )}
     
      <hr/>
      {renderCategory('Grains', products.grains, '#F3BB39', 'black')}
      <hr />
      {renderCategory('Fruits', products.fruits, '#F6314F', 'white')}
      <hr />
      {renderCategory('Vegetables', products.vegetables, '#487636', 'white')}
      <hr />
      {renderCategory('Dry Fruits', products.dryfruits, '#F1B87B', 'black')}
    </div>
  );
};

export default Products;

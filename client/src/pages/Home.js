import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Button, useTheme, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Hero from '../components/home/Hero';
import ProductList from '../components/products/ProductList';

// Category card component
const CategoryCard = ({ category, image, bgColor }) => {
  const theme = useTheme();

  return (
    <Card
      component={Link}
      to={`/categories/${category.toLowerCase().replace(' ', '-')}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: bgColor || theme.palette.primary.main,
        textDecoration: 'none',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          '& .category-image': {
            transform: 'scale(1.05)',
          }
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden' }}>
        <CardMedia
          className="category-image"
          component="img"
          image={image}
          alt={category}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s',
          }}
        />
      </Box>
      <CardContent
        sx={{
          textAlign: 'center',
          backgroundColor: 'white',
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} color="text.primary">
          {category}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Feature box component
const FeatureBox = ({ icon, title, description }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
        height: '100%',
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Box
        sx={{
          width: 70,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

const Home = () => {
  const theme = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you'd have endpoints for featured and new products
        const response = await axios.get('http://localhost:5000/api/products');
        
        // For demo, just split the products into two arrays
        if (response.data && response.data.length) {
          setFeaturedProducts(response.data.slice(0, 4));
          setNewArrivals(response.data.slice(4, 8));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
    
    // For demo purposes, create dummy products if API call fails
    const timer = setTimeout(() => {
      if (loading) {
        const dummyProducts = Array(8).fill().map((_, idx) => {
          const categoryObj = categories[idx % 6];
          const category = categoryObj.name.toLowerCase().replace(' & ', '-').replace(' ', '-');
          // Format category for file path
          const fileCategory = category.replace('-', '_');
          
          // Specific file patterns for each category based on available files
          let imagePath;
          switch(fileCategory) {
            case 'rugby':
              imagePath = `/images/products/${fileCategory}/${fileCategory}_${9}_${idx % 3}.jpeg`;
              break;
            case 'volleyball':
              imagePath = `/images/products/${fileCategory}/${fileCategory}_${40}_${idx % 3}.jpeg`;
              break;
            case 'soccer':
              imagePath = `/images/products/${fileCategory}/${fileCategory}_${90}_${idx % 3}.jpeg`;
              break;
            case 'field_hockey':
            case 'track_field':
            case 'off_field':
            default:
              // For categories without specific images, use a default pattern or placeholder
              imagePath = `/images/products/placeholder.jpg`;
          }
          
          return {
            id: `dummy-${idx}`,
            name: `Sample Product ${idx + 1}`,
            description: "This is a placeholder product for demonstration.",
            price: 29.99 + (idx * 10),
            discountPrice: idx % 3 === 0 ? 24.99 + (idx * 8) : null,
            category: category,
            stock: 15,
            rating: 4 + (idx % 2),
            numReviews: 5 + idx,
            images: [imagePath],
          };
        });
        
        setFeaturedProducts(dummyProducts.slice(0, 4));
        setNewArrivals(dummyProducts.slice(4, 8));
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  // Category data with images and colors from our palette
  const categories = [
    { 
      name: 'Rugby', 
      image: '/images/products/rugby/rugby_9_0.jpeg', 
      color: theme.palette.primary.main 
    },
    { 
      name: 'Volleyball', 
      image: '/images/products/volleyball/volleyball_40_0.jpeg', 
      color: theme.palette.secondary.main 
    },
    { 
      name: 'Field Hockey', 
      image: '/images/products/placeholder.jpg', 
      color: theme.palette.tertiary.main 
    },
    { 
      name: 'Track & Field', 
      image: '/images/products/placeholder.jpg', 
      color: theme.palette.accent1.main 
    },
    { 
      name: 'Soccer', 
      image: '/images/products/soccer/soccer_90_0.jpeg', 
      color: theme.palette.primary.main 
    },
    { 
      name: 'Off-Field', 
      image: '/images/products/placeholder.jpg', 
      color: theme.palette.accent2.main 
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Box sx={{ backgroundColor: theme.palette.background.paper, py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
              Shop by Category
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Explore our wide range of sports equipment and apparel designed for peak performance and comfort.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <CategoryCard 
                  category={category.name} 
                  image={category.image} 
                  bgColor={category.color} 
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              component={Link} 
              to="/products" 
              variant="contained" 
              color="tertiary"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.2, 
                fontWeight: 600,
                color: 'white'
              }}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <ProductList 
            products={featuredProducts} 
            loading={loading} 
            title="Featured Products" 
            subtitle="Our most popular selections for teams and individuals" 
          />
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: theme.palette.background.paper, py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
              Why Choose Hanu Sports
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              We're committed to helping teams and athletes achieve their best with quality equipment and exceptional service.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureBox
                icon={<Box component="img" src="/images/icons/quality.svg" alt="Quality" sx={{ width: 40, height: 40 }} />}
                title="Premium Quality"
                description="All our products meet the highest standards of quality and durability for serious athletes."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureBox
                icon={<Box component="img" src="/images/icons/customization.svg" alt="Customization" sx={{ width: 40, height: 40 }} />}
                title="Team Customization"
                description="Personalize gear for your entire team with custom colors, logos, and numbers."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureBox
                icon={<Box component="img" src="/images/icons/shipping.svg" alt="Shipping" sx={{ width: 40, height: 40 }} />}
                title="Fast Shipping"
                description="Quick delivery to get your equipment when you need it, with tracking on all orders."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureBox
                icon={<Box component="img" src="/images/icons/support.svg" alt="Support" sx={{ width: 40, height: 40 }} />}
                title="Expert Support"
                description="Our team of sports enthusiasts is here to help you find the perfect gear for your needs."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* New Arrivals Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <ProductList 
            products={newArrivals} 
            loading={loading} 
            title="New Arrivals" 
            subtitle="The latest additions to our collection of high-performance sports gear" 
          />
        </Container>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundImage: 'linear-gradient(to right, rgba(255, 215, 0, 0.9), rgba(255, 140, 0, 0.9))',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom fontWeight={700} sx={{ color: '#333' }}>
            Ready to Elevate Your Game?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#333' }}>
            Join thousands of teams and athletes who trust Hanu Sports for their equipment needs.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              component={Link} 
              to="/products" 
              variant="contained" 
              color="secondary"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontWeight: 600,
                fontSize: '1.1rem',
                color: '#333'
              }}
            >
              Shop Now
            </Button>
            <Button 
              component={Link} 
              to="/customize" 
              variant="outlined" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontWeight: 600,
                fontSize: '1.1rem',
                borderColor: 'white',
                color: '#333',
                backgroundColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderColor: 'white',
                }
              }}
            >
              Team Customization
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;

import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductList from '../components/products/ProductList';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Hanu Sports
      </Typography>
      <ProductList />
    </Container>
  );
};

export default Home;

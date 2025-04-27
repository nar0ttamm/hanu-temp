import React from 'react';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, title, subtitle }) => {
  const renderSkeletons = () => {
    return Array(8)
      .fill()
      .map((_, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${idx}`}>
          <Box sx={{ height: '100%' }}>
            <Skeleton variant="rectangular" height={200} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" height={24} width="60%" />
          </Box>
        </Grid>
      ));
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {title && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      <Grid container spacing={3}>
        {loading
          ? renderSkeletons()
          : products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>
      
      {!loading && products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box, useTheme } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '10rem' },
            fontWeight: 700,
            color: theme.palette.primary.main,
            marginBottom: 2,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 4,
            maxWidth: 500,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{ fontWeight: 500, color: theme.palette.text.primary }}
          >
            Back to Home
          </Button>
          
          <Button
            component={RouterLink}
            to="/products"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ fontWeight: 500 }}
          >
            Browse Products
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound; 
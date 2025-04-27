import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.primary.main,
        overflow: 'hidden',
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          right: -100,
          top: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: theme.palette.accent1.main,
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: -80,
          bottom: -80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: theme.palette.accent2.main,
          opacity: 0.3,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 0 } }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: '#333333',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Elevate Your Game with Hanu Sports
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: '#555555',
                  mb: 4,
                  maxWidth: 500,
                }}
              >
                Premium equipment and apparel for athletes at every level. From professionals to school teams, we've got you covered.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  color="tertiary"
                  size="large"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
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
                    borderColor: theme.palette.tertiary.main,
                    color: theme.palette.tertiary.main,
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: theme.palette.tertiary.dark,
                      backgroundColor: 'rgba(205, 127, 50, 0.04)',
                    },
                  }}
                >
                  Team Customization
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="img"
                    src="/images/icons/free-shipping.svg"
                    alt="Free Shipping"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    Free Shipping
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="img"
                    src="/images/icons/secure-payment.svg"
                    alt="Secure Payment"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    Secure Payment
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/images/hero-image.png"
                alt="Athletes in action"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 
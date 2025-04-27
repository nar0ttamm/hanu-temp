import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, styled } from '@mui/material';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 'auto',
  minHeight: '350px',
  overflow: 'hidden',
  marginBottom: theme.spacing(5),
  borderRadius: '15px',
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'all 0.5s ease',
  borderRadius: '15px',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  maxWidth: '550px',
  padding: theme.spacing(5),
  backgroundColor: 'rgba(255, 215, 0, 0.85)', // Using primary color with opacity
  color: theme.palette.common.black,
  borderRadius: '0 15px 15px 0',
  transition: 'all 0.5s ease',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
    maxWidth: '450px',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    maxWidth: '100%',
    borderRadius: '15px',
    margin: theme.spacing(2),
    transform: 'none',
    top: 'auto',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(2),
  padding: '10px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  '&.primary': {
    backgroundColor: theme.palette.accent1.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.accent2.main,
    },
  },
  '&.secondary': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.tertiary.main,
    },
  },
}));

const Hero = () => {
  return (
    <Container>
      <HeroContainer>
        <HeroImage 
          src="/images/products/rugby/rugby_6_0.png" 
          alt="Sports Equipment"
        />
        <HeroContent>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              marginBottom: 2,
              lineHeight: 1.2,
            }}
          >
            TEAM EXCELLENCE STARTS HERE
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
              marginBottom: 2,
              opacity: 0.9,
            }}
          >
            Discover our premium range of team sports equipment and apparel designed for champions at every level.
          </Typography>
          <Box>
            <StyledButton 
              className="primary" 
              component={Link} 
              to="/products"
            >
              Explore Products
            </StyledButton>
            <StyledButton 
              className="secondary" 
              component={Link} 
              to="/contact"
            >
              Contact Us
            </StyledButton>
          </Box>
        </HeroContent>
      </HeroContainer>
    </Container>
  );
};

export default Hero; 
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, styled } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.black,
  position: 'relative',
  padding: theme.spacing(6, 0, 2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(to right, ${theme.palette.accent1.main}, ${theme.palette.accent2.main})`,
  },
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  position: 'relative',
  paddingBottom: theme.spacing(1),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40px',
    height: '2px',
    backgroundColor: theme.palette.accent1.main,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.accent1.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.black,
  '&:hover': {
    backgroundColor: theme.palette.accent1.main,
    color: theme.palette.common.white,
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">About Us</FooterHeading>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Hanu-Sports is your premier destination for high-quality team sports equipment and apparel. We're dedicated to helping teams achieve excellence.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <SocialButton>
                <Facebook />
              </SocialButton>
              <SocialButton>
                <Twitter />
              </SocialButton>
              <SocialButton>
                <Instagram />
              </SocialButton>
              <SocialButton>
                <LinkedIn />
              </SocialButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">Quick Links</FooterHeading>
            <FooterLink to="/products">All Products</FooterLink>
            <FooterLink to="/team-offers">Team Offers</FooterLink>
            <FooterLink to="/custom-designs">Custom Designs</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">Categories</FooterHeading>
            <FooterLink to="/category/rugby">Rugby</FooterLink>
            <FooterLink to="/category/volleyball">Volleyball</FooterLink>
            <FooterLink to="/category/field-hockey">Field Hockey</FooterLink>
            <FooterLink to="/category/track-field">Track & Field</FooterLink>
            <FooterLink to="/category/soccer">Soccer</FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">Contact Info</FooterHeading>
            <FooterLink to="mailto:info@hanu-sports.com">
              <Email /> info@hanu-sports.com
            </FooterLink>
            <FooterLink to="tel:+1234567890">
              <Phone /> +1 (234) 567-890
            </FooterLink>
            <FooterLink to="/contact">
              <LocationOn /> 123 Sports Avenue, Stadium District
            </FooterLink>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            borderTop: '1px solid rgba(0,0,0,0.1)', 
            mt: 4, 
            pt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Hanu-Sports. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 
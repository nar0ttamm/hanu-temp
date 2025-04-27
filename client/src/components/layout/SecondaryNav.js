import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, styled, useTheme } from '@mui/material';

const CategoryLink = styled(Link)(({ theme }) => ({
  padding: '8px 18px',
  borderRadius: '20px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  transition: 'all 0.3s ease',
  color: 'white',
  textDecoration: 'none',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '&::after': {
      width: '70%',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: '2px',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  display: 'flex',
  gap: theme.spacing(3),
  padding: theme.spacing(0.5, 0),
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.accent1.main,
    borderRadius: '20px',
  },
}));

const SecondaryNav = () => {
  const theme = useTheme();
  
  const categories = [
    { name: 'Rugby', path: '/category/rugby' },
    { name: 'Volleyball', path: '/category/volleyball' },
    { name: 'Field Hockey', path: '/category/field-hockey' },
    { name: 'Track & Field', path: '/category/track-field' },
    { name: 'Soccer', path: '/category/soccer' },
    { name: 'Off-Field Gear', path: '/category/off-field' },
    { name: 'Team Offers', path: '/team-offers' },
    { name: 'Custom Designs', path: '/custom-designs' },
  ];

  return (
    <Box 
      sx={{ 
        backgroundColor: theme.palette.secondary.main,
        position: 'sticky',
        top: 64,
        zIndex: 999,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <ScrollContainer>
          {categories.map((category) => (
            <CategoryLink key={category.path} to={category.path}>
              {category.name}
            </CategoryLink>
          ))}
        </ScrollContainer>
      </Container>
    </Box>
  );
};

export default SecondaryNav; 
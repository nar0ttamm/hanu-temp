import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useTheme
} from '@mui/material';

const About = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          About Hanu Sports
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 4,
            fontSize: '1.1rem',
            lineHeight: 1.6 
          }}
        >
          We are passionate about sports and dedicated to providing high-quality equipment 
          and apparel for athletes at all levels. Our mission is to help you perform at your best.
        </Typography>
        <Divider sx={{ maxWidth: '200px', mx: 'auto', mb: 4 }} />
      </Box>

      {/* Our Story */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Box 
            component="img"
            src="/images/products/rugby/rugby_9_0.jpeg" 
            alt="Our story"
            sx={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
              maxHeight: '400px'
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
              Our Story
            </Typography>
            <Typography paragraph>
              Founded in 2023, Hanu Sports began with a simple idea: create high-quality sports equipment 
              that helps athletes perform their best while being affordable and durable.
            </Typography>
            <Typography paragraph>
              What started as a small operation has grown into a trusted brand serving athletes across 
              multiple sports disciplines. We take pride in our attention to detail, use of premium materials, 
              and commitment to excellence in everything we do.
            </Typography>
            <Typography>
              Today, we continue to innovate and expand our product offerings, always with the athlete's 
              needs at the forefront of our designs.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Values Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
          Our Values
        </Typography>
        <Typography 
          color="text.secondary"
          sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            mb: 4 
          }}
        >
          These core principles guide everything we do at Hanu Sports.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        {[
          {
            title: 'Quality',
            description: 'We never compromise on the quality of our products, using only the finest materials and craftsmanship.'
          },
          {
            title: 'Innovation',
            description: 'We constantly seek new ways to improve our products and provide better solutions for athletes.'
          },
          {
            title: 'Integrity',
            description: 'We operate with honesty and transparency in all our business practices.'
          },
          {
            title: 'Customer Focus',
            description: 'Your satisfaction is our top priority, and we\'re committed to exceptional service.'
          }
        ].map((value, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
              }
            }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h3" 
                  fontWeight={600}
                  color={theme.palette.primary.main}
                >
                  {value.title}
                </Typography>
                <Typography>
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About; 
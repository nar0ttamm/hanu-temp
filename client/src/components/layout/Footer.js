import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, Email, LocationOn, Phone } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { text: 'Rugby', url: '/categories/rugby' },
        { text: 'Volleyball', url: '/categories/volleyball' },
        { text: 'Field Hockey', url: '/categories/field-hockey' },
        { text: 'Track & Field', url: '/categories/track-field' },
        { text: 'Soccer', url: '/categories/soccer' },
        { text: 'Off-Field', url: '/categories/off-field' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Contact Us', url: '/contact' },
        { text: 'FAQs', url: '/faqs' },
        { text: 'Shipping & Returns', url: '/shipping' },
        { text: 'Size Guide', url: '/size-guide' },
        { text: 'Track Order', url: '/track-order' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', url: '/about' },
        { text: 'Team Customization', url: '/customize' },
        { text: 'Careers', url: '/careers' },
        { text: 'Blog', url: '/blog' },
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Terms of Service', url: '/terms' },
      ],
    },
  ];

  return (
    <Box sx={{ 
      bgcolor: theme.palette.secondary.main, 
      color: theme.palette.text.primary,
      pt: 6, 
      pb: 4 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About */}
          <Grid item xs={12} md={4}>
            <Box component={Link} to="/" sx={{ display: 'block', mb: 2 }}>
              <Box component="img" src="/images/logo.svg" alt="Hanu Sports" sx={{ height: 60 }} />
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Premium sports equipment and apparel for rugby, volleyball, field hockey, track & field, and more. Custom team outfitting and personalized gear for athletes at all levels.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Links */}
          {footerLinks.map((column) => (
            <Grid item xs={6} sm={4} md={2} key={column.title}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {column.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
                {column.links.map((link) => (
                  <Box component="li" key={link.text} sx={{ mb: 1 }}>
                    <Link to={link.url} style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
                      <Typography variant="body2" sx={{ '&:hover': { color: theme.palette.primary.main } }}>
                        {link.text}
                      </Typography>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Sign up for our newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Get updates on new products, exclusive offers, and sports tips.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                fullWidth
                sx={{ 
                  bgcolor: 'white', 
                  borderRadius: '4px 0 0 4px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px 0 0 4px',
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  borderRadius: '0 4px 4px 0', 
                  boxShadow: 'none',
                  color: theme.palette.text.primary
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email fontSize="small" sx={{ mr: 1 }} /> support@hanusports.com
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone fontSize="small" sx={{ mr: 1 }} /> +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn fontSize="small" sx={{ mr: 1 }} /> 123 Sports Avenue, Athletic City, SP 12345
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
        
        {/* Bottom */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
            © {new Date().getFullYear()} Hanu Sports. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/privacy" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
              <Typography variant="body2" sx={{ '&:hover': { color: theme.palette.primary.main } }}>
                Privacy Policy
              </Typography>
            </Link>
            <Link to="/terms" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
              <Typography variant="body2" sx={{ '&:hover': { color: theme.palette.primary.main } }}>
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
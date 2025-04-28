import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { 
  Inventory as ProductsIcon, 
  ShoppingBag as OrdersIcon, 
  People as UsersIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick access cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
              }
            }}
          >
            <ProductsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Products
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
              Manage your products, add new items, edit details
            </Typography>
            <Button 
              component={Link} 
              to="/admin/products" 
              variant="contained" 
              fullWidth
            >
              Manage Products
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
              }
            }}
          >
            <OrdersIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Orders
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
              View and manage customer orders and shipments
            </Typography>
            <Button 
              component={Link} 
              to="/admin/orders" 
              variant="contained" 
              fullWidth
            >
              Manage Orders
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
              }
            }}
          >
            <UsersIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Customers
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
              Manage customer accounts and view customer data
            </Typography>
            <Button 
              component={Link} 
              to="/admin/users" 
              variant="contained" 
              fullWidth
            >
              Manage Customers
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
              }
            }}
          >
            <DashboardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
              View store analytics, sales reports, and statistics
            </Typography>
            <Button 
              component={Link} 
              to="/admin/analytics" 
              variant="contained" 
              fullWidth
            >
              View Analytics
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; 
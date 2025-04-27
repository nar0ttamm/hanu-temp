import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  Button,
  Chip,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Breadcrumbs,
  Link,
  useTheme
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocalShipping as ShippingIcon,
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon
} from '@mui/icons-material';

// Dummy order data for demo
const dummyOrder = {
  id: 'ORD-3872',
  status: 'Delivered',
  date: '2023-09-15T10:30:00',
  customer: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (234) 567-890'
  },
  shipping: {
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    method: 'Standard Shipping',
    trackingNumber: 'TRK928374651',
    estimatedDelivery: '2023-09-25'
  },
  payment: {
    method: 'Credit Card',
    cardType: 'Visa',
    lastFourDigits: '4242',
    subtotal: 229.97,
    shipping: 14.99,
    tax: 18.40,
    discount: 19.37,
    total: 243.99
  },
  items: [
    {
      id: 1,
      name: 'Professional Rugby Jersey',
      image: '/images/products/rugby/rugby_9_0.jpeg',
      price: 89.99,
      quantity: 1,
      color: 'Red',
      size: 'L'
    },
    {
      id: 2,
      name: 'Rugby Training Shorts',
      image: '/images/products/rugby/rugby_9_1.jpeg',
      price: 49.99,
      quantity: 2,
      color: 'Black',
      size: 'M'
    },
    {
      id: 3,
      name: 'Performance Rugby Socks',
      image: '/images/products/rugby/rugby_9_2.jpeg',
      price: 19.99,
      quantity: 2,
      color: 'Black',
      size: 'L'
    }
  ],
  timeline: [
    {
      status: 'Order Placed',
      date: '2023-09-15T10:30:00',
      completed: true
    },
    {
      status: 'Processing',
      date: '2023-09-15T14:45:00',
      completed: true
    },
    {
      status: 'Shipped',
      date: '2023-09-17T09:15:00',
      completed: true
    },
    {
      status: 'Delivered',
      date: '2023-09-20T13:20:00',
      completed: true
    }
  ]
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'success';
    case 'shipped':
      return 'info';
    case 'processing':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the order data from your API
    // For this demo, we'll use the dummy data
    setOrder(dummyOrder);
    setLoading(false);
  }, [id]);

  if (loading || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading order details...</Typography>
      </Container>
    );
  }

  const activeStep = order.timeline.findIndex(step => step.status.toLowerCase() === order.status.toLowerCase());

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
          Home
        </Link>
        <Link component={RouterLink} to="/orders" color="inherit">
          Orders
        </Link>
        <Typography color="text.primary">
          {order.id}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Order {order.id}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Placed on {formatDate(order.date)}
          </Typography>
        </Box>
        <Box>
          <Chip 
            label={order.status} 
            color={getStatusColor(order.status)}
            sx={{ fontWeight: 500 }}
          />
          <Button
            component={RouterLink}
            to="/orders"
            startIcon={<ArrowBackIcon />}
            sx={{ ml: 2 }}
          >
            Back to Orders
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Order Status Stepper */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Order Status
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
              {order.timeline.map((step) => (
                <Step key={step.status} completed={step.completed}>
                  <StepLabel>
                    <Typography variant="body2" component="div" sx={{ textAlign: 'center', mt: 1 }}>
                      {step.status}
                      <Box component="div" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        {formatDate(step.date)}
                      </Box>
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Order Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {order.items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} sm={2}>
                    <Card sx={{ borderRadius: 1, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{ height: 80, objectFit: 'contain' }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={9} sm={10}>
                    <Grid container>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="subtitle1" component={RouterLink} to={`/products/${item.id}`} sx={{ 
                          textDecoration: 'none', 
                          color: 'text.primary',
                          '&:hover': { color: theme.palette.primary.main }
                        }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.color}, Size: {item.size}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 1, sm: 0 } }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          ₹{(item.price * 83).toFixed(0)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Subtotal: ₹{(item.price * item.quantity * 83).toFixed(0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {order.items.indexOf(item) < order.items.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemText primary="Subtotal" />
                <Typography>₹{(order.payment.subtotal * 83).toFixed(0)}</Typography>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Shipping" />
                <Typography>₹{(order.payment.shipping * 83).toFixed(0)}</Typography>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Tax" />
                <Typography>₹{(order.payment.tax * 83).toFixed(0)}</Typography>
              </ListItem>
              {order.payment.discount > 0 && (
                <ListItem disableGutters>
                  <ListItemText primary="Discount" />
                  <Typography color="error.main">-₹{(order.payment.discount * 83).toFixed(0)}</Typography>
                </ListItem>
              )}
              <Divider sx={{ my: 1 }} />
              <ListItem disableGutters>
                <ListItemText 
                  primary="Total" 
                  primaryTypographyProps={{ fontWeight: 'bold' }} 
                />
                <Typography variant="h6" fontWeight="bold">
                  ₹{(order.payment.total * 83).toFixed(0)}
                </Typography>
              </ListItem>
            </List>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" gutterBottom>
                  <strong>Address:</strong> {order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Country:</strong> {order.shipping.country}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Method:</strong> {order.shipping.method}
                </Typography>
                {order.shipping.trackingNumber && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Tracking:</strong> {order.shipping.trackingNumber}
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" gutterBottom>
                  <strong>Method:</strong> {order.payment.method}
                </Typography>
                {order.payment.cardType && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Card:</strong> {order.payment.cardType} ending in {order.payment.lastFourDigits}
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Need Help Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Need Help With Your Order?
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              If you have any questions or concerns about your order, please contact our customer support.
            </Typography>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
            >
              Contact Support
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetail; 
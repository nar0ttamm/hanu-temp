import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Card,
  CardMedia,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
  Link,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const theme = useTheme();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    subtotal,
    tax,
    shipping,
    total,
    itemCount
  } = useCart();

  const handleQuantityChange = (itemKey, action) => {
    const item = cart.find(i => i.itemKey === itemKey);
    if (!item) return;

    if (action === 'increase') {
      updateQuantity(itemKey, item.quantity + 1);
    } else if (action === 'decrease' && item.quantity > 1) {
      updateQuantity(itemKey, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemKey) => {
    removeFromCart(itemKey);
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{ fontWeight: 500, color: theme.palette.text.primary }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
        Shopping Cart
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 2, borderRadius: 2 }}>
            {cart.map((item) => (
              <Box key={item.itemKey}>
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={3} sm={2}>
                    <Card
                      sx={{
                        height: 80,
                        width: '100%',
                        boxShadow: 'none',
                        bgcolor: 'background.default',
                        borderRadius: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.images && item.images.length > 0 ? item.images[0] : '/images/products/placeholder.jpg'}
                        alt={item.name}
                        sx={{ height: '100%', objectFit: 'contain' }}
                      />
                    </Card>
                  </Grid>

                  {/* Product Details */}
                  <Grid item xs={9} sm={4}>
                    <Link
                      component={RouterLink}
                      to={`/products/${item.id}`}
                      underline="hover"
                      color="text.primary"
                      sx={{ fontWeight: 500 }}
                    >
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        {item.name}
                      </Typography>
                    </Link>
                    
                    {(item.size || item.color) && (
                      <Typography variant="body2" color="text.secondary">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' | '}
                        {item.color && `Color: ${item.color}`}
                      </Typography>
                    )}
                    
                    <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} color={item.discountPrice ? 'error.main' : 'text.primary'}>
                        ₹{((item.discountPrice || item.price) * 83).toFixed(0)}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Quantity */}
                  <Grid item xs={8} sm={3}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.itemKey, 'decrease')}
                        disabled={item.quantity <= 1}
                        sx={{ 
                          border: '1px solid', 
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      
                      <TextField
                        size="small"
                        value={item.quantity}
                        InputProps={{
                          readOnly: true,
                          sx: { 
                            textAlign: 'center',
                            width: 50,
                            '& input': { textAlign: 'center' } 
                          }
                        }}
                      />
                      
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.itemKey, 'increase')}
                        sx={{ 
                          border: '1px solid', 
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Grid>

                  {/* Price and Remove */}
                  <Grid item xs={4} sm={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Typography variant="subtitle1" fontWeight={600} color={item.discountPrice ? 'error.main' : 'text.primary'}>
                        ₹{((item.discountPrice || item.price) * item.quantity * 83).toFixed(0)}
                      </Typography>
                    </Box>
                    
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.itemKey)}
                      sx={{ ml: { sm: 2 } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Button
                component={RouterLink}
                to="/products"
                startIcon={<ArrowBackIcon />}
                sx={{ fontWeight: 500 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Order Summary
            </Typography>
            
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="body1">₹{(subtotal * 83).toFixed(0)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Tax" />
                <Typography variant="body1">₹{(tax * 83).toFixed(0)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Shipping" />
                <Typography variant="body1">₹{(shipping * 83).toFixed(0)}</Typography>
              </ListItem>
              
              <Divider sx={{ my: 1 }} />
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={<Typography variant="subtitle1" fontWeight={700}>Total</Typography>} />
                <Typography variant="subtitle1" fontWeight={700}>
                  ₹{((subtotal + tax + shipping) * 83).toFixed(0)}
                </Typography>
              </ListItem>
            </List>
            
            <Button
              component={RouterLink}
              to="/checkout"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, fontWeight: 600, color: theme.palette.text.primary }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, total } = useCart();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Order Summary</Typography>
          <Typography>Total: ${total}</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

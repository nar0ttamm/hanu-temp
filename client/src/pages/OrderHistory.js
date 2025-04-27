import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import { 
  ShoppingBag as ShoppingBagIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Dummy orders data for demo purposes
const orders = [
  {
    id: "ORD-3872",
    date: "2023-09-15",
    total: 243.99,
    status: "Delivered",
    items: 3
  },
  {
    id: "ORD-3871",
    date: "2023-09-02",
    total: 125.50,
    status: "Shipped",
    items: 2
  },
  {
    id: "ORD-3870",
    date: "2023-08-28",
    total: 89.99,
    status: "Processing",
    items: 1
  },
  {
    id: "ORD-3869",
    date: "2023-08-15",
    total: 312.75,
    status: "Delivered",
    items: 4
  },
  {
    id: "ORD-3868",
    date: "2023-07-30",
    total: 75.25,
    status: "Cancelled",
    items: 1
  }
];

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
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderHistory = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Order History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and track all your orders
        </Typography>
      </Box>

      {orders.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {order.id}
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{order.items} {order.items === 1 ? 'item' : 'items'}</TableCell>
                  <TableCell>₹{(order.total * 83).toFixed(0)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      to={`/orders/${order.id}`}
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <ShoppingBagIcon 
            sx={{ 
              fontSize: 60, 
              color: theme.palette.primary.main, 
              opacity: 0.6,
              mb: 2 
            }} 
          />
          <Typography variant="h6" gutterBottom>
            No Orders Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            You haven't placed any orders yet. Explore our products and start shopping!
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained"
            sx={{ mt: 2 }}
          >
            Browse Products
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default OrderHistory; 
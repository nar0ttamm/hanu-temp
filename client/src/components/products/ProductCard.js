import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  styled
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: 'contain',
  backgroundColor: '#f5f5f5',
});

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    images,
    rating,
    numReviews,
    category,
    countInStock
  } = product;

  return (
    <StyledCard>
      <CardActionArea component={Link} to={`/product/${_id}`}>
        <StyledCardMedia
          image={images[0] || '/placeholder-product.png'}
          title={name}
        />
        <CardContent>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            sx={{ textTransform: 'capitalize' }}
          >
            {category}
          </Typography>
          
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3.6em'
            }}
          >
            {name}
          </Typography>

          <Box display="flex" alignItems="center" mb={1}>
            <Rating
              value={rating}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="body2" color="text.secondary" ml={1}>
              ({numReviews})
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary">
              ${price.toFixed(2)}
            </Typography>
            {countInStock > 0 ? (
              <Chip
                label="In Stock"
                size="small"
                color="success"
                variant="outlined"
              />
            ) : (
              <Chip
                label="Out of Stock"
                size="small"
                color="error"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProductCard; 
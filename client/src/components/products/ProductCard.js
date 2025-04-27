import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardActions, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Rating, 
  Chip, 
  Skeleton,
  useTheme 
} from '@mui/material';
import { 
  ShoppingCart as CartIcon, 
  Favorite, 
  FavoriteBorder,
  Visibility 
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const ProductCard = memo(({ product }) => {
  const theme = useTheme();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const {
    id,
    name,
    price,
    discountPrice,
    images,
    rating,
    numReviews,
    category,
    stock
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const discountPercentage = discountPrice ? Math.round((1 - discountPrice / price) * 100) : 0;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          '& .product-actions': {
            opacity: 1,
          },
          '& .quick-view': {
            opacity: 1,
          },
        },
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Favorite Button */}
      <IconButton
        size="small"
        onClick={handleToggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      {/* Discount Badge */}
      {discountPrice && (
        <Chip
          label={`-${discountPercentage}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            fontWeight: 'bold',
          }}
        />
      )}

      {/* Image Container */}
      <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden' }}>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}
        <CardMedia
          component="img"
          image={images && images.length > 0 ? images[0] : '/images/products/placeholder.jpg'}
          alt={name}
          onLoad={handleImageLoad}
          loading="lazy"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block',
          }}
        />
        
        {/* Quick View Button */}
        <Box 
          className="quick-view"
          sx={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
        >
          <Button
            component={Link}
            to={`/products/${id}`}
            variant="contained"
            color="secondary"
            startIcon={<Visibility />}
            size="small"
            sx={{ 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: '#333'
            }}
          >
            Quick View
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ textTransform: 'uppercase', mb: 0.5 }}
        >
          {category}
        </Typography>
        
        <Typography
          component={Link}
          to={`/products/${id}`}
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.3,
            height: '2.6em',
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={rating} 
            precision={0.5} 
            size="small" 
            readOnly 
          />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            ({numReviews})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          {discountPrice ? (
            <>
              <Typography variant="h6" fontWeight={600} color="error.main">
                ₹{(discountPrice * 83).toFixed(0)}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ₹{(price * 83).toFixed(0)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" fontWeight={600} color="text.primary">
              ₹{(price * 83).toFixed(0)}
            </Typography>
          )}
        </Box>
        
        {/* Stock Status */}
        <Box sx={{ mt: 1 }}>
          {stock > 0 ? (
            <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
              In Stock
            </Typography>
          ) : (
            <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
              Out of Stock
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions 
        className="product-actions"
        sx={{ 
          p: 2, 
          pt: 0,
          opacity: { xs: 1, sm: 0 },
          transition: 'opacity 0.2s'
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<CartIcon />}
          onClick={handleAddToCart}
          disabled={stock === 0}
          sx={{ 
            fontWeight: 500,
            color: theme.palette.text.primary
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
});

export default ProductCard; 
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Breadcrumbs,
  Link,
  Rating,
  Tabs,
  Tab,
  Divider,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  useTheme,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  SupportAgent as SupportIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.images[0]);
        
        // Set default selections if available
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        
        // Create dummy product for demonstration
        const dummyProduct = {
          id,
          name: 'Sample Product',
          description: 'This is a detailed description of the product. It includes information about the materials, features, and benefits of using this product.',
          price: 149.99,
          discountPrice: 129.99,
          category: 'rugby',
          subcategory: 'jerseys',
          stock: 15,
          rating: 4.5,
          numReviews: 12,
          images: [
            '/images/products/rugby/rugby1.jpg',
            '/images/products/rugby/rugby2.jpg',
            '/images/products/rugby/rugby3.jpg',
          ],
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Red', 'Blue', 'Black'],
          features: [
            'Moisture-wicking fabric',
            'Reinforced seams',
            'UV protection',
            'Quick-dry technology',
          ],
          materials: ['95% Polyester', '5% Elastane'],
          brand: 'Hanu Sports',
          sku: 'HS-RJ-001',
          weight: 0.35,
          dimensions: {
            length: 25,
            width: 20,
            height: 5,
          },
          customizable: true,
          reviews: [
            {
              user: 'John Doe',
              rating: 5,
              comment: 'Excellent quality jersey, fits perfectly!',
              createdAt: '2023-09-15',
            },
            {
              user: 'Jane Smith',
              rating: 4,
              comment: 'Very comfortable and great looking. Just a bit pricey.',
              createdAt: '2023-09-10',
            },
          ],
        };
        
        setProduct(dummyProduct);
        setMainImage(dummyProduct.images[0]);
        
        if (dummyProduct.sizes && dummyProduct.sizes.length > 0) {
          setSelectedSize(dummyProduct.sizes[0]);
        }
        if (dummyProduct.colors && dummyProduct.colors.length > 0) {
          setSelectedColor(dummyProduct.colors[0]);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading product details...</Typography>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => Math.min(prev + 1, product.stock));
    } else if (action === 'decrease') {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const formatCategoryName = (cat) => {
    if (!cat) return '';
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Link component={RouterLink} to="/products" color="inherit">
          Products
        </Link>
        <Link 
          component={RouterLink} 
          to={`/categories/${product.category}`} 
          color="inherit"
        >
          {formatCategoryName(product.category)}
        </Link>
        <Typography color="text.primary">
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={mainImage}
              alt={product.name}
              sx={{ 
                height: { xs: 300, sm: 400, md: 500 },
                objectFit: 'contain',
                bgcolor: '#f5f5f5',
              }}
            />
          </Card>
          
          {/* Thumbnail Images */}
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
            {product.images.map((image, index) => (
              <Card 
                key={index}
                onClick={() => setMainImage(image)}
                sx={{ 
                  width: 80, 
                  height: 80, 
                  flexShrink: 0,
                  cursor: 'pointer',
                  border: mainImage === image ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`${product.name} - view ${index + 1}`}
                  sx={{ 
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
            </Typography>
            <Chip 
              label={product.subcategory} 
              size="small" 
              sx={{ ml: 2, textTransform: 'capitalize' }} 
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
            {product.discountPrice ? (
              <>
                <Typography variant="h4" color="error.main" fontWeight={600}>
                  ₹{(product.discountPrice * 83).toFixed(0)}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', ml: 2 }}
                >
                  ₹{(product.price * 83).toFixed(0)}
                </Typography>
                <Chip 
                  label={`SAVE ₹${((product.price - product.discountPrice) * 83).toFixed(0)}`} 
                  color="error" 
                  size="small" 
                  sx={{ ml: 2 }} 
                />
              </>
            ) : (
              <Typography variant="h4" fontWeight={600}>
                ₹{(product.price * 83).toFixed(0)}
              </Typography>
            )}
          </Box>
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Product Options */}
          <Box sx={{ mb: 3 }}>
            {product.sizes && product.sizes.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                  Size
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'contained' : 'outlined'}
                      color={selectedSize === size ? 'primary' : 'inherit'}
                      onClick={() => setSelectedSize(size)}
                      sx={{ 
                        minWidth: 48, 
                        height: 48,
                        borderRadius: 1,
                        color: selectedSize === size ? theme.palette.text.primary : undefined,
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}
            
            {product.colors && product.colors.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                  Color
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'contained' : 'outlined'}
                      color={selectedColor === color ? 'primary' : 'inherit'}
                      onClick={() => setSelectedColor(color)}
                      sx={{ 
                        minWidth: 80,
                        borderRadius: 1,
                        color: selectedColor === color ? theme.palette.text.primary : undefined,
                      }}
                    >
                      {color}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Quantity
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                  sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                
                <TextField
                  value={quantity}
                  inputProps={{ 
                    readOnly: true,
                    style: { textAlign: 'center' }
                  }}
                  sx={{ 
                    width: 60,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    },
                  }}
                />
                
                <IconButton
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= product.stock}
                  sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <AddIcon />
                </IconButton>
                
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {product.stock} available
                </Typography>
              </Stack>
            </Box>
          </Box>
          
          {/* Add to Cart */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              fullWidth
              sx={{ 
                py: 1.5,
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<FavoriteIcon />}
              sx={{ 
                py: 1.5,
                minWidth: 'auto',
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Wishlist</Box>
            </Button>
          </Box>
          
          {/* Product Highlights */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Product Highlights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {product.features && product.features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                    }} 
                  />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          {/* Product Details */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 3, rowGap: 1 }}>
            <Typography variant="body2">
              <strong>SKU:</strong> {product.sku}
            </Typography>
            <Typography variant="body2">
              <strong>Brand:</strong> {product.brand}
            </Typography>
            {product.weight && (
              <Typography variant="body2">
                <strong>Weight:</strong> {product.weight} kg
              </Typography>
            )}
            {product.materials && (
              <Typography variant="body2">
                <strong>Materials:</strong> {product.materials.join(', ')}
              </Typography>
            )}
          </Box>
          
          {/* Shipping & Returns */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 1.5, 
                    textAlign: 'center',
                    borderRadius: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShippingIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2" fontWeight={500}>
                    Free Shipping
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    On orders over $100
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 1.5, 
                    textAlign: 'center',
                    borderRadius: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SecurityIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2" fontWeight={500}>
                    Secure Payment
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Safe transactions
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 1.5, 
                    textAlign: 'center',
                    borderRadius: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SupportIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2" fontWeight={500}>
                    Support 24/7
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Dedicated support
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6, mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              minWidth: 100,
            },
          }}
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label={`Reviews (${product.numReviews})`} />
          {product.customizable && <Tab label="Customization" />}
        </Tabs>
        
        <Box sx={{ py: 3 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              {product.features && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Features</Typography>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <Typography variant="body1">{feature}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          )}
          
          {activeTab === 1 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Product Specifications</Typography>
                  <TableLikeList 
                    items={[
                      { label: 'Brand', value: product.brand },
                      { label: 'SKU', value: product.sku },
                      { label: 'Weight', value: product.weight ? `${product.weight} kg` : 'N/A' },
                      { label: 'Materials', value: product.materials ? product.materials.join(', ') : 'N/A' },
                      { label: 'Dimensions', value: product.dimensions ? 
                        `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} cm` : 
                        'N/A'
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Shipping Information</Typography>
                  <TableLikeList 
                    items={[
                      { label: 'Delivery Time', value: '3-5 business days' },
                      { label: 'Free Shipping', value: 'On orders over $100' },
                      { label: 'Returns', value: '30 days free returns' },
                      { label: 'Warranty', value: '1 year limited warranty' },
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
              
              {product.reviews && product.reviews.length > 0 ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                      {product.rating.toFixed(1)}
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                      <Rating value={product.rating} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        Based on {product.numReviews} reviews
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  {product.reviews.map((review, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {review.user}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.createdAt}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {review.comment}
                      </Typography>
                      {index < product.reviews.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1">
                    There are no reviews yet for this product.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, color: theme.palette.text.primary }}
                  >
                    Be the First to Review
                  </Button>
                </Box>
              )}
            </Box>
          )}
          
          {activeTab === 3 && product.customizable && (
            <Box>
              <Typography variant="h6" gutterBottom>Customization Options</Typography>
              <Typography variant="body1" paragraph>
                Personalize your {product.name} with custom text, numbers, and more.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Custom Text"
                    fullWidth
                    margin="normal"
                    placeholder="Enter name or text to print"
                    helperText="Maximum 12 characters"
                  />
                  
                  <TextField
                    label="Number"
                    fullWidth
                    margin="normal"
                    placeholder="Enter number"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Text Position</InputLabel>
                    <Select defaultValue="back">
                      <MenuItem value="back">Back</MenuItem>
                      <MenuItem value="front">Front</MenuItem>
                      <MenuItem value="sleeve">Sleeve</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Text Color</InputLabel>
                    <Select defaultValue="white">
                      <MenuItem value="white">White</MenuItem>
                      <MenuItem value="gold">Gold</MenuItem>
                      <MenuItem value="black">Black</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Note: Customized items cannot be returned unless defective.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

// Helper component for table-like display
const TableLikeList = ({ items }) => {
  return (
    <Box>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Box 
            sx={{ 
              display: 'flex', 
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" sx={{ width: '40%', fontWeight: 500 }}>
              {item.label}
            </Typography>
            <Typography variant="body2" sx={{ width: '60%' }}>
              {item.value}
            </Typography>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ProductDetail; 
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import ProductList from '../components/products/ProductList';

const Products = () => {
  const theme = useTheme();
  const { category } = useParams();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500],
    search: '',
    sortBy: 'newest',
  });
  const [categoryOptions, setCategoryOptions] = useState([
    'rugby',
    'volleyball',
    'field-hockey',
    'track-field',
    'soccer',
    'off-field',
  ]);

  // Parse category name for display
  const formatCategoryName = (cat) => {
    if (!cat) return '';
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pageTitle = category ? `${formatCategoryName(category)} Products` : 'All Products';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you'd filter by category on the server
        const url = category
          ? `http://localhost:5000/api/products?category=${category}`
          : 'http://localhost:5000/api/products';
          
        const response = await axios.get(url);
        
        if (response.data) {
          setProducts(response.data);
          setFilteredProducts(response.data);
          
          // Extract unique categories for filter options
          if (!category) {
            const uniqueCategories = [...new Set(response.data.map(product => product.category))];
            setCategoryOptions(uniqueCategories);
          }
          
          // If category is specified in URL, set it in filters
          if (category) {
            setFilters(prevFilters => ({
              ...prevFilters,
              categories: [category],
            }));
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        
        // Create dummy products for demonstration
        const createDummyProducts = () => {
          const categories = ['rugby', 'volleyball', 'field-hockey', 'track-field', 'soccer', 'off-field'];
          const dummyProducts = Array(24).fill().map((_, idx) => {
            const category = categories[idx % categories.length]; 
            // Format category for file path
            const fileCategory = category.replace('-', '_');
            
            // Specific file patterns for each category based on available files
            let imagePath;
            switch(fileCategory) {
              case 'rugby':
                imagePath = `/images/products/${fileCategory}/${fileCategory}_${9}_${idx % 3}.jpeg`;
                break;
              case 'volleyball':
                imagePath = `/images/products/${fileCategory}/${fileCategory}_${40}_${idx % 3}.jpeg`;
                break;
              case 'soccer':
                imagePath = `/images/products/${fileCategory}/${fileCategory}_${90}_${idx % 3}.jpeg`;
                break;
              case 'field_hockey':
              case 'track_field':
              case 'off_field':
              default:
                // For categories without specific images, use a default pattern or placeholder
                imagePath = `/images/products/placeholder.jpg`;
            }
            
            return {
              id: `dummy-${idx}`,
              name: `Sample ${formatCategoryName(category)} Product ${idx + 1}`,
              description: "This is a placeholder product for demonstration.",
              price: 49.99 + (idx * 10),
              discountPrice: idx % 3 === 0 ? 39.99 + (idx * 8) : null,
              category: category,
              subcategory: 'Equipment',
              stock: 10,
              rating: 3 + (idx % 3),
              numReviews: 10 + idx,
              images: [imagePath],
            };
          });
          
          if (category) {
            return dummyProducts.filter(p => p.category === category);
          }
          return dummyProducts;
        };
        
        const dummyProducts = createDummyProducts();
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }
    
    // Filter by price range
    result = result.filter(
      product => {
        const price = product.discountPrice || product.price;
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      }
    );
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description?.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Assuming newest is default, no additional sorting needed
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, products]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryChange = (event) => {
    const { checked, value } = event.target;
    
    setFilters(prevFilters => ({
      ...prevFilters,
      categories: checked
        ? [...prevFilters.categories, value]
        : prevFilters.categories.filter(cat => cat !== value),
    }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: newValue,
    }));
  };

  const handleSearchChange = (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search: event.target.value,
    }));
  };

  const handleSortChange = (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      sortBy: event.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: category ? [category] : [],
      priceRange: [0, 500],
      search: '',
      sortBy: 'newest',
    });
  };

  // Find max price for slider
  const maxPrice = Math.max(...products.map(p => p.price), 500);

  const filterDrawer = (
    <Box sx={{ width: 280, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>Filters</Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Search Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Search
        </Typography>
        <TextField
          placeholder="Search products..."
          variant="outlined"
          fullWidth
          size="small"
          value={filters.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Category Filter */}
      {!category && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Categories
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              {categoryOptions.map((cat) => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox
                      checked={filters.categories.includes(cat)}
                      onChange={handleCategoryChange}
                      value={cat}
                      size="small"
                    />
                  }
                  label={formatCategoryName(cat)}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      )}
      
      {/* Price Range Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxPrice * 83}
            step={100}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">₹{(filters.priceRange[0]).toFixed(0)}</Typography>
            <Typography variant="body2">₹{(filters.priceRange[1]).toFixed(0)}</Typography>
          </Box>
        </Box>
      </Box>
      
      <Button
        variant="outlined"
        fullWidth
        onClick={clearFilters}
        sx={{ mt: 2 }}
      >
        Clear Filters
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        {category ? (
          <>
            <Link component={RouterLink} to="/products" color="inherit">
              Products
            </Link>
            <Typography color="text.primary">{formatCategoryName(category)}</Typography>
          </>
        ) : (
          <Typography color="text.primary">Products</Typography>
        )}
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Filters - Desktop */}
        <Grid item xs={12} md={3} lg={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          {filterDrawer}
        </Grid>
        
        {/* Products */}
        <Grid item xs={12} md={9} lg={10}>
          {/* Page Title and Mobile Filter Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" fontWeight={600}>
              {pageTitle}
            </Typography>
            
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Button
                startIcon={<FilterIcon />}
                variant="outlined"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                Filters
              </Button>
            </Box>
          </Box>
          
          {/* Sort and Results Count */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Typography variant="body1" color="text.secondary">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Sort by:</Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  displayEmpty
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          {/* Active Filters */}
          {(filters.categories.length > 0 || filters.search || filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice * 83) && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Typography variant="body2" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                Active filters:
              </Typography>
              
              {filters.search && (
                <Chip 
                  label={`Search: ${filters.search}`} 
                  onDelete={() => setFilters(prev => ({ ...prev, search: '' }))}
                  size="small"
                />
              )}
              
              {filters.categories.map(cat => (
                <Chip 
                  key={cat}
                  label={`Category: ${formatCategoryName(cat)}`}
                  onDelete={() => setFilters(prev => ({ 
                    ...prev, 
                    categories: prev.categories.filter(c => c !== cat)
                  }))}
                  size="small"
                />
              ))}
              
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice * 83) && (
                <Chip 
                  label={`Price: ₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`}
                  onDelete={() => setFilters(prev => ({ ...prev, priceRange: [0, maxPrice * 83] }))}
                  size="small"
                />
              )}
              
              <Button 
                variant="text" 
                size="small" 
                onClick={clearFilters}
                sx={{ ml: 1 }}
              >
                Clear All
              </Button>
            </Box>
          )}
          
          {/* Product Grid */}
          <ProductList products={filteredProducts} loading={loading} />
          
          {/* No Results Message */}
          {!loading && filteredProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>No products found</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your filters or search criteria
              </Typography>
              <Button variant="outlined" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      
      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        {filterDrawer}
      </Drawer>
    </Container>
  );
};

export default Products; 
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Button,
  styled
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import ProductCard from '../components/products/ProductCard';

const FilterDrawer = styled(Box)(({ theme }) => ({
  width: 250,
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    width: 280,
  },
}));

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Filter states
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCategory(params.get('category') || 'all');
    setSort(params.get('sort') || 'newest');
    setSearch(params.get('search') || '');
    setPage(parseInt(params.get('page')) || 1);
  }, [location]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: category !== 'all' ? category : '',
          sort,
          search,
          page,
          minPrice: priceRange[0],
          maxPrice: priceRange[1]
        });

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category, sort, search, page, priceRange]);

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(location.search);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleFilterChange = (type, value) => {
    setPage(1);
    updateFilters({ [type]: value, page: 1 });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    handleFilterChange('search', search);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    updateFilters({ page: value });
  };

  const FilterContent = () => (
    <FilterDrawer>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Box mb={3}>
        <Typography gutterBottom>Category</Typography>
        <FormControl fullWidth size="small">
          <Select
            value={category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="rugby">Rugby</MenuItem>
            <MenuItem value="volleyball">Volleyball</MenuItem>
            <MenuItem value="field-hockey">Field Hockey</MenuItem>
            <MenuItem value="track-field">Track & Field</MenuItem>
            <MenuItem value="soccer">Soccer</MenuItem>
            <MenuItem value="off-field">Off-Field Gear</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={3}>
        <Typography gutterBottom>Sort By</Typography>
        <FormControl fullWidth size="small">
          <Select
            value={sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="price_low">Price: Low to High</MenuItem>
            <MenuItem value="price_high">Price: High to Low</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={3}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          onChangeCommitted={() => handleFilterChange('price', priceRange.join('-'))}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          valueLabelFormat={(value) => `$${value}`}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>
    </FilterDrawer>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h4" component="h1">
              Products
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Grid>
          {isMobile && (
            <Grid item>
              <Button
                startIcon={<FilterIcon />}
                onClick={() => setMobileFilterOpen(true)}
              >
                Filters
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid item md={3}>
            <FilterContent />
          </Grid>
        )}
        
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {loading ? (
              <Grid item xs={12}>
                <Typography>Loading...</Typography>
              </Grid>
            ) : products.length === 0 ? (
              <Grid item xs={12}>
                <Typography>No products found.</Typography>
              </Grid>
            ) : (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      >
        <FilterContent />
      </Drawer>
    </Container>
  );
};

export default Products; 
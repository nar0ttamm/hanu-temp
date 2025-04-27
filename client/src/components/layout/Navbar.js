import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  InputBase, 
  Badge, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider, 
  useTheme, 
  styled, 
  Container, 
  Button, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ShoppingCart, 
  Menu as MenuIcon, 
  Person, 
  SportsSoccer, 
  SportsCricket,
  SportsRugby, 
  SportsVolleyball,
  ExpandMore,
  Favorite, 
  History,
  ExitToApp
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    flexGrow: 1,
    maxWidth: 400,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.accent1.main,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 5, 1, 2),
    width: '100%',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.accent2.main,
    color: 'white',
    fontWeight: 'bold',
  },
}));

const categories = [
  { id: 'rugby', name: 'Rugby', icon: <SportsRugby /> },
  { id: 'volleyball', name: 'Volleyball', icon: <SportsVolleyball /> },
  { id: 'field-hockey', name: 'Field Hockey', icon: <SportsCricket /> },
  { id: 'track-field', name: 'Track & Field', icon: <SportsSoccer /> },
  { id: 'soccer', name: 'Soccer', icon: <SportsSoccer /> },
  { id: 'off-field', name: 'Off-Field', icon: <SportsSoccer /> },
];

const Navbar = () => {
  const theme = useTheme();
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryMenuOpen = (event) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenuAnchor(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/products' },
    { text: 'Team Customization', path: '/customize' },
    { text: 'About Us', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Link to="/">
          <Box component="img" src="/images/logo.svg" alt="Hanu Sports" sx={{ height: 40 }} />
        </Link>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ fontWeight: 'bold', mb: 1, px: 2 }}>Categories</Box>
      </Box>
      <List>
        {categories.map((category) => (
          <ListItem 
            button 
            key={category.id} 
            component={Link} 
            to={`/categories/${category.id}`}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ 
        backgroundColor: theme.palette.primary.main, 
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        color: theme.palette.text.primary 
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box component="img" src="/images/logo.svg" alt="Hanu Sports" sx={{ height: 45, display: { xs: 'none', sm: 'block' } }} />
              <Box component="img" src="/images/logo-small.svg" alt="Hanu Sports" sx={{ height: 35, display: { xs: 'block', sm: 'none' } }} />
            </Link>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {menuItems.filter(item => item.text !== 'Home').map((item, index) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    color: theme.palette.text.primary, 
                    fontWeight: 500,
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                endIcon={<ExpandMore />}
                onClick={handleCategoryMenuOpen}
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontWeight: 500,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Categories
              </Button>
              <Menu
                anchorEl={categoryMenuAnchor}
                open={Boolean(categoryMenuAnchor)}
                onClose={handleCategoryMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    width: 200,
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem 
                    key={category.id} 
                    component={Link} 
                    to={`/categories/${category.id}`}
                    onClick={handleCategoryMenuClose}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    {category.icon}
                    {category.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Search sx={{ ml: { xs: 1, sm: 2 } }}>
              <StyledInputBase
                placeholder="Search for products..."
                inputProps={{ 'aria-label': 'search' }}
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </Search>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <IconButton 
                color="inherit" 
                aria-label="account"
                onClick={handleAccountMenuOpen}
              >
                <Person />
              </IconButton>
              <Menu
                anchorEl={accountMenuAnchor}
                open={Boolean(accountMenuAnchor)}
                onClose={handleAccountMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
                  },
                }}
              >
                <MenuItem 
                  component={Link} 
                  to="/account"
                  onClick={handleAccountMenuClose}
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  My Account
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/orders"
                  onClick={handleAccountMenuClose}
                >
                  <ListItemIcon>
                    <History fontSize="small" />
                  </ListItemIcon>
                  Order History
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/wishlist"
                  onClick={handleAccountMenuClose}
                >
                  <ListItemIcon>
                    <Favorite fontSize="small" />
                  </ListItemIcon>
                  Wishlist
                </MenuItem>
                <Divider />
                <MenuItem 
                  component={Link} 
                  to="/logout"
                  onClick={handleAccountMenuClose}
                >
                  <ListItemIcon>
                    <ExitToApp fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/cart"
                sx={{ ml: 1 }}
              >
                <StyledBadge badgeContent={cartItemCount} color="error">
                  <ShoppingCart />
                </StyledBadge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Badge, IconButton, Box, Drawer, List, ListItem, ListItemText, useTheme, styled } from '@mui/material';
import { Search as SearchIcon, ShoppingCart, Menu as MenuIcon, Person } from '@mui/icons-material';

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

const Navbar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Explore Categories', path: '/categories' },
    { text: 'Team Customization', path: '/customize' },
    { text: 'About Us', path: '/about' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <Box component="img" src="/images/logo.svg" alt="Hanu Sports" sx={{ height: 45 }} />
          </Link>

          <Search>
            <StyledInputBase
              placeholder="Search for products..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.8rem' }}>{item.text.split(' ')[0]}</span>
                <span>{item.text.split(' ')[1]}</span>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            <IconButton color="inherit" component={Link} to="/account">
              <Person />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="accent1">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 
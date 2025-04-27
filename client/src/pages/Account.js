import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Grid, 
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Alert,
  IconButton
} from '@mui/material';
import { 
  Person as PersonIcon,
  Settings as SettingsIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

// Dummy user data for demo purposes
const dummyUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (234) 567-890',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  avatar: '/images/products/off_field/off_field1.jpg' // Placeholder image
};

const Account = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(dummyUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(dummyUser);
  const [notification, setNotification] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      setFormData(user);
    }
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
    setNotification({
      type: 'success',
      message: 'Profile updated successfully!'
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const renderProfileTab = () => (
    <Box>
      {notification && (
        <Alert 
          severity={notification.type} 
          sx={{ mb: 3 }}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          My Profile
        </Typography>
        <IconButton 
          color={editMode ? 'error' : 'primary'} 
          onClick={handleEditToggle}
        >
          {editMode ? <CancelIcon /> : <EditIcon />}
        </IconButton>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar 
              src={user.avatar}
              alt={user.name}
              sx={{ 
                width: 150, 
                height: 150, 
                mx: 'auto', 
                mb: 2,
                border: '4px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            />
            <Typography variant="h6" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since Jan 2023
            </Typography>
            
            {editMode && (
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
              >
                Change Photo
              </Button>
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {editMode ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Full Name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email Address"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address.street"
                    label="Street Address"
                    fullWidth
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.city"
                    label="City"
                    fullWidth
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.state"
                    label="State/Province"
                    fullWidth
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.zipCode"
                    label="Zip/Postal Code"
                    fullWidth
                    value={formData.address.zipCode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address.country"
                    label="Country"
                    fullWidth
                    value={formData.address.country}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{ mr: 1 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <List>
                <ListItem divider>
                  <ListItemText 
                    primary="Full Name" 
                    secondary={user.name} 
                    primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText 
                    primary="Email Address" 
                    secondary={user.email} 
                    primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText 
                    primary="Phone Number" 
                    secondary={user.phone} 
                    primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Address" 
                    secondary={`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}, ${user.address.country}`} 
                    primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSettingsTab = () => (
    <Box>
      <Typography variant="h5" component="h2" fontWeight={600} sx={{ mb: 3 }}>
        Account Settings
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Account settings page is under construction.
      </Typography>
    </Box>
  );

  const renderWishlistTab = () => (
    <Box>
      <Typography variant="h5" component="h2" fontWeight={600} sx={{ mb: 3 }}>
        My Wishlist
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Wishlist page is under construction.
      </Typography>
    </Box>
  );

  const renderOrdersTab = () => (
    <Box>
      <Typography variant="h5" component="h2" fontWeight={600} sx={{ mb: 3 }}>
        Order History
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Order history page is under construction.
      </Typography>
    </Box>
  );

  const renderSelectedTab = () => {
    switch (tabValue) {
      case 0:
        return renderProfileTab();
      case 1:
        return renderSettingsTab();
      case 2:
        return renderWishlistTab();
      case 3:
        return renderOrdersTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 4 }}>
        My Account
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  py: 2
                }
              }}
            >
              <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
              <Tab icon={<SettingsIcon />} label="Settings" iconPosition="start" />
              <Tab icon={<FavoriteIcon />} label="Wishlist" iconPosition="start" />
              <Tab icon={<HistoryIcon />} label="Orders" iconPosition="start" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {renderSelectedTab()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account; 
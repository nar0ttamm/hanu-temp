import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Divider,
  Stack,
  Alert,
  IconButton,
  CircularProgress,
  InputAdornment,
  Card,
  CardMedia
} from '@mui/material';
import {
  AddCircleOutline as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as BackIcon,
  Save as SaveIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';

const CATEGORIES = ['rugby', 'volleyball', 'field-hockey', 'track-field', 'soccer', 'off-field'];

const SUBCATEGORIES = {
  'rugby': ['jerseys', 'shorts', 'protective-gear', 'balls', 'training-equipment', 'accessories'],
  'volleyball': ['uniforms', 'shoes', 'protective-gear', 'balls', 'nets', 'accessories'],
  'field-hockey': ['sticks', 'uniforms', 'protective-gear', 'balls', 'training-equipment', 'accessories'],
  'track-field': ['running-shoes', 'uniforms', 'equipment', 'accessories'],
  'soccer': ['jerseys', 'shorts', 'cleats', 'balls', 'protective-gear', 'training-equipment', 'accessories'],
  'off-field': ['t-shirts', 'hoodies', 'pants', 'shorts', 'backpacks', 'accessories']
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    discountPrice: '',
    stock: '',
    images: [],
    sizes: [],
    colors: [],
    features: [],
    brand: '',
    sku: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    materials: [],
    tags: [],
    isActive: true,
    customizable: false,
    customizationOptions: {}
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newTag, setNewTag] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (formData.category) {
      setAvailableSubcategories(SUBCATEGORIES[formData.category] || []);
      // Reset subcategory if the current one isn't valid for the new category
      if (!SUBCATEGORIES[formData.category]?.includes(formData.subcategory)) {
        setFormData(prev => ({ ...prev, subcategory: '' }));
      }
    }
  }, [formData.category]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product data');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleAddColor = () => {
    if (newColor.trim()) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()]
      }));
      setNewColor('');
    }
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleAddSize = () => {
    if (newSize.trim()) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }));
      setNewSize('');
    }
  };

  const handleRemoveSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setFormData((prev) => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()]
      }));
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (index) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setImageUploading(true);
      
      // In a real app, we would upload to a server/cloud storage
      // For this example, we'll simulate image upload with local URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      
      // In production, you would get back URLs from your API
      // const formData = new FormData();
      // Array.from(files).forEach(file => {
      //   formData.append('images', file);
      // });
      // 
      // const response = await axios.post('/api/upload', formData, {
      //   headers: { 
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const newImages = response.data.urls;
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
      
      setImageUploading(false);
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Failed to upload images');
      setImageUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(false);
      setSubmitting(true);
      
      const token = localStorage.getItem('token');
      
      // In production, you would replace placeholder image URLs with real ones
      // For now, we're using the URLs directly
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        dimensions: {
          length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : undefined,
        }
      };
      
      if (isEditMode) {
        await axios.put(`/api/products/${id}`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/products', productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setSuccess(true);
      setSubmitting(false);
      
      // Navigate back to products list after short delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.response?.data?.message || 'Failed to save product');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/admin/products')}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>
      
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {isEditMode ? 'Edit Product' : 'Add New Product'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Product {isEditMode ? 'updated' : 'created'} successfully!
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Basic Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required disabled={!formData.category}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  label="Subcategory"
                >
                  {availableSubcategories.map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('-', ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Pricing & Inventory
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price ($)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Discount Price ($)"
                name="discountPrice"
                type="number"
                value={formData.discountPrice}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    name="isActive"
                  />
                }
                label="Active (Available for purchase)"
              />
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Images
          </Typography>
          
          <Grid container spacing={2}>
            {formData.images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={`Product image ${index + 1}`}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
            
            <Grid item xs={6} sm={4} md={3}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadIcon />}
                sx={{ 
                  height: '140px', 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                disabled={imageUploading}
              >
                {imageUploading ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    Upload Images
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Variants & Features
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                Sizes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.sizes.map((size, index) => (
                  <Chip
                    key={index}
                    label={size}
                    onDelete={() => handleRemoveSize(index)}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  label="Add Size"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  onClick={handleAddSize} 
                  disabled={!newSize.trim()}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                Colors
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.colors.map((color, index) => (
                  <Chip
                    key={index}
                    label={color}
                    onDelete={() => handleRemoveColor(index)}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  label="Add Color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  onClick={handleAddColor} 
                  disabled={!newColor.trim()}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                Materials
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.materials.map((material, index) => (
                  <Chip
                    key={index}
                    label={material}
                    onDelete={() => handleRemoveMaterial(index)}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  label="Add Material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  onClick={handleAddMaterial} 
                  disabled={!newMaterial.trim()}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                Product Features
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => handleRemoveFeature(index)}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  label="Add Feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  onClick={handleAddFeature} 
                  disabled={!newFeature.trim()}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(index)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size="small"
                  label="Add Tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  onClick={handleAddTag} 
                  disabled={!newTag.trim()}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Additional Details
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Dimensions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Length (cm)"
                    name="length"
                    type="number"
                    value={formData.dimensions.length}
                    onChange={handleDimensionChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Width (cm)"
                    name="width"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={handleDimensionChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    name="height"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={handleDimensionChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.customizable}
                    onChange={handleCheckboxChange}
                    name="customizable"
                  />
                }
                label="Product is customizable"
              />
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            type="button" 
            variant="outlined" 
            onClick={() => navigate('/admin/products')}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
            disabled={submitting}
          >
            {submitting ? (
              <CircularProgress size={24} />
            ) : (
              isEditMode ? 'Update Product' : 'Create Product'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm; 
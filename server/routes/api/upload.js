const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../../client/public/images/products');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

/**
 * @route   POST /api/upload
 * @desc    Upload product images
 * @access  Private/Admin
 */
router.post('/', auth, admin, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Convert file paths to URLs for frontend
    const urls = req.files.map(file => {
      // Get the relative path to be used in frontend
      const relativePath = file.path.split('public')[1];
      return relativePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    });
    
    res.json({
      message: 'Files uploaded successfully',
      urls
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
});

/**
 * @route   DELETE /api/upload
 * @desc    Delete a product image
 * @access  Private/Admin
 */
router.delete('/', auth, admin, (req, res) => {
  try {
    const { imagePath } = req.body;
    
    if (!imagePath) {
      return res.status(400).json({ message: 'No image path provided' });
    }
    
    // Ensure path is valid and within the product images directory
    const fullPath = path.join(__dirname, '../../../client/public', imagePath);
    const productsDir = path.join(__dirname, '../../../client/public/images/products');
    
    if (!fullPath.startsWith(productsDir)) {
      return res.status(403).json({ message: 'Invalid file path' });
    }
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Delete the file
    fs.unlinkSync(fullPath);
    
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('File delete error:', error);
    res.status(500).json({ message: 'Server error during file deletion' });
  }
});

module.exports = router; 
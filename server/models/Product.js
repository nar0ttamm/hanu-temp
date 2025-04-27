const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['rugby', 'volleyball', 'field-hockey', 'track-field', 'soccer', 'off-field']
  },
  subcategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  features: [{
    type: String
  }],
  customizable: {
    type: Boolean,
    default: false
  },
  customizationOptions: {
    type: Map,
    of: String
  },
  brand: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  weight: {
    type: Number
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  materials: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ sku: 1 });

// Virtual for url
productSchema.virtual('url').get(function() {
  return `/products/${this._id}`;
});

// Method to calculate average rating
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    this.rating = this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 
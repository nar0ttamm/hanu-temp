const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  addresses: [{
    type: {
      type: String,
      enum: ['billing', 'shipping'],
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  cart: {
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      size: String,
      color: String,
      customization: {
        type: Map,
        of: String
      }
    }],
    total: {
      type: Number,
      default: 0
    }
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  phoneNumber: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    marketing: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get full name virtual
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Cart methods
userSchema.methods.addToCart = async function(productId, quantity = 1, size = null, color = null, customization = null) {
  const cartItemIndex = this.cart.items.findIndex(item => 
    item.product.toString() === productId.toString() &&
    item.size === size &&
    item.color === color
  );

  if (cartItemIndex >= 0) {
    // Update existing item
    this.cart.items[cartItemIndex].quantity += quantity;
  } else {
    // Add new item
    this.cart.items.push({
      product: productId,
      quantity,
      size,
      color,
      customization
    });
  }

  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  this.cart.items = this.cart.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart.items = [];
  this.cart.total = 0;
  return this.save();
};

// Add indexes
userSchema.index({ email: 1 });
userSchema.index({ 'addresses.zipCode': 1 });

const User = mongoose.model('User', userSchema);

module.exports = User; 
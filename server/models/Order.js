const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    size: String,
    color: String,
    customization: {
      type: Map,
      of: String
    }
  }],
  shippingAddress: {
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
    }
  },
  billingAddress: {
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
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  subtotal: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    required: true
  },
  shippingAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: Date,
  isShipped: {
    type: Boolean,
    default: false
  },
  shippedAt: Date,
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  trackingNumber: String,
  shippingCarrier: String,
  estimatedDeliveryDate: Date,
  notes: String,
  cancelReason: String,
  refundStatus: {
    type: String,
    enum: ['none', 'pending', 'completed'],
    default: 'none'
  },
  refundAmount: Number,
  refundedAt: Date
}, {
  timestamps: true
});

// Add indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ 'paymentResult.id': 1 });

// Virtual for order number
orderSchema.virtual('orderNumber').get(function() {
  return `ORD-${this._id.toString().slice(-6).toUpperCase()}`;
});

// Method to calculate order totals
orderSchema.methods.calculateTotals = function() {
  // Calculate subtotal
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Calculate tax (assuming 10%)
  this.taxAmount = this.subtotal * 0.10;

  // Calculate shipping (flat rate for now)
  this.shippingAmount = 10;

  // Calculate total
  this.totalAmount = this.subtotal + this.taxAmount + this.shippingAmount;

  return this.save();
};

// Method to update order status
orderSchema.methods.updateStatus = function(status) {
  this.orderStatus = status;

  switch (status) {
    case 'processing':
      if (this.isPaid) {
        this.paidAt = new Date();
      }
      break;
    case 'shipped':
      this.isShipped = true;
      this.shippedAt = new Date();
      break;
    case 'delivered':
      this.isDelivered = true;
      this.deliveredAt = new Date();
      break;
  }

  return this.save();
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 
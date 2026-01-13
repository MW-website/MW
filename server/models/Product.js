import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  tags: [String],
  image: {
    type: String,
    required: true
  },
  images: [String],
  colors: [String],
  sizes: [String],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  stockHistory: [{
    quantity: Number,
    type: { type: String, enum: ['restock', 'sale', 'adjustment'] },
    reason: String,
    timestamp: { type: Date, default: Date.now }
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Method to check stock availability
productSchema.methods.hasStock = function(quantity = 1) {
  return this.stock >= quantity;
};

// Method to decrease stock
productSchema.methods.decreaseStock = async function(quantity, reason = 'sale') {
  if (this.stock < quantity) {
    throw new Error('Insufficient stock');
  }
  
  this.stock -= quantity;
  this.stockHistory.push({
    quantity: -quantity,
    type: 'sale',
    reason
  });
  
  await this.save();
};

// Method to increase stock
productSchema.methods.increaseStock = async function(quantity, reason = 'restock') {
  this.stock += quantity;
  this.stockHistory.push({
    quantity,
    type: 'restock',
    reason
  });
  
  await this.save();
};

export default mongoose.model('Product', productSchema);

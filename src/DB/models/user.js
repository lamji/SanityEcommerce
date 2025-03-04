import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      regularPrice: { type: Number, required: true },
      interest: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      isDiscounted: { type: Boolean, required: true },
      description: { type: String, default: '' },
      images: { type: [String], default: [] }, // Array of image URLs
      stock: { type: Number, required: true },
      featuredImageIndex: { type: Number, required: true },
      priceWithInterest: { type: Number, default: null },
      discountedPrice: { type: Number, default: null },
      createdAt: { type: Date, default: Date.now },
      sold: { type: Number, default: 0 },
    },
  ],
}, { timestamps: true });

// Prevent OverwriteModelError
export default mongoose.models.User || mongoose.model('User', UserSchema);

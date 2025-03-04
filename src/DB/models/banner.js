import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  buttonText: { type: String, required: true },
  discount: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  smallText: { type: String, required: true },
  largeText2: { type: String, required: true },
  saleTime: { type: String, required: true },
  largeText1: { type: String, required: true },
  product: { type: String, required: true },
  midText: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Prevent OverwriteModelError
export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema); 
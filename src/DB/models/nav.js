import mongoose from 'mongoose';

const NavbarSchema = new mongoose.Schema(
  {
    header: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
export default mongoose.models.Navbar || mongoose.model('Navbar', BannerSchema);

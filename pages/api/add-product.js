import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../src/DB/models/user';
import { connectToDatabase } from '../../src/DB/lib/index';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("Add Product:", new Date().toISOString())
    try {
      await connectToDatabase();
      const authHeader = req.headers.authorization;
      const product = req.body;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      // Verify JWT token
      let decoded;
      const token = authHeader.split(' ')[1]; // Get token after 'Bearer '

      try {
        decoded = jwt.verify(token, SECRET_KEY);
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const { id: userId } = decoded;

      // Find the user
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Ensure required fields exist in the product
      if (!product || !product.name || !product.regularPrice || !product.stock) {
        return res.status(400).json({ message: 'Missing required product fields' });
      }

      const newProduct = {
        name: product.name,
        regularPrice: product.regularPrice,
        interest: product.interest || 0,
        discount: product.discount || 0,
        sold: product.sold || 0,
        isDiscounted: product.isDiscounted || false,
        description: product.description || '',
        images: product.images || [],
        stock: product.stock,
        featuredImageIndex: product.featuredImageIndex || 0,
        priceWithInterest: product.priceWithInterest || null,
        discountedPrice: product.discountedPrice || null,
      };


      // Add the product
      user?.products.push(newProduct);

      await user.save();

      return res.status(201).json({
        message: 'Product added successfully',
        product: newProduct,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

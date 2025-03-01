import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../src/DB/models/user';
import { connectToDatabase } from '../../src/DB/lib/index';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export default async function handler(req, res) {
  console.log('test');
  if (req.method === 'DELETE') {
    try {
      await connectToDatabase();
      const authHeader = req.headers.authorization;

      console.log('auth', authHeader);
      const { id: productId } = req.query;

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

      // Find the product
      const productIndex = user.products.findIndex(
        (product) => product._id.toString() === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Remove the product
      user.products.splice(productIndex, 1);

      await user.save();

      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

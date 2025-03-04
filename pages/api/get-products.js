import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../src/DB/models/user';
import { connectToDatabase } from '../../src/DB/lib/index';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase(); // Ensure DB is connected

      // Extract token from Authorization Header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1]; // Get token after 'Bearer '
      let decoded;

      try {
        decoded = jwt.verify(token, SECRET_KEY);
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      const { id: userId } = decoded;

      // Fetch the user and exclude email and password fields
      const user = await User.findById(userId).select('-email -password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Sort products by createdAt in descending order (latest first)
      const sortedProducts = user.products.sort((a, b) => b.createdAt - a.createdAt);

      return res
        .status(200)
        .json({ message: 'Products fetched successfully', products: sortedProducts });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

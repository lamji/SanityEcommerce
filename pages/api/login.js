import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../src/DB/models/user';
import { connectToDatabase } from '../../src/DB/lib/index';
// Ensure this is your MongoDB connection function

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase(); // Ensure DB is connected

      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
      }

      // Find user in the database
      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { username: existingUser.username, id: existingUser._id },
        SECRET_KEY,
        {
          expiresIn: '1d',
        }
      );

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

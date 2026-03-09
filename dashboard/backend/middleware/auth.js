import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token received:", token ? "yes" : "no");
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded, user ID:", decoded.userId);
    
    const user = await User.findById(decoded.userId);
    console.log("User found:", user ? "yes" : "no");
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log("User role:", user.role);
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

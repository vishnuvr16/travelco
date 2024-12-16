import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded user:', decoded);
      req.user = decoded;
      next();
  } catch (error) {
      console.log('Token verification failed:', error.message);
      res.status(401).json({ message: 'Token is not valid' });
  }
};


// Middleware for role-based authorization
export const checkRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
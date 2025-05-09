import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Basic authentication middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Permission checking middleware factory
export const checkPermission = (permissionType: 'createBooks' | 'modifyBooks' | 'deleteBooks' | 'modifyUsers' | 'deleteUsers') => {
  return (req: Request, res: Response, next: NextFunction) => {
    // First authenticate the user
    authenticate(req, res, (err) => {
      if (err) return next(err);
      
      // Then check if they have the required permission
      if (!req.user || !req.user.permissions || !req.user.permissions[permissionType]) {
        return res.status(403).json({ error: 'Permission denied' });
      }
      
      next();
    });
  };
};

// Middleware to check if the user is modifying their own account
export const checkSelfOrPermission = (permissionType: 'modifyUsers' | 'deleteUsers') => {
  return (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, (err) => {
      if (err) return next(err);
      
      // Allow if user is modifying their own account
      if (req.user && req.user.id === req.params.userId) {
        return next();
      }
      
      // Otherwise, check if they have the permission
      if (!req.user || !req.user.permissions || !req.user.permissions[permissionType]) {
        return res.status(403).json({ error: 'Permission denied' });
      }
      
      next();
    });
  };
};

export default authenticate;
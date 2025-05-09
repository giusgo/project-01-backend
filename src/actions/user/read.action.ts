import User, { IUser } from '../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface ReadUserInput {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    _id: string;
    email: string;
    permissions: IUser['permissions'];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

export const readUser = async (input: ReadUserInput): Promise<LoginResponse> => {
  const { email, password } = input;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new Error('User not found');
  }

  // Verify the password directly in this file
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET || 'defaultsecret';
  const token = jwt.sign(
    { 
      id: user._id,
      email: user.email,
      permissions: user.permissions 
    },
    secret,
    { expiresIn: '24h' }
  );

  // Return user data and token
  return {
    user: {
      _id: user._id.toString(),
      email: user.email,
      permissions: user.permissions,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
    token
  };
};
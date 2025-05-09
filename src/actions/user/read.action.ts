import User, { IUser } from '../../models/user.model';
import bcrypt from 'bcrypt';

interface ReadUserInput {
  email: string;
  password: string;
}

export const readUser = async (input: ReadUserInput): Promise<IUser | null> => {
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

  return user;
};
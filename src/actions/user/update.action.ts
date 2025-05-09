import User, { IUser } from '../../models/user.model';
import bcrypt from 'bcrypt';

interface UpdateUserInput {
  userId: string;
  updates: Partial<{
    email: string;
    password: string;
    permissions: IUser['permissions'];
  }>;
}

export const updateUser = async (input: UpdateUserInput): Promise<IUser | null> => {
  const { userId, updates } = input;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user || user.isDeleted) {
    throw new Error('User not found');
  }

  // Update fields if provided
  if (updates.email) {
    user.email = updates.email;
  }

  if (updates.password) {
    user.password = await bcrypt.hash(updates.password, 10);
  }

  if (updates.permissions) {
    user.permissions = { ...user.permissions, ...updates.permissions };
  }

  // Save the updated user to the database
  await user.save();

  return user;
};
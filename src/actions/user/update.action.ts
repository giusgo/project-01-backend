import User, { IUser } from '../../models/user.model';
import bcrypt from 'bcrypt';

interface UpdateUserInput {
  userId: string;
  updates: Partial<{
    email: string;
    password: string;
    permissions: IUser['permissions'];
  }>;
  currentUser?: {
    id: string;
    permissions?: {
      modifyUsers?: boolean;
    };
  };
}

export const updateUser = async (input: UpdateUserInput): Promise<IUser | null> => {
  const { userId, updates, currentUser } = input;

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

  // Handle permissions update with restrictions
  if (updates.permissions) {
    // Check if the user is trying to update their own permissions
    const isSelfUpdate = currentUser && currentUser.id === userId;
    
    // Only allow permissions update if:
    // 1. It's not a self-update, OR
    // 2. It is a self-update but the user has the modifyUsers permission
    if (!isSelfUpdate || (currentUser && currentUser.permissions && currentUser.permissions.modifyUsers)) {
      user.permissions = { ...user.permissions, ...updates.permissions };
    } else {
      throw new Error('User attempted to update their own permissions without proper authorization');
    }
  }

  // Save the updated user to the database
  await user.save();

  return user;
};
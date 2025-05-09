import User from '../../models/user.model';

interface DeleteUserInput {
  userId: string;
}

export const deleteUser = async (input: DeleteUserInput): Promise<void> => {
  const { userId } = input;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Perform soft delete by setting isDeleted to true
  user.isDeleted = true;

  // Save the updated user to the database
  await user.save();
};
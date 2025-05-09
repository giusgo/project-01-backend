import User, { IUser } from "../../models/user.model";
import bcrypt from "bcrypt";

interface CreateUserInput {
  email: string;
  password: string;
}

export const createUser = async (input: CreateUserInput): Promise<IUser> => {
  const { email, password } = input;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  await newUser.save();

  return newUser;
};

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.model";

class UserController {
  async signup({ email, password, firstName, lastName }) {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        firstName,
        lastName,
        password: encryptedPassword,
      });

      await user.save();
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 24 * 60 * 60 * 30,
      });

      return { token, user };
    } catch (error) {
      throw new Error(error);
    }
  }

  async signin({ email, password }) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User with this email not found");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 24 * 60 * 60 * 365,
      });

      return { token, user };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById({ id }) {
    return await User.findById(id).exec();
  }
}

export { UserController };

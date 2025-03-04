import { UserRepository } from "../repositories/userRepository";
import { Logger } from "../utils/logger";

export class UserService {
  
  static async createUser(name: string, email: string) {
    // ✅ Business logic: Validation
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }
    Logger.log("Creating User", { name, email });
    return await UserRepository.createUser(name, email);
  }

  static async findUser(email: string) {
    return await UserRepository.getUserByEmail(email);
  }

  static async updateUserEmail(oldEmail: string, newEmail: string) {
    // ✅ Business logic: Prevent updating to an existing email
    const existingUser = await UserRepository.getUserByEmail(newEmail);
    if (existingUser) {
      throw new Error("Email already in use");
    }
    Logger.log("Updating User Email", { oldEmail, newEmail });
    return await UserRepository.updateUserEmail(oldEmail, newEmail);
  }

  static async removeUser(email: string) {
    Logger.log("Deleting User", { email });
    return await UserRepository.deleteUser(email);
  }
}

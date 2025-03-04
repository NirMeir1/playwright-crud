import { UserRepository } from "../repositories/userRepository";
import { Logger } from "../utils/logger";

export class UserService {
  
  static async createUser(name: string, email: string) {
    Logger.log("Creating User", { name, email });
    return await UserRepository.createUser(name, email);
  }

  static async findUser(email: string) {
    return await UserRepository.getUserByEmail(email);
  }

  static async removeUser(email: string) {
    Logger.log("Deleting User", { email });
    return await UserRepository.deleteUser(email);
  }
}

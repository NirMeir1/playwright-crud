import { Database } from "../utils/dbClient";
import { User } from "../models/userModel";

export class UserRepository {
  
  static async createUser(name: string, email: string): Promise<User> {
    const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
    const result = await Database.query(query, [name, email]);
    return new User(result[0].id, result[0].name, result[0].email);
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await Database.query(query, [email]);
    return result.length > 0 ? new User(result[0].id, result[0].name, result[0].email) : null;
  }

  static async deleteUser(email: string): Promise<boolean> {
    const query = `DELETE FROM users WHERE email = $1 RETURNING *`;
    const result = await Database.query(query, [email]);
    return result.length > 0;
  }
}
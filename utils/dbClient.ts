import DatabaseConfig from "../config/dbConfig";
import { Logger } from "./logger";

export class Database {
  static async query(queryText: string, params?: any[]) {
    const pool = DatabaseConfig.getInstance();
    const client = await pool.connect();
    
    try {
      const result = await client.query(queryText, params);
      return result.rows;
    } catch (error) {
      Logger.error("Database Query Failed", { queryText, error });
      throw error;
    } finally {
      client.release();
    }
  }
}
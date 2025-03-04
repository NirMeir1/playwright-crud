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

  static async transaction(queries: { text: string; params: any[] }[]) {
    const pool = DatabaseConfig.getInstance();
    const client = await pool.connect();
    
    try {
      await client.query("BEGIN");
      const results = [];
      for (const query of queries) {
        results.push(await client.query(query.text, query.params));
      }
      await client.query("COMMIT");
      return results.map(res => res.rows);
    } catch (error) {
      await client.query("ROLLBACK");
      Logger.error("Transaction Failed", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
import { Pool } from "pg";
import { ENV } from "./envConfig";

class DatabaseConfig {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new Pool({
        connectionString: ENV.DATABASE_URL,
        max: 10,  // Optimize connection pooling
        idleTimeoutMillis: 30000,
      });
    }
    return DatabaseConfig.instance;
  }
}

export default DatabaseConfig;